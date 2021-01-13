/* eslint-disable camelcase */
import React from 'react';
import { Template, ProductListing } from 'components';
import ProductClient from 'clients/ProductClient';
import CatClient from 'clients/CatClient';

export async function getServerSideProps(ctx) {
  const [products, brand, group] = await Promise.all([
    ProductClient.loadDataProduct(ctx),
    CatClient.loadBrand(ctx),
    CatClient.loadGroup(ctx),
  ]);
  const current_tab = ctx.query.current_tab || '';
  const sort = ctx.query.sort || '';
  const page = Number(ctx.query.page) || 1;
  const slug = ctx.query.slug || '';
  return {
    props: {
      products,
      current_tab,
      page,
      sort,
      brand,
      group,
      slug,
    },
  };
}

export default function Products({
  products = [],
  brand = [],
  group = [],
  current_tab = '',
  page = '',
  sort = '',
  slug = '',
  isMobile,
}) {
  const title = 'Tất cả sản phẩm – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const cat = 'products';
  return (
    <Template title={title} isMobile={isMobile} pageName={cat}>
      <ProductListing
        products={products}
        brand={brand.status === 'OK' ? brand.data : []}
        group={group.status === 'OK' ? group.data : []}
        current_tab={current_tab}
        page={page}
        sort={sort}
        catName={cat}
        slug={slug}
      />
    </Template>
  );
}
