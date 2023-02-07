import express from "express";
import fetch from "node-fetch";

const router = express.Router();

//get movie by id
router.get("find/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await fetch(`${process.env.TMDB_BASE_URL}movie/${id}?api_key=${process.env.TMDB_KEY}`);
        const data = await movie.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error);
    }
});

//discover movies
router.get("/discover", async (req, res) => {
    try {
        const page = req.query.page;
        const query = req.query.genre;
        const movie = await fetch(`${process.env.TMDB_BASE_URL}discover/movie?api_key=${process.env.TMDB_KEY}&sort_by=popularity.desc&page=${page}&with_genres=${query}`);
        const data = await movie.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error);
    }
})

//search movie
router.get("/search", async (req, res) => {
    try {
        const page = req.query.page;
        const q = req.query.title;
        const movie = await fetch(`${process.env.TMDB_BASE_URL}search/movie?api_key=${process.env.TMDB_KEY}&query=${q}&page=${page}`);
        const data = await movie.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error);
    }
})

//trending movies
router.get("/trending", async (req, res) => {
    try {
        const page = req.query.page;
        const movie = await fetch(`${process.env.TMDB_BASE_URL}trending/movie/week?api_key=${process.env.TMDB_KEY}&page=${page}&append_to_response=videos`)
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