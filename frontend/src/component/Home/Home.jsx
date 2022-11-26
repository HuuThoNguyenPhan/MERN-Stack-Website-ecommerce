import React, { useEffect, useState } from "react";
import "./Home.css";
import "./Tabs.css";
import Carousel from "react-material-ui-carousel";
import ProductCard from "../Products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Header from "./Header";
import MetaData from "../../more/Metadata";
import Footer from "../../Footer";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const { products, error, loading } = useSelector((state) => state.products);
  const images = [
    {
      url: "https://cdn.tgdd.vn/2022/09/banner/1200x450-1200x450.png",
      bgColor: "#ffdcdf",
    },
    {
      url: "https://cdn.tgdd.vn/2022/09/banner/1200x450-1200x450-2.png",
      bgColor: "#fad7e6",
    },
    {
      url: "https://cdn.tgdd.vn/2022/09/banner/flyco-1200x450-1.png",
      bgColor: "#8bebf6",
    },
    {
      url: "https://cdn.tgdd.vn/2022/09/banner/1200x450-1200x450-3.png",
      bgColor: "#fcf6e6",
    },
    {
      url: "https://cdn.tgdd.vn/2022/10/banner/1200x450-1200x450.png",
      bgColor: "#fee1dc",
    },
  ];
  const categories = [
    {
      url: "https://cdn.tgdd.vn//content/2-183x136.png",
      name: "Thiết bị làm đẹp",
    },
    {
      url: "https://cdn.tgdd.vn//content/4-183x136.png",
      name: "Dụng cụ massage",
    },
    {
      url: "https://cdn.tgdd.vn//content/1-183x136.png",
      name: "Chăm sóc da",
    },
    {
      url: "https://cdn.tgdd.vn//content/3-183x136.png",
      name: "Dụng cụ trang điểm, chăm sóc cá nhân",
    },
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Home" />
          <Header />
          {/* Carousel */}
          <div className="banner">
            <Carousel
              interval={3000}
              stopAutoPlayOnHover={false}
              indicators={false}
            >
              {images.map((img, index) => (
                <div
                  style={{ backgroundColor: img.bgColor }}
                  className="bgImg"
                  key={index}
                >
                  <img src={img.url} />
                </div>
              ))}
            </Carousel>
          </div>
          <div
            style={{ display: "flex", justifyContent: "space-around" }}
            className="categories"
          >
            {categories.map((cat, index) => (
              <Link to="" key={index}>
                <img src={cat.url} />
                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "Helvetica",
                    lineHeight: "22px",
                  }}
                >
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
          <div className="con">
            <div className="bloc-tabs">
              <button
                style={{ border: "none" }}
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                Sản phẩm mới
              </button>
              <button
                style={{ border: "none" }}
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
                Giảm giá sốc
              </button>
            </div>

            <div className="content-tabs">
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                <div className="container" id="container">
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
              </div>

              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                <div className="container" id="container">
                  {products &&
                    products.map((product) => (
                      product.offerPrice > 0 ? <ProductCard key={product._id} product={product} /> : ""
                    ))}
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Home;
