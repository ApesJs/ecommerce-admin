import {UserButton} from "@clerk/nextjs";
import {MainNav} from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";
import {currentUser} from "@clerk/nextjs/server";
import {ThemeToggle} from "@/components/theme-toggle";

const Navbar = async () => {
    const user = await currentUser();

    if (!user?.id) {
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId: user.id
        }
    })

    return(
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}

export default Navbar