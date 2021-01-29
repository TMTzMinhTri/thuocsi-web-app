import React, { memo, useState, useEffect } from 'react';
import { Modal, InfoFormControl, InfoTable, Button, LinkComp } from 'components/atoms';
import { Grid, Box, TableRow, TableCell, Divider } from '@material-ui/core';
import { OrderClient, isValid, isValidWithoutData } from 'clients';
import styled from 'styled-components';
import { FormarCurrency, NotifyUtils } from 'utils';
import { getPathProductBySlug } from 'constants/Paths';
import GroupAddressSelect from '../GroupAddressSelect';
import InfoInput from '../InfoInput';
import styles from './style.module.css';
import validateForm from './validateForm';

const heads = ['Sản phẩm hóa đơn nhanh', 'Giá (đ)', 'Số lượng', 'Tổng cộng (đ)'];

const StyledCompleteButton = styled(Button)`
  color: #fff !important;
  background-color: #00b46e !important;
  border: 1px solid #00b46e !important;
  font-weight: 500 !important;
  margin-top: 50px !important;
  border-radius: 10px !important;
  padding-left: 20px !important;
  padding-right: 20px !important;

  &:hover {
    background: #fff !important;
    color: #00b46e !important;
    border: 1px solid #00b46e !important;
  }
`;

const PrintInvoiceModal = memo((props) => {
  const { onClose, visible, className, restProps, orderID, user } = props;
  const { address: add, businessName, email, mst } = user;
  const [val, setVal] = useState({
    mst: mst || '',
    email: email || '',
    businessName: businessName || '',
    address: add || '',
  });
  const [address, setAddress] = useState({
    province: user?.provinceCode,
    district: user?.districtCode,
    ward: user?.wardCode,
  });

  const handleChangeAddress = (idProvince, idDistrict, idWard, province, district, ward) => {
    setAddress({ ...val, [idProvince]: province, [idDistrict]: district, [idWard]: ward });
  };


  const [products, setProducts] = useState([]);

  const handleSetAddress = (key, value) => {
    setAddress({ ...address, [key]: value });
  };

  const handleChangeVal = (key, value) => {
    setVal({ ...val, [key]: value });
  };

  const handleCompleted = () => {
    try {
      validateForm(val);
      NotifyUtils.success('Xuất hoá đơn thành công.');
      onClose();
    } catch (error) {
      NotifyUtils.error(error?.message || 'Xuất hoá đơn thất bại');
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await OrderClient.getProductByOrderId(orderID);
        if (!isValid(res)) throw Error();
        let orderItems = res?.data || [];
        const mapProductInfo = await OrderClient.getInfoOrderItem({ orderItems });
        if (!isValidWithoutData(mapProductInfo)) throw Error();
        orderItems = orderItems.map((product) => ({
          productInfo: mapProductInfo[product?.productSku],
          ...product,
        }));
        setProducts(orderItems);
      } catch (error) {
        setProducts([]);
      }
    }
    fetchData();
  }, []);

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <Box textAlign="center">
          <h2 className={styles.title}> Thông tin xuất hoá đơn</h2>
          <Divider />
          <Grid container>
            <InfoFormControl xs={12} label="Tên nhà thuốc/phòng khám" htmlFor="address" isRequired>
              <InfoInput
                id="businessName"
                value={val.businessName}
                onChange={(e) => handleChangeVal('businessName', e.target.value)}
              />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Mã số thuế" htmlFor="address" isRequired>
              <InfoInput
                id="mst"
                value={val.mst}
                onChange={(e) => handleChangeVal('mst', e.target.value)}
              />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Email" htmlFor="address" isRequired>
              <InfoInput
                id="email"
                value={val.email}
                onChange={(e) => handleChangeVal('email', e.target.value)}
              />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Địa chỉ nhận hoá đơn" htmlFor="address" isRequired>
              <InfoInput
                id="address"
                value={val.address}
                onChange={(e) => handleChangeVal('address', e.target.value)}
              />
            </InfoFormControl>
          </Grid>
          <GroupAddressSelect
            handleSetValue={handleSetAddress}
            province={address.province}
            district={address.district}
            ward={address.ward}
            idProvince="province"
            idDistrict="district"
            idWard="ward"
            handleChangeAddress={handleChangeAddress}
          />
          <InfoTable heads={heads} stickyHeader className={styles.ovfy}>
            {products.map((product) => {
              const { price, quantity, totalPrice } = product;
              const { name = '', slug = '' } = product.productInfo || {};
              return (
                <TableRow key={name} hover>
                  <TableCell align="left" className={styles.product_name}>
                    <LinkComp
                      variant="h5"
                      href={getPathProductBySlug(slug)}
                      className={styles.product_name}
                    >
                      {name}
                    </LinkComp>
                  </TableCell>
                  <TableCell align="left">{FormarCurrency(price, '.', ' ')}</TableCell>
                  <TableCell align="left">{quantity}</TableCell>
                  <TableCell align="left">{FormarCurrency(totalPrice, '.', ' ')}</TableCell>
                </TableRow>
              );
            })}
          </InfoTable>
          <StyledCompleteButton onClick={handleCompleted}> Xuất hoá đơn </StyledCompleteButton>
        </Box>
      </div>
    </Modal>
  );
});

export default PrintInvoiceModal;
