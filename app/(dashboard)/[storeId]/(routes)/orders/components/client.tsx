"use client"

import {Heading} from "@/components/ui/heading";
import {Separator} from "@/components/ui/separator";
import {OrderColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/orders/components/columns";
import {DataTable} from "@/components/ui/data-table";

interface OrderClientProps {
    data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
    return(
        <>
            <Heading
                title={`Pesanan (${data.length})`}
                description="Kelola Pesanan untuk toko Anda"
            />
            <Separator/>
            <DataTable columns={columns} data={data} searchKey="products" searchLabel="Pesanan" />
        </>
    )
}