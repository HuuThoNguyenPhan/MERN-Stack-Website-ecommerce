import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/CartAction";
import "./ProductCard.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ProductCard = ({ product, match }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const addToCartHandler = (e) => {
    dispatch(addItemsToCart(product._id, 1));
    toast.success(`Đã thêm sản phẩm vào giỏ hàng`);
    e.preventDefault();
  };

  const increaseQuantity = (e, stock) => {
    e.preventDefault();
    const newQty =
      cartItems.find((item) => item.product == product._id).quantity + 1;
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
      cartItems.find((item) => item.product == product._id).quantity - 1;
    if (cartItems.find((item) => item.product == product._id).quantity <= 1) {
      dispatch(removeItemsFromCart(product._id));
      toast.success(`Đã xóa sản phẩm khỏi giỏ hàng`);
      return;
    }
    dispatch(addItemsToCart(product._id, newQty));
  };

  return (
    <>
      <Link className="ProductCard" to={`/product/${product._id}`}>
        <img
          src={product.image[0].url}
          alt={product.name}
          className="ProductImg"
        />
        <p className="productName">{product.name}</p>
        <div>
          <Rating {...options} />
          <span>({product.numOfReviews} Reviews)</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="offerPriceBox">
            <h4
              className="discountPrice"
              style={{
                fontSize: "18px",
                paddingBottom: "0",
                color: "#ed1164",
              }}
            >
              {product.offerPrice && product.offerPrice > 0
                ? `${product.offerPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}`
                : ""}
            </h4>
            <span className="p__Price">{`${product.price.toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}`}</span>
          </div>
        </div>

        {typeof cartItems.find((item) => item.product == product._id) ==
        "object" ? (
          <div>
            <button className="btn-alter" onClick={decreaseQuantity}>
              -
            </button>
            <input
              type="number"
              onClick={(event) => event.preventDefault()}
              value={
                cartItems.find((item) => item.product == product._id).quantity
              }
              readOnly
            />
            <button className="btn-alter" onClick={increaseQuantity}>
              +
            </button>
          </div>
        ) : (
          <button
            id={product._id}
            className="btn-buy"
            type="button"
            onClick={addToCartHandler}
          >
            Chọn mua
          </button>
        )}
      </Link>
    </>
  );
};

export default ProductCard;
