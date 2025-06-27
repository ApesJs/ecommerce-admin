"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellActions} from "@/app/(dashboard)/[storeId]/(routes)/products/components/cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
    id: string
    name: string
    price: string
    size: string
    category: string
    color: string
    isFeatured: boolean
    isArchived: boolean
    createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Nama Produk",
    },
    {
        accessorKey: "isArchived",
        header: "Diarsipkan",
    },
    {
        accessorKey: "isFeatured",
        header: "Unggulan",
    },
    {
        accessorKey: "price",
        header: "Harga",
    },
    {
        accessorKey: "category",
        header: "Kategori",
    },
    {
        accessorKey: "size",
        header: "Ukuran",
    },
    {
        accessorKey: "color",
        header: "Warna",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.color}
                <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color }} />
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Dibuat Pada",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellActions data={row.original} />,
    },
]