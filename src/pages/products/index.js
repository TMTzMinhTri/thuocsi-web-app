/* eslint-disable camelcase */
import React from 'react';
import { Template, ProductListing } from 'components';
import ProductClient from 'clients/ProductClient';
import CatClient from 'clients/CatClient';
import { TAB_LIST } from '../../constants/data';

export async function getServerSideProps(ctx) {
  const [products, brand, group, tags] = await Promise.all([
    ProductClient.loadDataProduct(ctx),
    CatClient.loadBrand(ctx),
    CatClient.loadGroup(ctx),
    CatClient.loadTags(ctx),
  ]);
  const current_tab = ctx.query.current_tab || '';
  const sortBy = ctx.query.sortBy || '';
  const page = Number(ctx.query.page) || 1;
  const slug = ctx.query.slug || '';
  const { data = [], total = 0 } = products;
  return {
    props: {
      products: data,
      total,
      current_tab,
      page,
      sortBy,
      brand,
      group,
      slug,
      tags,
    },
  };
}

export default function Products({
  products,
  total,
  brand = [],
  group = [],
  tags = [],
  current_tab = '',
  page = '',
  sortBy = '',
  slug = '',
  isMobile,
}) {
  const title = 'Tất cả sản phẩm – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const cat = 'products';
  const namePage = (val) => {
    let name = 'Tất cả sản phẩm';
    if (val) {
      const currentTab = TAB_LIST.filter((tab) => tab.value === val);
      name = currentTab[0] ? currentTab[0].label : name;
    }
    return name;
  };
  return (
    <Template title={title} isMobile={isMobile} pageName={cat}>
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
        tags={tags}
        name={namePage(current_tab)}
      />
    </Template>
  );
}
