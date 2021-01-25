import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useCart } from 'context';
import { v4 as uuidV4 } from 'uuid';

import SliderProduct from 'components/mocules/SliderProduct';
import ProductCardVertical from '../ProductCardVertical';

const ProductSliderSection = ({ products = [], name = '', viewMore = true, redirect = '' }) => {
  const { increase } = useCart();
  const handleIncrement = (product) => {
    increase(product);
  };

  return (
    <SliderProduct name={name} viewMore={viewMore} redirect={redirect}>
      {products.map((product) => (
        <ProductCardVertical
          onIncrement={handleIncrement}
          key={uuidV4()}
          product={product}
          tag
          category
        />
      ))}
    </SliderProduct>
  );
};

export default ProductSliderSection;
