import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { Toaster } from "react-hot-toast";

const ProductDetails = ({ productData, productsData }) => {
  const { image, name, details, price } = productData;

  const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

  const [index, setIndex] = useState(0);

  const handleBuyNow = () => {
    onAdd(productData, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <Toaster />
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
              alt="headphone"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                src={urlFor(item)}
                alt="products"
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantiti:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick={() => {}}>
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(productData, qty)}
            >
              Add to cart
            </button>
            <button
              type="button"
              className="buy-now"
              onClick={() => handleBuyNow()}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-product-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track ">
            {productsData?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const productsQuery = `*[_type == "product"] {
    slug { current}
  }`;

  const productsData = await client.fetch(productsQuery);

  const paths = productsData.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productData = await client.fetch(productQuery);
  const productsQuery = `*[_type == "product"]`;
  const productsData = await client.fetch(productsQuery);
  return {
    props: {
      productData,
      productsData,
    },
  };
};
