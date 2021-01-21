import React, { memo, useState, useEffect } from 'react';
import { Modal, InfoFormControl, InfoTable, Button } from 'components/atoms';
import { Grid, Box, TableRow, TableCell, Divider } from '@material-ui/core';
import { OrderClient, isValid } from 'clients';
import styled from 'styled-components';
import { FormarCurrency, NotifyUtils } from 'utils';
import { PRODUCT_TYPE } from 'constants/Enums';
import GroupAddressSelect from '../GroupAddressSelect';
import InfoInput from '../InfoInput';
import styles from './style.module.css';
import validateForm from './validateForm';

const heads = ['Sản phẩm hóa đơn nhanh', 'Giá', 'Số lượng', 'Tổng cộng'];

const StyledCompleteButton = styled(Button)`
  color: #fff!important;
  background-color: #00b46e !important;
  border-color: #00b46e !important;
  font-weight: 500 !important;
  margin-top: 50px !important;
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
        const res = await OrderClient.getProductByOrderId(orderID, PRODUCT_TYPE.CAN_INVOICE);

        if (!isValid(res)) throw Error('Lấy danh sách không thành công');
        setProducts(res.data);
      } catch (error) {
        NotifyUtils.error(error?.message || 'Lấy dữ liệu bị lỗi');
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
              <InfoInput id="businessName" value={val.businessName} onChange={(e) => handleChangeVal('businessName', e.target.value)} />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Mã số thuế" htmlFor="address" isRequired>
              <InfoInput id="mst" value={val.mst} onChange={(e) => handleChangeVal('mst', e.target.value)} />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Email" htmlFor="address" isRequired>
              <InfoInput id="email" value={val.email} onChange={(e) => handleChangeVal('email', e.target.value)} />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Địa chỉ nhận hoá đơn" htmlFor="address" isRequired>
              <InfoInput id="address" value={val.address} onChange={(e) => handleChangeVal('address', e.target.value)} />
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
          />
          <InfoTable heads={heads} stickyHeader className={styles.ovfy}>
            { products.map((product) => (
              <TableRow key={product.name} hover>
                <TableCell align="left" className={styles.product_name}>
                  {product.name}
                </TableCell>
                <TableCell align="left">
                  {FormarCurrency(product.price)}
                </TableCell>
                <TableCell align="left">
                  {product.quantity}
                </TableCell>
                <TableCell align="left">
                  {FormarCurrency(product.price * product.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </InfoTable>
          <StyledCompleteButton onClick={handleCompleted}> Hoàn tất </StyledCompleteButton>
        </Box>
      </div>
    </Modal>
  );
});

export default PrintInvoiceModal;
