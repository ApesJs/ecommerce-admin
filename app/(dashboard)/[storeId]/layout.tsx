import { currentUser } from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({ children, params }: {
    children: React.ReactNode,
    params: { storeId: string }
}) {
    const user = await currentUser()

    if (!user?.id) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where : {
            id: params.storeId,
            userId: user.id
        }
    })

    if (!store) {
        redirect("/")
    }

    return (
        <>
            <div>INI AKAN MENJADI NAVBAR</div>
            {children}
        </>
    )
}

