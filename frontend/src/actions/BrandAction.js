import axios from "axios";
import {
  ALL_BRAND_FAIL,
  ALL_BRAND_REQUEST,
  ALL_BRAND_SUCCESS,
} from "../constans/BrandConstans";

export const getBrand = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_BRAND_REQUEST,
    });

    let link = `/api/v2/brand`;

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_BRAND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};
