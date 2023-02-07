import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export const getMoviesPage = async (pageNumber = 1, genre = "", options = {}) => {
    const { data } = await api.get(`/movie/discover?page=${pageNumber}&with_genres=${genre}`, options);
    return data.results;
}

export const getMoviesTrending = async (pageNumber = 1, options = {}) => {
    const { data } = await api.get(`/movie/trending?page=${pageNumber}`, options);
    return data.results;
}

export const getSeries = async (pageNumber = 1, options = {}) => {
    const { data } = await api.get(`/tv/discover?page=${pageNumber}`, options);
    return data.results;
}

export const getSeriesTrending = async (pageNumber = 1, options = {}) => {
    const { data } = await api.get(`/tv/trending?page=${pageNumber}`, options);
    return data.results;
}

export const getSearch = async (type = 0, text = "", pageNumber = 1, options = {}) => {
    const { data } = await api.get(`/${type ? "movie" : "tv"}/search?page=${pageNumber}`, options);
    return data.results;
}

export const getId = async (type, text = "", pageNumber = 1, id, options = {}) => {
    const { data } = await api.get(`/${type ? "movie" : "tv"}/find/${id}?page=${pageNumber}`, options);
    return data.results;
}