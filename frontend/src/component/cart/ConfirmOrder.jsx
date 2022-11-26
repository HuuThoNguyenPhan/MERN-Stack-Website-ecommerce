import React from "react";
import "./ConfirmOrder.css";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../../more/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import BottomTab from "../../more/BottomTab";



const ConfirmOrder = ({ history }) => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const { user } = useSelector((state) => state.user);
    
    let productPrice =  cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    const subtotal = productPrice 
      // eslint-disable-next-line
    const shippingCharges = productPrice > 99 ? 0 : 50;
    
    const totalPrice = subtotal + shippingCharges;
  
    const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.country}`;
  
    const proceedToPayment = () => {
      const data = {
        subtotal,
        shippingCharges,
        totalPrice,
      };
  
      sessionStorage.setItem("orderInfo", JSON.stringify(data));
  
      history.push("/process/payment");
    };
  
    return (
      <>
        <MetaData title="Confirm Order" />
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
          <div>
            <div className="confirmshippingArea">
              <Typography>Thông tin giao hàng</Typography>
              <div className="confirmshippingAreaBox">
                <div>
                  <p>Tên:</p>
                  <span>{user.name}</span>
                </div>
                <div>
                  <p>Điện thoại:</p>
                  <span>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Địa chỉ:</p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography>Sản phẩm mua:</Typography>


              {cartItems.length === 0 ? 
                <div className="confirmCartItemsContainer">
                   ""
                 </div>
                  :
             <div className="confirmCartItemsContainer">
             {cartItems.map((item) => (
               <div key={item.product}>
                 <img src={item.image} alt="Product" />
                 <Link to={`/product/${item.product}`}>
                   {item.name}
                 </Link>{" "}
                 <span>
                   {item.quantity} X {item.price.toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )} ={" "}
                   <b>{(item.price * item.quantity).toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}</b>
                 </span>
               </div>
             ))
              }
           </div>
          }
     
            </div>
          </div>
          {/*  */}
          <div>
            <div className="orderSummary">
              <Typography>Thanh toán</Typography>
              <div>
                <div>
                  <p>Tạm tính:</p>
                  <span>{subtotal.toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}</span>
                </div>
                <div>
                  <p>Chi phí vận chuyển:</p>
                  <span>{shippingCharges.toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}</span>
                </div>
                <div>
                </div>
              </div>
  
              <div className="orderSummaryTotal">
                <p>
                  <b>Tổng tiền:</b>
                </p>
                <span>{totalPrice.toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}</span>
              </div>
                  
              <button onClick={proceedToPayment}>Tiến hành thanh toán</button>
            </div>
          </div>
        </div>
        <BottomTab />
      </>
    );
  };
  
  export default ConfirmOrder;
