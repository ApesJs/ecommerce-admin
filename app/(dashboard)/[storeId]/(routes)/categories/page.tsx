import {CategoryClient} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/client";
import prismadb from "@/lib/prismadb";
import {CategoryColumn} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/columns";
import {format} from "date-fns";
import {id} from "date-fns/locale";

const CategoriesPage = async ({ params }: { params: {storeId: string} }) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, 'dd MMMM yyyy', { locale: id })
    }))

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    )
}

export default CategoriesPage