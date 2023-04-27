const express = require("express");
const router = express.Router();

// ROUTES
const CoinMarketCapAPI = require("./functions/coinmarketcap.functions");

// REFERENCE
router.get("/c", CoinMarketCapAPI.getQuotes);

module.exports = router;
