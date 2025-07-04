import { currentUser } from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name, billboardId } = body

        if (!user?.id) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("name is required", { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse("billboardId is required", { status: 400 })
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

        const category = await prismadb.category.create({
            data:{
                name,
                billboardId,
                storeId: params.storeId,
            }
        })
        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        console.log("[CATEGORIES_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 400 })
        }

        const categories = await prismadb.category.findMany({
            where:{
                storeId: params.storeId,
            }
        })
        return NextResponse.json(categories, { status: 201 })
    } catch (error) {
        console.log("[CATEGORIES_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}