import { currentUser } from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name, value } = body

        if (!user?.id) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("name is required", { status: 400 })
        }

        if (!value) {
            return new NextResponse("value is required", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: user.id
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const size = await prismadb.size.create({
            data:{
                name,
                value,
                storeId: params.storeId,
            }
        })
        return NextResponse.json(size, { status: 201 })
    } catch (error) {
        console.log("[SIZES_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 400 })
        }

        const sizes = await prismadb.size.findMany({
            where:{
                storeId: params.storeId,
            }
        })
        return NextResponse.json(sizes, { status: 201 })
    } catch (error) {
        console.log("[SIZES_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}