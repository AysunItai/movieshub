import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import Movie from '../../../../models/Movie';

// Get movie by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();

    const { id } = params;
    const movie = await Movie.findById(id);

    if (!movie) {
        return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
}

// Update movie by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();

    const { id } = params;
    const { name, image, genres } = await req.json();
    const movie = await Movie.findByIdAndUpdate(id, { name, image, genres }, { new: true });

    if (!movie) {
        return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
}

// Delete movie by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();

    const { id } = params;
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
        return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Movie deleted successfully' }, { status: 200 });
}
