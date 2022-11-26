import React, { useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/OrderAction";
import { useAlert } from "react-alert";
import Loading from "../../more/Loader";
import BottomTab from "../../more/BottomTab";

const MyOrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector(
    (state) => state.myOrderDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <Typography variant="h4" component="h1">
              Thông tin đơn hàng #{order && order._id}
            </Typography>
            <div className="orderDetailsContainer flex space__around">
              <div>
                <Typography>Thông tin giao hàng</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Tên:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Số điện thoại:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Địa chỉ:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.state}`}
                    </span>
                  </div>
                </div>
              </div>
              <div>
              <Typography>Thanh toán</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  ></p>
                  <p
                    style={{
                      color: "green",
                    }}
                  >
                    Đã thanh toán
                  </p>
                </div>

                <div>
                  <p>Tổng:</p>
                  <span>
                    {(order.totalPrice && order.totalPrice.toLocaleString("vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }))}
                  </span>
                </div>
              </div>
              </div>

              <div>
              <Typography>Trạng thái đặt hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Hàng đã mua</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.Offer}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.Offer}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ${item.price} ={" "}
                        <b>${item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
      <BottomTab />
    </>
  );
};

export default MyOrderDetails;
