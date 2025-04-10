import React from 'react';
import blog1 from '../asset/img/blog/latest/lb1.jpg';
import blog2 from '../asset/img/blog/latest/lb2.jpg';
import blog3 from '../asset/img/blog/latest/lb3.jpg';
import './LatestBlog.css'; // nếu bạn muốn tách riêng style

const blogPosts = [
  {
    image: blog1,
    date: 'Sep 15, 2018',
    author: 'Diboli',
    comments: 23,
    title: 'Inspiration Is Under Construction Business & Fashion 2019. In this situation we do that..',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    link: '/blog-details',
  },
  {
    image: blog2,
    date: 'Sep 15, 2018',
    author: 'Joly',
    comments: 23,
    title: 'Inspiration Is Under Construction Business & Fashion 2019. In this situation we do that..',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    link: '/blog-details',
  },
  {
    image: blog3,
    date: 'Sep 15, 2018',
    author: 'Joly',
    comments: 23,
    title: 'Inspiration Is Under Construction Business & Fashion 2019. In this situation we do that..',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    link: '/blog-details',
  },
];

const LatestBlog = () => {
  return (
    <section className="latest-blog-area pt-95 pb-60 box-90">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="area-title text-center mb-50">
              <h2>News Feeds</h2>
              <p>Check it out every update</p>
            </div>
          </div>
        </div>
        <div className="row">
          {blogPosts.map((post, index) => (
            <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
              <div className="latest-news mb-40">
                <div className="news__thumb mb-25">
                  <img src={post.image} alt={`Blog ${index + 1}`} />
                </div>
                <div className="news__caption white-bg">
                  <div className="news-meta mb-15">
                    <span><i className="far fa-calendar-check"></i> {post.date} </span>
                    <span><a href="#"><i className="far fa-user"></i> {post.author}</a></span>
                    <span><a href="#"><i className="far fa-comments"></i> {post.comments} Comments</a></span>
                  </div>
                  <h2><a href={post.link}>{post.title}</a></h2>
                  <p>{post.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
