// src/app/api/movie/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import Movie from '../../../models/Movie';

export async function POST(req: Request) {
    await dbConnect();

    const { name, image } = await req.json();
    const newMovie = new Movie({
        name,
        image,
        genres: []
    });

    await newMovie.save();
    return NextResponse.json(newMovie, { status: 201 });
}

export async function GET() {
    await dbConnect();

    const movies = await Movie.find({});
    return NextResponse.json(movies, { status: 200 });
}
