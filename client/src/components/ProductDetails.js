import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct } from "../state/actions/products";
import { useEffect } from "react";
import axios from "axios";
import "./ProductDetailWrapper.css";
import Button from "./elements/Button";
import { addToCart } from "../state/actions/cart";

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;

  const { productId } = useParams();
  const dispatch = useDispatch();
  console.log(product);

  const text = "Add To Cart";
  const [buttonText, setButtonText] = useState(text);
  const color = "dark";
  const [buttonColor, setButtonColor] = useState(color);

  useEffect(
    () => {
      const timer = setTimeout(() => {
        setButtonText(text);
        setButtonColor(color);
      }, 2000);
      return () => clearTimeout(timer);
    },
    [buttonText],
    [buttonColor]
  );

  const fetchProductDetail = async () => {
    const response = await axios
      //.get(`https://fakestoreapi.com/products/${productId}`)
      .get(`/api/products/${productId}`)
      .catch((error) => {
        console.log(error);
      });
    console.log(response);
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail();
  }, [productId]);

  return (
    <div className="ProductDetailWrapper">
      <div className="imageColumn">
        <img src={image} alt={title} className="imgDetail" />
      </div>

      <div className="DetailsColumn">
        <h1>{title}</h1>
        <h3>
          {" "}
          <span>category: </span> {category}
        </h3>
        <h4>
          {" "}
          <span>price: </span> ${price}
        </h4>
        <p>
          <strong>Description: </strong> {description}
        </p>

        <Button
          onClick={() =>
            dispatch(
              addToCart(product),
              setButtonText("Item Added!"),
              setButtonColor("white")
            )
          }
          content={buttonText}
          size="wide"
          color={buttonColor}
          animation="color"
        />
      </div>
    </div>
  );
};

export default ProductDetail;
