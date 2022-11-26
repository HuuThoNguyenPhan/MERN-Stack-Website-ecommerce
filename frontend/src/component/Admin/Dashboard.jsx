import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import {Link} from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
    // eslint-disable-next-line
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata.js";
import Loading from "../../more/Loader.js";
import { getAdminProduct } from "../../actions/ProductActions.js";
import { getAllOrders } from "../../actions/OrderAction.js";
import { getAllUsers } from "../../actions/userAction.js";

const Dashboard = () => {

  const dispatch = useDispatch();

  const { products,loading } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.AllOrders);

  const { users } = useSelector((state) => state.allUsers);

   let outOfStock = 0;
     
   products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
      }, [dispatch]);    

    let totalAmount = 0;
      orders &&
        orders.forEach((item) => {
          totalAmount += item.totalPrice;
        });

    const lineState = {
        labels: ["Số tiền ban đầu", "lợi nhuận"],
        datasets: [
          {
            label: "Tổng cộng",
            backgroundColor: ["#3BB77E"],
            hoverBackgroundColor: ["#3BB77E"],
            data: [0, totalAmount],
          },
        ],
      };

     const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

    return (
       <>
       {loading ?
       <Loading />
       :(
        <div className="dashboard">
        <MetaData title="Dashboard" />
        <Sidebar />
  
        <div className="dashboardContainer">
          <Typography component="h1">Thống kê</Typography>
  
          <div className="dashboardSummary">
            <div>
              <p>
                Lợi nhuận <br /> {totalAmount.toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Sản phẩm</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Hóa đơn</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Người dùng</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
  
          <div className="lineChart">
            <Line data={lineState} />
          </div>
  
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
       )
       }
       </>
    );
  };
export default Dashboard
