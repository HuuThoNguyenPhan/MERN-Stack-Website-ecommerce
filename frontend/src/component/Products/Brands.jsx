import { Card } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";

const ListBrand = () => {
  const [brands, setBrand] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v2/brand")
      .then((response) => {
        const uniqueArray = [
          ...new Map(response.data.brands.map((item) => [item["name"], item])).values(),
        ];
        setBrand(uniqueArray);
        console.log(uniqueArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {brands.map((brand) => (
        <p key={brand._id}>{brand.name}</p>
      ))}
    </div>
  );
};

export default ListBrand;
