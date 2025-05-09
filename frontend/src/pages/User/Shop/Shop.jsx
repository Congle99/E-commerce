import Banner from "./Banner";
import Categories from "./Categories";
import Products from "./Products";

const Shop = () => {
  return (
    <div className="home-slider-wrapper">
      <Banner />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Categories />
          </div>
          <div className="col-md-9">
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
