import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Banner from '../component/Banner';
import NewProducts from '../component/NewProducts';
import TopProductSales from '../component/TopProductSales';
import HeroSlider from '../component/HeroSlider';
import Subscribe from '../component/Subscribe';
import LatestBlog from '../component/LatestBlog';
import TopSellers from '../component/TopSellers';
const Home = () => {
  return (
    <>
      <Header />
      <HeroSlider />
      <Banner />
      <NewProducts />
      <TopSellers />
      <TopProductSales />
      <LatestBlog />
      <Subscribe />
      <Footer />
    </>
  );
};

export default Home;
