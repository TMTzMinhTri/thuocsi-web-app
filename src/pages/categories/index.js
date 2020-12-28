import React from 'react';
import { Template, NavBar, Header, ProductListing } from 'components';
import ProductClient from 'clients/ProductClient';
import CatClient from 'clients/CatClient';

export async function getServerSideProps(ctx) {
  const [products] = await Promise.all([ProductClient.loadDataProduct(ctx)]);
  const [brand] = await Promise.all([CatClient.loadBrand(ctx)]);
  const [group] = await Promise.all([CatClient.loadGroup(ctx)]);
  // eslint-disable-next-line camelcase
  const current_tab = ctx.query.current_tab || '';
  const sort = ctx.query.sort || '';
  const page = Number(ctx.query.page) || '';
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

// eslint-disable-next-line camelcase
export default function Products({ mostResearched = [], products = [], brand = [], group = [], current_tab = '', page = '', sort = '', slug = '' }) {
  const title = 'Tất cả sản phẩm – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const cat = 'categories';
  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <ProductListing
        products={products}
        brand={brand.status === 'OK' ? brand.data : []}
        group={group.status === 'OK' ? group.data : []}
        // eslint-disable-next-line camelcase
        current_tab={current_tab}
        page={page}
        sort={sort}
        catName={cat}
        slug={slug}
      />
    </Template>
  );
}
