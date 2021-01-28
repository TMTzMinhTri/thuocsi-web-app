import React from 'react';
import dynamic from 'next/dynamic';
import Template from 'components/layout/Template';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from 'context';

export default function LandingPage(props) {
  const { isAuthenticated } = useAuth();
  const { infoBanner = [], isMobile, blocks = [] } = props;
  const title = 'Tra cứu và đặt thuốc giá sỉ nhanh tại thuocsi.vn';
  const pageName = 'home';
  const pageTitle = 'Trang chủ';

  const DynamicWhyBuymed = dynamic(() => import('components/organisms/WhyBuymed'));
  const DynamicCommonQuestion = dynamic(() => import('components/mocules/CommonQuestion'));
  const DynamicPartners = dynamic(() => import('components/organisms/Partners'));
  const DynamicSliderComp = dynamic(() => import('components/organisms/SliderComp'));
  const DynamicMedia = dynamic(() => import('components/organisms/Media'));
  const DynamicHomeCTASection = dynamic(() => import('components/organisms/HomeCTASection'));
  const DynamicBannerSlider = dynamic(() => import('components/organisms/BannerSlider'));
  const DynamicProductSlider = dynamic(() => import('components/organisms/ProductSliderSection'));

  return (
    <Template title={title} isMobile={isMobile} pageName={pageName} pageTitle={pageTitle}>
      <DynamicBannerSlider infoBanner={infoBanner} />
      {!isAuthenticated ? (
        <>
          <DynamicWhyBuymed />
          <DynamicHomeCTASection />
          <DynamicCommonQuestion />
        </>
      ) : (
        <div className="SliderProductWrap">
          {blocks &&
            blocks.map((item) => (
              <DynamicProductSlider
                key={uuidv4()}
                name={item.name}
                viewMore={item.viewMore}
                products={item.data}
                redirect={item.redirectUrl}
              />
            ))}
        </div>
      )}
      <DynamicPartners />
      <DynamicSliderComp />
      <DynamicMedia />
    </Template>
  );
}
