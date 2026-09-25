const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

/**
 * accesstoken.js - Fetches Safaricom Daraja API OAuth access token
 */
async function getAccessToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY || "tg51Ha2KCUKgt5IaaP3iDSpRwJGhVNDwrpX1folhl3tzYyZr";
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET || "SyMLcD9ae75z0wqCrC7vqxcJ5hWdRW3DIK2WqLc8e2xOkOqrDcKiqIj9UD1EC9Qq";
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Safaricom access token:", error.response?.data || error.message);
    throw new Error(error.response?.data?.errorMessage || "Failed to authenticate with Safaricom Daraja API");
  }
}

module.exports = getAccessToken;
