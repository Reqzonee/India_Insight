import axios from 'axios';

/**
 * Helper function to fetch scraped Amazon product data from backend server.
 * @param {string} url - The Amazon product URL to scrape.
 * @returns {Promise<object>} - Resolves with scraped product data.
 */
export async function helper(url) {
  try {
    console.log("Inside helper");
    const response = await axios.get(`http://localhost:3000/scrape?url=${encodeURIComponent(url)}`);
    console.log("Response received from backend:", response); 
    return response.data;
  } catch (error) {
    console.error("Error in helper function:", error.message); 
    throw new Error(`Failed to fetch scraped product data: ${error.message}`);
  }
}
