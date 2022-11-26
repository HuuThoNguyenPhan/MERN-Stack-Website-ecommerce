import React from "react";
import "./Favourite.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavouriteItemsToCart } from "../../actions/FavouriteAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";
import FavouriteItemsCard from "./FavouriteItemsCard.jsx";
import MetaData from "../../more/Metadata";
import Loading from "../../more/Loader";
import BottomTab from "../../more/BottomTab";
import Header from "../Home/Header";
import Footer from "../../Footer";

const Favourite = ({ history }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.productDetails);
  const { favouriteItems } = useSelector((state) => state.favourite);

  const deleteFavouriteItems = (id) => {
    dispatch(deleteFavouriteItemsToCart(id));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Favourites Items" />
          {favouriteItems.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />
              <Typography>Chưa có sản phẩm yêu thích</Typography>
              <Link to="/products">Xem sản phẩm</Link>
              <BottomTab />
            </div>
          ) : (
            <>
              <Header />
              <div className="favouritesPage">
                <div style={{ fontSize: "15px" }} className="favouritesHeader">
                  <p>Sản phẩm</p>
                  <p>Giá</p>
                  <p>Số lượng</p>
                  <p>Mua hàng</p>
                </div>
                {favouriteItems &&
                  favouriteItems.map((item) => (
                    <div className="favouritesContainer" key={item.product}>
                      <FavouriteItemsCard
                        item={item}
                        deleteFavouriteItems={deleteFavouriteItems}
                      />
                    </div>
                  ))}
                <BottomTab />
              </div>
              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Favourite;
