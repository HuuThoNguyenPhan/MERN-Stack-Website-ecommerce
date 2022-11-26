import { Link } from "react-router-dom";
import "./FavouriteItemsCard.css";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const FavouriteItemsCard = ({ item, deleteFavouriteItems }) => {
  const { product } = useSelector((state) => state.productDetails);

  return (
    <div className="FavouriteItemsCard">
      <div>
        <img src={item.image[0].url} alt="ssa" />
        <p onClick={() => deleteFavouriteItems(item.product)}>Xóa</p>
        <Link
          to={`/product/${item.product}`}
          style={{
            fontSize: "300 0.9vmax",
            fontFamily: "cursive",
          }}
        >
          {item.name}
        </Link>
      </div>

      <div>
        <strong>{`${item.price.toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}`}</strong>
      </div>

      <div>
        <p style={{ paddingBottom: ".5vmax", fontSize: "15px" }}>
          <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
            {product.Stock < 1 ? "Hết hàng" : `${product.Stock} sản phẩm`}
          </b>
        </p>
      </div>

      <div>
        <Link to={`/product/${item.product}`}>
          <button className="favouritesButton">
            <ShoppingCartIcon />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FavouriteItemsCard;
