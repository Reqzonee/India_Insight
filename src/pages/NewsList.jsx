// components/NewsList.js

import React, { useEffect, useState } from "react";
import { useCountry } from "../context/countryContext";
import { getNews } from "../api/getNews";
import NewsCard from "../components/NewsCard";
import Spinner from "../components/Spinner";

const NewsList = ({ category, pageTitle }) => {
  const [country] = useCountry();
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    console.log("Page ", page);
    console.log("Page size", pageSize)
    console.log("news length ", news.length);
  },[page] )

  const fetchNews = async (page) => {
    try {
      setLoading(true);
      const data = await getNews(country, category, page, pageSize);
      setNews(data?.articles);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNews(page);
    document.title = `Top Headlines - ${pageTitle}`;
  }, [country, page]);

  const handleBack = async (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
      await fetchNews(page - 1);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setPage(page + 1);
    await fetchNews(page + 1);
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-900 text-white pt-5 ">
      {!loading && news?.length > 0 ? (
        <>
          <div className="w-11/12 p-3 grid gap-10  grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
            {news?.map((article, i) => (
              <NewsCard article={article} key={i} />
            ))}
          </div>
          <div className="w-3/4flex mx-auto ">
          {
            page>1&&
            <button
              className="p-2 rounded-lg bg-yellow-300 text-black w-max m-3 mb-5 disabled:opacity-80 font-bold"
              onClick={handleBack}
              disabled={page <= 1 || !news}
            >
              Back
            </button>
          }
          {
            news?.length >= pageSize &&
            <button
              className="p-2 rounded-lg bg-yellow-300 text-black w-max m-3 mb-5 disabled:opacity-80 font-bold"
              onClick={handleNext}
              disabled={news?.length < pageSize || !news}
            >
              Next
            </button>
          }
            
            
          </div>
        </>
      ) : (
        <div className="h-[500px] flex items-center justify-center mx-auto">
        <Spinner />
        </div>
      )}
    </div>
  );
};

export default NewsList;
