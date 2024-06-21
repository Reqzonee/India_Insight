export const getNews = async (country, category, page, pageSize) => {
  try {
    const url_key = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${
      `3e528274c195466daff3de2796b3850d`
    }&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url_key);
    let finalData = await data.json();
    // console.log(finalData);
    return {
      articles: finalData?.articles,
      totalResults: finalData?.totalResults,
    };
  } catch (error) {
    console.log(error);
  }
};
