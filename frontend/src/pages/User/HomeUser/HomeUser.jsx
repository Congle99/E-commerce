import React from 'react';
import CitiesSlider from './CitiesSlider';
import BannerSection from './BannerSection';
import BrandSection from './BrandSection';
import NewProductsSection  from './NewProductsSection'
import FeaturedProduct from './FeaturedProduct';

// Dữ liệu slide ảnh nền
const slides = [
  {
    city: 'Paris',
    country: 'France',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg',
  },
  {
    city: 'Singapore',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg',
  },
  {
    city: 'Prague',
    country: 'Czech Republic',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg',
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
  },
  {
    city: 'Moscow',
    country: 'Russia',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
  },
];

const HomeUser = () => {
  return (
    <div id="app" className="bg-gray-50">
      <CitiesSlider slides={slides} />
      <BrandSection />
      <BannerSection />
     <FeaturedProduct />
     <NewProductsSection />
    </div>
  );
};

export default HomeUser;
