/* eslint-disable camelcase */
import React from 'react';
import { Template, ManufacturerContainer } from 'components';
import { ProductClient, doWithServerSide } from 'clients';
import { Container } from '@material-ui/core';
import { changeAlias } from 'utils/StringUtils';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [manufacturers] = await Promise.all([ProductClient.loadDataManufacturer(ctx)]);
    const convertManufacturers = (manu = []) =>
    manu
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(({ name, slug }) => ({
        unsignedKey: changeAlias(name),
        name,
        slug,
      }));
    return {
      props: {
        manufacturers: convertManufacturers(manufacturers),
      },
    };
  });
}

const Manufacturers = ({ manufacturers = [], isMobile }) => {
  const title = 'Tất cả nhà sản xuất – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const pageName = 'manufacturers';
  return (
    <Template title={title} isMobile={isMobile} pageName={pageName}>
      <div style={{ backgroundColor: '#f4f7fc', minHeight: '80vh', padding: '45px' }}>
        <Container maxWidth="lg">
          <ManufacturerContainer manufacturers={manufacturers} />
        </Container>
      </div>
    </Template>
  );
};

export default Manufacturers;
