/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import ProductListing from 'components/organisms/ProductListing';
import CatClient from 'clients/CatClient';
import { TAB_LIST } from 'constants/data';
import { doWithServerSide, ProductService } from 'services';
import { NEXT_I18NEXT_NAME_SPACES } from 'sysconfig';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [productsRes, brand, group, tabs, i18next] = await Promise.all([
      ProductService.loadDataProduct({ ctx }),
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
  });
}

export default function Products({
  products,
  total,
  brand = [],
  group = [],
  tabs = [],
  currentTab = '',
  page = '',
  sortBy = '',
  slug = '',
  isMobile,
  isAuthenticated,
}) {
  const title = 'Tất cả sản phẩm – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const cat = 'products';
  const pageTitle = 'Sản phẩm';
  const namePage = (val) => {
    let name = 'Tất cả sản phẩm';
    if (val) {
      const currentTabs = TAB_LIST.filter((tab) => tab.value === val);
      name = currentTabs[0] ? currentTabs[0].label : name;
    }
    return name;
  };
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
        name={namePage(currentTab)}
        isAuthenticated={isAuthenticated}
        isMobile={isMobile}
      />
    </Template>
  );
}
