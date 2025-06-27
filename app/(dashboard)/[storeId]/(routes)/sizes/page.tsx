import {SizeClient} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/client";
import prismadb from "@/lib/prismadb";
import {SizeColumn} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/columns";
import {format} from "date-fns";
import {id} from "date-fns/locale";

const SizesPage = async ({ params }: { params: {storeId: string} }) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, 'dd MMMM yyyy', { locale: id })
    }))

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    )
}

export default SizesPage