/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import ProductListing from 'components/organisms/ProductListing';
import CatClient from 'clients/CatClient';

export async function getServerSideProps(ctx) {
  const [products, catInfo, brand, group, tags] = await Promise.all([
    CatClient.loadProductWithManufacturer(ctx),
    CatClient.loadManufacturerInfoBySlug(ctx),
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
      catInfo,
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
  catInfo = '',
  total,
  brand = [],
  group = [],
  tags = [],
  current_tab = '',
  page = '',
  sortBy = '',
  slug = '',
  isMobile,
  isAuthenticated,
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
        current_tab={current_tab}
        page={page}
        sortBy={sortBy}
        catName={cat}
        slug={slug}
        tags={tags}
        name={catInfo && catInfo[0] && catInfo[0].name}
        isAuthenticated={isAuthenticated}
        isMobile={isMobile}
      />
    </Template>
  );
}
