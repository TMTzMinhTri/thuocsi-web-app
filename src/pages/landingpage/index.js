import React from 'react';
import dynamic from 'next/dynamic';
import Template from 'components/layout/Template';

export default function LandingPage(props) {
  const { infoBanner = [], isMobile, isAuthenticated, products = [] } = props;
  const title = 'Tra cứu và đặt thuốc giá sỉ nhanh tại thuocsi.vn';
  const pageName = 'home';
  const DynamicWhyBuymed = dynamic(() => import('components/organisms/WhyBuymed'));
  const DynamicCommonQuestion = dynamic(() => import('components/mocules/CommonQuestion'));
  const DynamicPartners = dynamic(() => import('components/organisms/Partners'));
  const DynamicSliderComp = dynamic(() => import('components/organisms/SliderComp'));
  const DynamicMedia = dynamic(() => import('components/organisms/Media'));
  const DynamicHomeCTASection = dynamic(() => import('components/mocules/HomeCTASection'));
  const DynamicBannerSlider = dynamic(() => import('components/organisms/BannerSlider'));
  const DynamicProductSliderSection = dynamic(() =>
    import('components/organisms/ProductSliderSection'));

  return (
    <Template title={title} isMobile={isMobile} pageName={pageName}>
      <DynamicBannerSlider infoBanner={infoBanner} />
      {!isAuthenticated ? (
        <>
          <DynamicWhyBuymed />
          <DynamicHomeCTASection />
          <DynamicCommonQuestion />
        </>
      ) : (
        <div className="SliderProductWrap">
          {products?.map((item) => (
            <DynamicProductSliderSection
              key={item?.collectionId}
              slug={item?.slug}
              name={item?.name}
              viewMore={item?.viewMore}
              products={item?.data}
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
