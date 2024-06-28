import axios from 'axios';

export const getNews = async (country, category, page, pageSize) => {
  console.log("country is ", country);
  try {
    const response = await axios.get(`http://localhost:3000/api/news`, {
      params: {
        country,
        category,
        page,
        pageSize,
      }
    });

    console.log("response ", response);

    return {
      articles: response.data.articles,
      totalResults: response.data.totalResults,
    };
  } catch (error) {
    console.error('Error fetching news:', error.message);
    // Handle error gracefully
    throw error; // or return an error object as needed
  }
};
