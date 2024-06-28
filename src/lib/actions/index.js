
import { helper } from "../scraper";

export async function scrapeAndStoreProduct(productUrl){
    console.log("hello");
    if(!productUrl) return;

    try{
        const scrapedProduct = await helper(productUrl);
        return scrapedProduct;
    } catch(error){
        console.error(`Failed to create/update product: ${error.message}`);
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}