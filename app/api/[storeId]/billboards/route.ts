import { currentUser } from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { label, imageUrl } = body

        if (!user?.id) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!label) {
            return new NextResponse("label is required", { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse("imageUrl is required", { status: 400 })
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

        const billboard = await prismadb.billboard.create({
            data:{
                label,
                imageUrl,
                storeId: params.storeId,
            }
        })
        return NextResponse.json(billboard, { status: 201 })
    } catch (error) {
        console.log("[BILLBOARDS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 400 })
        }

        const billboards = await prismadb.billboard.findMany({
            where:{
                storeId: params.storeId,
            }
        })
        return NextResponse.json(billboards, { status: 201 })
    } catch (error) {
        console.log("[BILLBOARDS_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}