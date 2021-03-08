/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import ProductListing from 'components/organisms/ProductListing';
import CatClient from 'clients/CatClient';
import { ProductService } from 'services';

export async function getServerSideProps(ctx) {
  const [productsRes, catInfo, brand, group, tabs] = await Promise.all([
    ProductService.loadProductWithCategory({ ctx }),
    CatClient.loadCategoryInfoBySlug(ctx),
    CatClient.loadBrand(ctx),
    CatClient.loadGroup(ctx),
    ProductService.getListTabs({ ctx }),
  ]);
  const current_tab = ctx.query.current_tab || '';
  const sortBy = ctx.query.sortBy || '';
  const page = Number(ctx.query.page) || 1;
  const slug = ctx.query.slug || '';
  const { data = [], total = 0 } = productsRes;
  return {
    props: {
      products: data,
      total,
      catInfo,
      current_tab,
      page,
      sortBy,
      brand,
      group,
      slug,
      tabs,
    },
  };
}

export default function Products({
  products,
  catInfo = '',
  total,
  brand = [],
  group = [],
  tabs = [],
  current_tab = '',
  page = '',
  sortBy = '',
  slug = '',
  isMobile,
  isAuthenticated,
}) {
  const title = 'Tất cả sản phẩm – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const cat = 'categories';
  const pageTitle = 'Sản phẩm';
  return (
    <Template title={title} isMobile={isMobile} pageName={cat} pageTitle={pageTitle}>
      <ProductListing
        products={products}
        total={total}
        brand={brand}
        group={group}
        current_tab={current_tab}
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
