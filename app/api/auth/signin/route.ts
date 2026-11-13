import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
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

    const { email, password } = body ?? {};

    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email.trim() ||
        !password
    ) {
        return NextResponse.json(
            { error: "Name, email, and password are required" },
            { status: 400 }
        );
    }

    const cleanEmail = email.trim().toLowerCase();

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: cleanEmail
            }
        })


        if (!user || !user.passwordHash) {
            return { success: false, error: 'Invalid email or password.' };
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash
        )
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }
        return NextResponse.json(
            {
                message: "Login successful",
                user: {
                    id: user.id,
                    userName: user.name,
                    email: user.email
                }
            },
            { status: 200 }
        );


    } catch (error) {
        console.error("Login failed:", error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}