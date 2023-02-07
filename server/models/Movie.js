import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    img: {
        type: String
    },
    imgTitle: {
        type: String
    },
    imgSm: {
        type: String
    },
    trailer: {
        type: String
    },
    year: {
        type: String
    },
    genre: {
        type: String
    },
    isSeries: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
);

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;