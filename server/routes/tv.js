import express from "express";
import fetch from "node-fetch";

const router = express.Router();

//get tv by id
router.get("/find/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await fetch(`${process.env.TMDB_BASE_URL}tv/${id}?api_key=${process.env.TMDB_KEY}`);
        const data = await movie.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error);
    }
});

//discover tv
router.get("/discover", async (req, res) => {
    try {
        const page = req.query.page;
        const query = req.query.genre;
        const movie = await fetch(`${process.env.TMDB_BASE_URL}discover/tv?api_key=${process.env.TMDB_KEY}&sort_by=popularity.desc&page=${page}&with_genres=${query}`);
        const data = await movie.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error);
    }
})

//search tv
router.get("/search", async (req, res) => {
    try {
        const query = req.query.title;
        const movie = await fetch(`${process.env.TMDB_BASE_URL}search/tv?api_key=${process.env.TMDB_KEY}&query=${query}`);
        const data = await movie.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error);
    }
})

//trending tv
router.get("/trending", async (req, res) => {
    try {
        const movie = await fetch(`${process.env.TMDB_BASE_URL}trending/tv/week?api_key=${process.env.TMDB_KEY}`);
        const data = await movie.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error);
    }
})

//get genre
router.get("/genres/:type", async (req, res) => {
    try {
        const type = req.params.type;
        const movie = await fetch(`${process.env.TMDB_BASE_URL}genre/${type}/list?api_key=${process.env.TMDB_KEY}`)
        const data = await movie.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error);
    }
})

export default router;