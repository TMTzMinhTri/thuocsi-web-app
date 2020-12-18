import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderProduct from '../../mocules/SliderProduct';
import ProductCardVertical from '../ProductCardVertical';

const BestSaleProduct = ({ products }) => (
  <SliderProduct>
    {products.map((item) => (
      <ProductCardVertical key={`bestsale-${item.id}`} product={item} />
    ))}
  </SliderProduct>
);

export default BestSaleProduct;
