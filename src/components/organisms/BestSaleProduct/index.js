import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useCart } from 'context';

import SliderProduct from '../../mocules/SliderProduct';
import ProductCardVertical from '../ProductCardVertical';

const BestSaleProduct = ({ products }) => {
  const { increase } = useCart();

  const handleIncrement = (product) => {
    increase(product);
  };
  return (
    <SliderProduct>
      {products.map((item) => (
        <ProductCardVertical
          onIncrement={handleIncrement}
          key={`bestsale-${item.id}`}
          product={item}
          value={item.quantity || 0}
          tag
          category
        />
      ))}
    </SliderProduct>
  );
};

export default BestSaleProduct;
