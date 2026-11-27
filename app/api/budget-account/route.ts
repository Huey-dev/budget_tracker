import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const supportedCurrencies = ["NGN", "USD", "GBP"];

interface BudgetAccount {
    id: string;
    name: string;
    currency: string;
    openingBalanceMinor: number;
    createdAt: string;
}

const budgetAccounts: BudgetAccount[] = []
export async function POST(request: Request) {
    let body;

    try {
        body = await request.json();
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 }
        )
    }

    if (
        body === null ||
        typeof body !== "object" ||
        Array.isArray(body)
    ) {
        return NextResponse.json(
            { error: "Request body must be an object" },
            { status: 400 }
        );
    }

    const {
        name,
        currency,
        openingBalanceMinor
    } = body;
    console.log(name);
    console.log(currency);
    console.log(openingBalanceMinor);

    if (typeof name !== "string" || name.trim() === "") {
        return NextResponse.json(
            { error: "A valid budget account name is required" },
            { status: 400 }
        );
    }

    if (!supportedCurrencies.includes(currency)) {
        return NextResponse.json(
            { error: "Unsupported currency" },
            { status: 400 }
        );
    }

    if (
        !Number.isSafeInteger(openingBalanceMinor) ||
        openingBalanceMinor < 0 ||
        openingBalanceMinor > 2147483647
    ) {
        return NextResponse.json(
            { error: "Opening balance must be a non-negative integer" },
            { status: 400 }
        );
    }

    const budgetAccount: BudgetAccount = {
        id: crypto.randomUUID(),
        name: name.trim(),
        currency,
        openingBalanceMinor,
        createdAt: new Date().toISOString()
    };

    try {
        const newAccount = await prisma.budgetAccount.create({
            data: {
                name: name.trim(),
                currency,
                openingBalanceMinor
            }
        })
        return NextResponse.json(
            {
                message: "Budget account created successfully",
                data: newAccount
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Budget starting account creation failed", error)

        return NextResponse.json({
            error: "Unable to create account"
        },
            {
                status: 500
            })
    }
}