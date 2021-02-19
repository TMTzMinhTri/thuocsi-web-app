export const FACEBOOK_PIXEL_CODE = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_CODE;

export const pageview = () => {
  window.fbq('track', 'PageView');
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  window.fbq('track', name, options);
};

export default { pageview, event };
