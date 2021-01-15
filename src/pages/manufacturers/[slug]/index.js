/* eslint-disable camelcase */
import React from 'react';
import { Template, ProductListing } from 'components';
import CatClient from 'clients/CatClient';

export async function getServerSideProps(ctx) {
  const [products, catInfo, brand, group] = await Promise.all([
    CatClient.loadProductWithManufacturer(ctx),
    CatClient.loadCategoryInfoBySlug(ctx),
    CatClient.loadBrand(ctx),
    CatClient.loadGroup(ctx),
  ]);
  const current_tab = ctx.query.current_tab || '';
  const sortBy = ctx.query.sortBy || '';
  const page = Number(ctx.query.page) || 1;
  const slug = ctx.query.slug || '';
  return {
    props: {
      products,
      catInfo,
      current_tab,
      page,
      sortBy,
      brand,
      group,
      slug,
    },
  };
}

export default function Products({
  products = [],
  catInfo = '',
  brand = [],
  group = [],
  current_tab = '',
  page = '',
  sortBy = '',
  slug = '',
  isMobile,
}) {
  const title = 'Tất cả sản phẩm – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const cat = 'manufacturers';
  return (
    <Template title={title} isMobile={isMobile} pageName={cat}>
      <ProductListing
        products={products}
        brand={brand}
        group={group}
        current_tab={current_tab}
        page={page}
        sortBy={sortBy}
        catName={cat}
        slug={slug}
        name={catInfo && catInfo[0] && catInfo[0].name}
      />
    </Template>
  );
}
