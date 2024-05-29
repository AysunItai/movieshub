// src/models/Movie.ts
import mongoose, { Schema, Document, model } from 'mongoose';

interface IMovie extends Document {
    name: string;
    image: string;
    genres: { genre: { name: string } }[];
}

const MovieSchema: Schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    genres: [{ genre: { name: String } }],
});

export default mongoose.models.Movie || model<IMovie>('Movie', MovieSchema);
