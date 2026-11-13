import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { userName, email, password } = body ?? {};

    if (
        typeof userName !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        !userName.trim() ||
        !email.trim() ||
        !password
    ) {
        return NextResponse.json(
            { error: "Name, email, and password are required" },
            { status: 400 }
        );
    }
    const cleanName = userName.trim();
    const cleanEmail = email.trim().toLowerCase();

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: cleanEmail
            }
        })
        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 })
        }

        const passwordHash = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name: cleanName,
                email: cleanEmail,
                passwordHash,
            },
            select: { id: true, name: true, email: true, createdAt: true }
        })
        return NextResponse.json(
            { user: { id: user.id, userName: user.name, email: user.email, createdAt: user.createdAt } },
            { status: 201 }
        )
    } catch (error) {
        if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }
        console.error("register failed:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}