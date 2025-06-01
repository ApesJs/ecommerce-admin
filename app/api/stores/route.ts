import { currentUser } from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name } = body

        if (!user?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        const store = await prismadb.store.create({
            data:{
                name,
                userId: user.id
            }
        })
        return NextResponse.json(store, { status: 201 })
    } catch (error) {
        console.log("[STORES_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}


