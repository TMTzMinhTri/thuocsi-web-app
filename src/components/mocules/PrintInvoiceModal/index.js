import React, { memo, useState, useEffect } from 'react';
import { Modal, InfoFormControl, InfoTable, Button } from 'components/atoms';
import { Grid, Box, TableRow, TableCell, Divider } from '@material-ui/core';
import { OrderClient } from 'clients';
import styled from 'styled-components';
import { FormarCurrency, NotifyUtils } from 'utils';
import GroupAddressSelect from '../GroupAddressSelect';
import InfoInput from '../InfoInput';
import styles from './style.module.css';

const heads = ['Sản phẩm hóa đơn nhanh', 'Giá', 'Số lượng', 'Tổng cộng'];

const StyledCompleteButton = styled(Button)`
  color: #fff!important;
  background-color: #00b46e !important;
  border-color: #00b46e !important;
  font-weight: 500 !important;
  margin-top: 50px !important;
`;

const PrintInvoiceModal = memo((props) => {
  const { onClose, visible, className, restProps, orderID } = props;
  const [address, setAddress] = useState({
    province: 0,
    district: 0,
    ward: 0,
  });

  const [products, setProducts] = useState([]);

  const handleSetAddress = (key, value) => {
    setAddress({ ...address, [key]: value });
  };

  const handleCompleted = () => {
    NotifyUtils.success('Xuất hoá đơn thành công.');
  };
  useEffect(() => {
    async function fetchData() {
      const data = await OrderClient.getProductByOrderId(orderID);
      setProducts(data.slice(0, 3));
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
              <InfoInput id="legalRepresentative" />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Mã số thuế" htmlFor="address" isRequired>
              <InfoInput id="address" />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Email" htmlFor="address" isRequired>
              <InfoInput id="address" />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Địa chỉ nhận hoá đơn" htmlFor="address" isRequired>
              <InfoInput id="address" />
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
          <InfoTable heads={heads}>
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
