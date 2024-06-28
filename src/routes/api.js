// src/lib/scraper/index.js

import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAmazonProduct(url) {
  console.log("Before return ");
  if (!url) {
    return;
  }
  console.log("After return ");

  const username = import.meta.env.NEXT_PUBLIC_BRIGHT_DATA_USERNAME;
  const password = import.meta.env.NEXT_PUBLIC_BRIGHT_DATA_PASSWORD;

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

  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    const title = $(".narticle-title").text().trim();
    const image1 = $(".nart-img").attr("src");
    const image2 = $(".thumbBlock").attr("src");
    const description1 = $(".jsx-f7aac377f86ef4b5 ").text().trim();
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

    console.log("response", response);
    return result;
  } catch (error) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
