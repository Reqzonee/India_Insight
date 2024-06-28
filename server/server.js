import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import cheerio from 'cheerio';
import https from 'https';

dotenv.config();

const app = express();


// Configure CORS to allow all origins and the GET method
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET'], // Allow only GET method
}));

app.get('/api/news', async (req, res) => {
  const { country, category, page, pageSize } = req.query;
  const apiKey = process.env.NEWS_API_KEY; // Ensure you set NEWS_API_KEY in your .env file

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
  

  try {
    const response = await fetch(url)
    res.json({
      url:url,
      articles: response.data.articles,
      totalResults: response.data.totalResults,
    });
    return response;
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});


// Function to scrape Amazon product
export async function scrapeAmazonProduct(url) {
  console.log("scrapeAmazonProduct called with URL:", url);
  if (!url) {
    console.log("URL is missing");
    return;
  }

  const username = process.env.VITE_BRIGHT_DATA_USERNAME;
  const password = process.env.VITE_BRIGHT_DATA_PASSWORD;
  if (!username || !password) {
    console.error("Missing username or password for Bright Data");
    throw new Error("Missing username or password for Bright Data");
  }

  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  // Create an https agent that ignores SSL certificate errors
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  try {
    console.log("Attempting to fetch URL with axios");
    const response = await axios.get(url, options);

    // Ensure the content type is HTML or XML
    // const contentType = response.headers['content-type'];
    // if (contentType && (contentType.includes('html') || contentType.includes('xml'))) {
    //   // Log the entire HTML or XML content
    //   console.log("HTML/XML Data:", response.data);
    // } else {
    //   console.log("Response is not HTML or XML");
    // }

    const $ = cheerio.load(response.data);

    const title = $(".narticle-title").text().trim();
    const image1 = $(".nart-img").attr("src");
    const image2 = $(".thumbBlock").attr("src");
    // const description1 = $(".jsx-f7aac377f86ef4b5 .page-content").text().trim();
    let description1 = '';
    $("p").each((index, element) => {
      description1 += $(element).text().trim() + ' '; // Append paragraph text with space separation
    });

    // Remove extra spaces and trim the final description
    description1 = description1.trim();

    const description2 = $(".narticle-data").text().trim();
    const brTagsContent = [];
    $('br').each((index, element) => {
      const nextText = $(element).next().text().trim();
      if (nextText) {
        brTagsContent.push(nextText);
      }
    });

    const result = {
      title,
      image1,
      image2,
      description1,
      description2,
      brTagsContent
    };

    // console.log("Scraped data:", result);
    return result;
  } catch (error) {
    if (error.response) {
      console.error("Response error:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    console.error("Error config:", error.config);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}

// Middleware function to scrape Amazon product data
const scrapeMiddleware = async (req, res, next) => {
  const { url } = req.query;
  console.log("scrapeMiddleware called with URL:", url);

  if (!url) {
    console.log("URL is required");
    return res.status(400).send('URL is required');
  }

  try {
    const result = await scrapeAmazonProduct(url);
    req.productData = result; // Attach scraped data to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Middleware error:", error.message, error.stack);
    res.status(500).send(`Failed to scrape product: ${error.message}`);
  }
};

// Route to scrape Amazon product data
app.get('/scrape', scrapeMiddleware, (req, res) => {
  res.json(req.productData); // Return scraped data to frontend
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
