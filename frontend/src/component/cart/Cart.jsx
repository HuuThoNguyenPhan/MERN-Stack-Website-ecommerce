import React from "react";
import "./Cart.css";
import Footer from "../../Footer";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/CartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard.js";
import BottomTab from "../../more/BottomTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  let Price = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  let totalPrice = Price;

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return toast.error("Số lượng sản phẩm có hạn");
    } else if (newQty > 3) {
      return toast.error("Chỉ được mua tối đa 3 sản phẩm");
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>Chưa có sản phẩm nào trong giỏ</Typography>
          <Link to="/products">Xem sản phẩm</Link>
          <BottomTab />
        </div>
      ) : (
        <>
          <Header />
          <div className="cartPage">
            <div className="cartHeader">
              <p>Sản phẩm</p>
              <p>Số lượng mua</p>
              <p>Tổng</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" readOnly value={item.quantity} />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`${(
                    item.price * item.quantity
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p style={{ fontWeight: "bold" }}>Tổng tiền</p>
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button style={{ fontSize: "15px" }} onClick={checkoutHandler}>
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
          <Footer />
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Cart;
