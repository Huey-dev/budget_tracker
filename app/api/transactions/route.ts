import { NextResponse } from "next/server";

export async function POST(request: Request) {
    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 }
        )
    }

    const {
        direction,
        kind,
        amount,
        category,
        description
    } = body ?? {};

// lets stop here
    
}