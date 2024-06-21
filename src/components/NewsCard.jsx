import React, { useState } from "react";
import fallBackImg from "../assets/fallBackImg.webp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedArticleLink } from "../slices/articleSlice";
import { scrapeAndStoreProduct } from "../lib/actions";
import { add, remove } from "../slices/CartSlice";

const NewsCard = ({ article }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useSelector((state) => state);

  const addToCart = () => {
    // dispatch(add(article.url));
    dispatch(add(article));

    console.log("Item added to Cart");
  };

  const removeFromCart = () => {
    // dispatch(remove(article.url));
    dispatch(remove(article));s

    console.log("Item removed from Cart");
  };

  const handleButtonClick = async () => {
    dispatch(setSelectedArticleLink(article?.url)); // Dispatch the selected article to Redux store
    console.log("on Button clicking ", article?.url);
    navigate("/newspage"); // Navigate to /newspage
  };

  const isInCart = cart.includes(article);

  return (
    <div className="cursor-pointer p-3 rounded-lg shadow-2xl h-[600px] border flex flex-col justify-between hover:scale-105 transition-all duration-150">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          {article?.title?.substring(0, 70)}...
        </h1>
      </div>
      <div className="flex justify-center max-h-[30%]">
        <img
          className="rounded-md"
          src={article?.urlToImage || fallBackImg}
          alt="News Image"
        />
      </div>
      <h3 className="text-2-3xl mb-3">
        {article?.description?.substring(0, 100)}...
      </h3>
      <div>
        <p className="text-sm">
          <span className="font-bold">Published At : </span>
          {article.publishedAt}
        </p>
        <h4 className="text-sm">
          <span className="font-bold">Sourse :</span> {article?.source?.name}
        </h4>
      </div>

      <p className="truncate">{article?.description?.substring(0, 150)}...</p>
      {/* <Link to={article?.url} target="_blank"> */}

      {/* Conditional button for add/remove from favorite */}
      <button
        onClick={isInCart ? removeFromCart : addToCart}
        className=" border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in mt-2"
      >
        {isInCart ? "Remove from favorite" : "Add to favorite"}
      </button>

      <button onClick={handleButtonClick} className="p-[3px] relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
          read more
        </div>
      </button>
      {/* </Link> */}
    </div>
  );
};

export default NewsCard;
