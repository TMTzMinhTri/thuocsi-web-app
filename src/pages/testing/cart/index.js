import React from 'react';
import { Container, Box, Paper } from '@material-ui/core';
import { Button } from 'components/atoms';
import { useCart } from 'context';

const productItem = {
  id: 2,
  name: 'Băng cá nhân vải độ dính cao urgo durable (h/102m)',
  image: '',
  deal: true,
  deal_price: 20000,
  deal_start_day: '2020-11-01T02:36:00.000Z',
  deal_end_day: '2021-11-20T02:36:00.000Z',
  tags: ['BEST_SELLER', 'PROMOTION', 'FLASH_SALE'],
  type: 'Chai 100 viên',
  category: ['Cơ Xương Khớp', 'Da Liễu', 'Dầu Xoa, Cao Xoa', 'Đông Y'],
  price: 30000,
  status: 'price_down',
  price_percent: 19.23423423,
  not_support_delivery: true,
  is_event: true,
  is_star: true,
};

export default function TestCart() {
  const {
    itemCount,
    total,
    increase,
    decrease,
    removeProduct,
    addProduct,
    clearCart,
    increaseBy,
    cartItems,
    addImportant,
    removeImportant,
  } = useCart();
  return (
    <Container>
      <Box mt={2}>cart count: {itemCount} - cart total: {total}</Box>
      <Box mt={5}>
        <Button onClick={() => increaseBy({ productItem, q: 100 })}>increaseBy 100</Button>
        <Button onClick={() => addProduct(productItem)}>addProduct</Button>
        <Button onClick={() => removeProduct(productItem)}>removeProduct</Button>
        <Button onClick={() => clearCart()}>clearCart</Button>
        <Button onClick={() => increase(productItem)}>increase</Button>
        <Button onClick={() => decrease(productItem)}>decrease</Button>
        <Button onClick={() => addImportant(productItem)}>addImportant</Button>
        <Button onClick={() => removeImportant(productItem)}>removeImportant</Button>
      </Box>
      <Box mt={5}>
        <h3>Cart list</h3>
        {cartItems && cartItems.map((item) => (
          <Paper style={{ marginBottom: 10 }} elevation={1} variant="outlined" key={item.id}>
            <Box p={2}>
              <strong>id: {item.id}</strong>
              <p>name: {item.name}</p>
              <p>price: {item.deal_price}</p>
              <p>quantity: {item.quantity}</p>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
