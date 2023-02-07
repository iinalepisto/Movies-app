import express from "express";
import List from "../models/List.js";
import list from "../models/List.js";

const router = express.Router();

//create list

router.post("/", async (req, res) => {
    try {
        const newList = new List(req.body);


    } catch (error) {

    }
})
