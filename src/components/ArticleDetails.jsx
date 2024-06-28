import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { scrapeAndStoreProduct } from "../lib/actions";
import Spinner from "../components/Spinner"; // Assuming you have a Spinner component

const ArticleDetails = () => {
  const selectedArticleLink = useSelector(
    (state) => state.article.selectedArticle
  );
  const [isLoading, setIsLoading] = useState(false);
  const [newsDetails, setNewsDetails] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);

        // Scrape the product page
        const newsDetails_ = await scrapeAndStoreProduct(selectedArticleLink);
        setNewsDetails(newsDetails_);
        console.log("newsDetails: ", newsDetails_);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        console.log("Finished product scraping");
      }
    };

    if (selectedArticleLink) {
      fetchProductData();
    }
  }, [selectedArticleLink]);

  const formatDescription = (description) => {
    return description.split("\n").map((para, index) => (
      <p key={index} className="mb-4">
        {para}
      </p>
    ));
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-900 text-white pt-5">
      {isLoading ? (
        <div className="h-[500px] flex items-center justify-center mx-auto">
          <Spinner />
        </div>
      ) : newsDetails ? (
        <div className="w-11/12 p-5 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{newsDetails.title}</h1>
          <div className="flex justify-center mb-4">
            <img
              className="rounded-md"
              src={newsDetails.image1}
              alt={newsDetails.title}
            />
          </div>
          <div className="text-lg mb-4">
            {newsDetails.brTagsContent.map((content, index) => (
              <p key={index} className="mb-2">
                {content}
              </p>
            ))}
          </div>
          <div className="text-lg mb-4">
            {formatDescription(newsDetails.description1)}
          </div>
          <div className="text-lg mb-4">
            {formatDescription(newsDetails.description2)}
          </div>
        </div>
      ) : (
        <p>No article selected or details not available.</p>
      )}
    </div>
  );
};

export default ArticleDetails;
