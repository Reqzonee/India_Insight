import axios from "axios";
import * as cheerio from "cheerio";
// import { extractPrice } from "../utils";

export async function scrapeAmazonProduct(url) {
  console.log("Befor return ");
  if (!url) {
    return;
  }
  console.log("After return ");

  // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_444c8484-zone-web_unlocker1:668k1mpjy1uv -k "http://geo.brdtest.com/mygeo.json"

  // BrightData proxy configuration
  const username ="brd-customer-hl_444c8484-zone-web_unlocker1";
  const password = "668k1mpjy1uv";

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
    // Fetch the product page
    // console.log("I am inside axios call");
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    const title = $(".narticle-title").text().trim();
    const image1 = $(".nart-img").attr("src");
    const image2 = $(".thumbBlock").attr("src");
    const description1 = $(".jsx-f7aac377f86ef4b5 ").text().trim();
    const description2 = $(".narticle-data").text().trim();
    const brTagsContent = [];
    $('br').each((index, element) => {
      // Get the next sibling text node content after the <br> tag
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

    // console.log("response", response);
    // console.log(result);
    // console.log({currentPrice});
    return result;
  } catch (error) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
