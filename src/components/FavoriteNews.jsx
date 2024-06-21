import React from "react";
import { useSelector } from "react-redux";
import NewsCard from "../components/NewsCard";

const FavoriteNews = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="w-full flex flex-col items-center bg-gray-900 text-white pt-5">
      {cart.length > 0 ? (
        <div className="w-11/12 p-3 grid gap-10 grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {cart.map((article, index) => (
            <NewsCard article={article} key={index} inCart={true} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[500px]">
          <p className="text-xl">Your favorite list is empty.</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteNews;
