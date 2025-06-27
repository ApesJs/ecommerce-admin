import {ColorClient} from "@/app/(dashboard)/[storeId]/(routes)/colors/components/client";
import prismadb from "@/lib/prismadb";
import {ColorColumn} from "@/app/(dashboard)/[storeId]/(routes)/colors/components/columns";
import {format} from "date-fns";
import {id} from "date-fns/locale";

const ColorsPage = async ({ params }: { params: {storeId: string} }) => {
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, 'dd MMMM yyyy', { locale: id })
    }))

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient data={formattedColors} />
            </div>
        </div>
    )
}

export default ColorsPage