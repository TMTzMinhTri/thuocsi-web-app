/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import ProductListing from 'components/organisms/ProductListing';
import CatClient from 'clients/CatClient';
import { ProductService } from 'services';
import { NEXT_I18NEXT_NAME_SPACES } from 'sysconfig';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
  const [productsRes, catInfo, brand, group, tabs, i18next] = await Promise.all([
    ProductService.loadProductWithManufacturer({ ctx }),
    CatClient.loadManufacturerInfoBySlug(ctx),
    CatClient.loadBrand(ctx),
    CatClient.loadGroup(ctx),
    ProductService.getListTabs({ ctx }),
    serverSideTranslations(ctx.locale, NEXT_I18NEXT_NAME_SPACES),
  ]);
  const currentTab = ctx.query.currentTab || '';
  const sortBy = ctx.query.sortBy || '';
  const page = Number(ctx.query.page) || 1;
  const slug = ctx.query.slug || '';
  const { data = [], total = 0 } = productsRes;
  return {
    props: {
      products: data,
      total,
      catInfo,
      currentTab,
      page,
      sortBy,
      brand,
      group,
      slug,
      tabs,
      ...i18next,
    },
  };
}

export default function Products({
  products,
  catInfo = '',
  total,
  brand = [],
  group = [],
  currentTab = '',
  page = '',
  sortBy = '',
  slug = '',
  isMobile,
  isAuthenticated,
  tabs = [],
}) {
  const title = 'Tất cả sản phẩm – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const cat = 'manufacturers';
  const pageTitle = 'Sản phẩm';
  return (
    <Template title={title} isMobile={isMobile} pageName={cat} pageTitle={pageTitle}>
      <ProductListing
        products={products}
        total={total}
        brand={brand}
        group={group}
        currentTab={currentTab}
        page={page}
        sortBy={sortBy}
        catName={cat}
        slug={slug}
        tabs={tabs}
        name={catInfo && catInfo[0] && catInfo[0].name}
        isAuthenticated={isAuthenticated}
        isMobile={isMobile}
      />
    </Template>
  );
}
