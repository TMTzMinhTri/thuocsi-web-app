/* eslint-disable camelcase */
import React from 'react';
import { Template, ManufacturerContainer } from 'components';
import { ProductClient } from 'clients';
import { doWithServerSide } from 'services';
import { Container } from '@material-ui/core';
import { changeAlias } from 'utils/StringUtils';
import { NEXT_I18NEXT_NAME_SPACES } from 'sysconfig';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [manufacturers, i18next] = await Promise.all([
      ProductClient.loadDataManufacturer(ctx),
      serverSideTranslations(ctx.locale, NEXT_I18NEXT_NAME_SPACES),
    ]);
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
        ...i18next,
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
