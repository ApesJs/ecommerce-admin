import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser()

    if (!user?.id) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where:{
            userId: user.id
        }
    })

    if (store) {
        redirect(`/${store.id}`)
    }

    return(
        <>
            {children}
        </>
    )
}