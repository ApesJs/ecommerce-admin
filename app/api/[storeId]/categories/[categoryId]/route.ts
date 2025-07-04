import {currentUser} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        if (!params.categoryId) {
            return new NextResponse("categoryId is required", { status: 400 });
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
            include: {
                billboard: true,
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORIES_GET]', error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const user = await currentUser();
        const body = await req.json();

        const { name, billboardId } = body;

        if (!user?.id) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("name is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("billboardId is required", { status: 400 });
        }

        if (!params.categoryId) {
            return new NextResponse("billboardId is required", { status: 400 });
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

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                billboardId,
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORIES_PATCH]', error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const user = await currentUser();

        if (!user?.id) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.categoryId) {
            return new NextResponse("categoryId is required", { status: 400 });
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

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORIES_DELETE]', error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}