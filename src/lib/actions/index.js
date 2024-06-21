
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl){
    
    if(!productUrl) return;

    try{
        
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        return scrapedProduct;
    } catch(error){
        console.error(`Failed to create/update product: ${error.message}`);
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}