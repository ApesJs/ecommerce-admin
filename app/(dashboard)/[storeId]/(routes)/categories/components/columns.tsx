"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellActions} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
    id: string
    name: string
    billboardLabel: string
    createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Kategori",
    },
    {
        accessorKey: "billboardLabel",
        header: "Papan Iklan",
        cell: ({ row }) => row.original.billboardLabel,
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