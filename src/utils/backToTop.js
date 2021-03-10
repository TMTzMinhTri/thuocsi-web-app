import React, { useEffect, useState } from 'react';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <div className="back-to-top" onClick={scrollToTop} role="presentation">
          <FontAwesomeIcon icon={faChevronUp} />
          <div className="back-to-top-text">TOP</div>
        </div>
      )}
    </div>
  );
}
