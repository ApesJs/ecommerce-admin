"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellActions} from "@/app/(dashboard)/[storeId]/(routes)/colors/components/cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
    id: string
    name: string
    value: string
    createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
    {
        accessorKey: "name",
        header: "Nama Warna",
    },
    {
        accessorKey: "value",
        header: "Isi Warna",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.value}
                <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.value }}/>
            </div>
        ),
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