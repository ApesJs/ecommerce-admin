"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellActions} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizeColumn = {
    id: string
    name: string
    value: string
    createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: "name",
        header: "Nama Ukuran",
    },
    {
        accessorKey: "value",
        header: "Isi Ukuran",
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