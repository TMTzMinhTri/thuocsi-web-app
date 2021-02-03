import React from 'react';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
import { Star, Info } from '@material-ui/icons';
import { QUICK_ORDER } from 'constants/Paths';
import CartNote  from 'components/mocules/CartNote';
import ProductCart from '../ProductCart';
import styles from './style.module.css';

const ProductCartList = ({ products, isMobile }) => 

   (
     <>
       <div className={styles.instruction_text}>
         <Star className={styles.star_icon} />
         <Typography>
           Nhấp để đánh dấu sản phẩm quan trọng (giới hạn 20% tổng số sản phẩm, 1 sản phẩm đặt nhiều
           cái cũng tính là 1)
         </Typography>
       </div>
       <div style={{ marginBottom: '16px' }}>
         {products &&
          products.map((item) => (
            <ProductCart
              key={`product-cart-${item.sku}`}
              product={item}
              isImportant={item.isImportant}
              name={`cart-${item.sku}`}
              isMobile={isMobile}
            />
          ))}
       </div>
       <div className={styles.instruction_text}>
         <Info className={styles.info_icon} />
         <Typography>
           Để thêm sản phẩm vào giỏ hàng, vui lòng quay về trang
           <Link href={QUICK_ORDER}>
             <span className={styles.quick_order}>Đặt hàng nhanh </span>
           </Link>
         </Typography>
       </div>
       <div className={styles.notes}>
         <div className={styles.note_title}>Ghi chú khác</div>
         <div className={styles.note_content}>
           Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên dưới. Chúng
           tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể.
         </div>

         <CartNote />
       </div>
     </>
  )
;

export default ProductCartList;
