import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/ProductActions";
import Footer from "../../Footer";
import MetaData from "../../more/Metadata";
import Header from "../Home/Header";
import "./Productdetails.css";
import { Rating } from "@material-ui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart, removeItemsFromCart } from "../../actions/CartAction";
import { addFavouriteItemsToCart } from "../../actions/FavouriteAction";
import ReviewCard from "./ReviewCard.jsx";
import { NEW_REVIEW_RESET } from "../../constans/ProductConstans";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";

const ProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    {
      isAuthenticated !== true ? history.push(`/login?redirect=/`) : <></>;
    }

    dispatch(newReview(myForm));

    {
      comment.length === 0
        ? toast.error("Please fill the comment box")
        : toast.success("Review done successfully reload for watch it");
    }
    dispatch({ type: NEW_REVIEW_RESET });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Increase quantity
  const addToCartHandler = (e) => {
    dispatch(addItemsToCart(product._id, 1));
    toast.success(`Đã thêm sản phẩm vào giỏ hàng`);
    e.preventDefault();
  };

  const increaseQuantity = (e, stock) => {
    e.preventDefault();
    const newQty =
      cartItems.find((item) => item.product === product._id).quantity + 1;
    if (stock <= newQty) {
      return toast.error("Số lượng sản phẩm có hạn");
    } else if (newQty > 3) {
      return toast.error("Chỉ được mua tối đa 3 sản phẩm");
    }
    dispatch(addItemsToCart(product._id, newQty));
  };

  const decreaseQuantity = (e) => {
    e.preventDefault();
    const newQty =
      cartItems.find((item) => item.product === product._id).quantity - 1;
    if (cartItems.find((item) => item.product === product._id).quantity <= 1) {
      dispatch(removeItemsFromCart(product._id));
      return;
    }
    dispatch(addItemsToCart(product._id, newQty));
  };

  const addToFavouriteHandler = () => {
    dispatch(addFavouriteItemsToCart(match.params.id, 1));
    toast.success("Sản phẩm đã thêm vào mục yêu thích");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <Header />
          <div className="ProductDetails">
            <div className="first__varse">
              <img
                className="CarouselImage"
                src={product.image && product.image[0].url}
                alt="error"
              />
            </div>
            <div className="varse__2">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>({product.numOfReviews} Nhận xét)</span>
              </div>
              <div className="detailsBlock">
                <h2 style={{textDecoration: 'line-through', color: '#ed1164'}} className="discountPrice">
                  {product.offerPrice > 0 ? `${product.offerPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}` : ""}
                </h2>
                <h2>
                  {product.price == undefined
                    ? ""
                    : product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                </h2>
                <p className="stock__meta" style={{ paddingBottom: ".5vmax" }}>
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1
                      ? "Hết hàng"
                      : `Còn ${product.Stock} sản phẩm`}
                  </b>
                </p>
                <div
                  className="Description"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>Mô tả:</span>
                  <p>{product.description}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="wishlist"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "15px 5px",
                    }}
                    onClick={addToFavouriteHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                    <span
                      className="cartBtn"
                      style={{ opacity: 0.7, padding: "0px 5px" }}
                    >
                      Yêu thích
                    </span>
                  </div>
                  {typeof cartItems.find(
                    (item) => item.product === product._id
                  ) == "object" ? (
                    <div className="detailsBlock-3-1">
                      <div className="detailsBlock-3-1-1">
                        <button onClick={decreaseQuantity}>-</button>
                        <input
                          type="number"
                          readOnly
                          value={
                            cartItems.find(
                              (item) => item.product === product._id
                            ).quantity
                          }
                        />
                        <button onClick={increaseQuantity}>+</button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="pointer flex"
                      style={{
                        padding: "10px 5px",
                        alignItems: "center",
                        backgroundColor: "#E4EAEC",
                      }}
                      onClick={addToCartHandler}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-bag"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                      <button
                        className="cartBtn"
                        style={{
                          opacity: 0.7,
                          padding: "0px 5px",
                          border: "none",
                          cursor: "pointer",
                          background: "none",
                        }}
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Reviews */}
          <div className="reviews__heading">
            
          </div>

          <div style={{padding: "0 140px"}}>
            {/* Reviews */}
            <h1
              style={{
                padding: "5px 30px",
                opacity: 1,
                borderBottom: "1px solid #999",
                fontFamily: "Poppins,sans-serif",
              }}
            >
              Nhận xét
            </h1>
            <div
              style={{
                padding: "1vmax",
              }}
            >
              {product.reviews && product.reviews[0] ? (
                <div className="review__option">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                </div>
              ) : (
                <p
                  className="noReviews"
                  style={{
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  Chưa có nhận xét *
                </p>
              )}
              <div
                style={{
                  padding: "0px 2vmax",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "1.8vmax",
                    fontWeight: "700",
                    lineHeight: 1,
                    letterSpacing: "-.0125em",
                    color: "#222",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  Thêm nhận xét
                </span>
                <div
                  style={{
                    margin: "1vmax 0",
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#222",
                        fontFamily: "Poppins,sans-serif",
                        padding: "1vmax 0",
                      }}
                    >
                      Đánh giá cúa bạn 
                    </span>
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    ></div>
                  </div>
                </div>
                <textarea
                  cols="30"
                  rows="6"
                  placeholder="Bình luận *"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    maxWidth: "100%",
                    color: "#111",
                    borderColor: "#e1e1e1",
                    background: "#fff",
                    borderRadius: "0.3rem",
                    outline: "none",
                    padding: "5px",
                    fontSize: "1.2vmax",
                    lineHeight: "1.5",
                    resize: "none",
                    display: "block",
                  }}
                ></textarea>
                <button
                  type="submit"
                  style={{
                    width: "12vmax",
                    margin: "1vmax 0px",
                    fontFamily: "sans-serif",
                    padding: "10px 15px",
                    background: "#3BB77E",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                  onClick={reviewSubmitHandler}
                >
                  Tạo
                </button>
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

export default ProductDetails;
