import React from 'react';
import CitiesSlider from './CitiesSlider'; // Component bạn tách riêng

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
    <div id="app">
      <CitiesSlider slides={slides} />
      <a
        href="https://dribbble.com/shots/3774469-T-R-A-V-E-L-E-R"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-link"
      >
        <img
          src="http://icons.iconarchive.com/icons/uiconstock/socialmedia/256/Dribbble-icon.png"
          alt="Dribbble"
        />
      </a>
      <a
        href="https://twitter.com/NikolayTalanov"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-link icon-link--twitter"
      >
        <img
          src="https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-128.png"
          alt="Twitter"
        />
      </a>
    </div>
  );
};

export default HomeUser;