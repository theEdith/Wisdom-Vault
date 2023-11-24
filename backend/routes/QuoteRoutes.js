import express from "express";
import { Quote } from "../models/quotesDb.js";
const router = express.Router();

//to save the quote in database
router.post("/", async (req, res) => {
  try {
    if (!req.body.quote || !req.body.author) {
      res.status(400).send({
        message: "Send all required fields.",
      });
    } else {
      const newQuote = new Quote({
        quote: req.body.quote,
        author: req.body.author,
      });

      const quoteSaved = await newQuote.save();
      res.status(201).send({
        message: "Quote saved to database!!",
        quoteSaved,
      });
      console.log("Quote saved to database!!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//to view all quote from database
router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find();

    res.status(200).send({
      count: quotes.length,
      data: quotes,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//to get only one quote from database
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const book = await Quote.findById(_id);
    res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//update a quote
router.patch("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedQuote = await Quote.findByIdAndUpdate(_id, req.body);
    if (!updatedQuote) {
      return res.status(404).send({ message: "Quote not found!" });
    }
    res.status(200).send({
      message: "Quote updated successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//delete a quote from database
router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedQuote = await Quote.findByIdAndDelete(_id);
    if (!deletedQuote) {
      return res.status(404).send({ message: "Quote not found!" });
    }
    res.status(200).send({ message: "Quote deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


export default router;