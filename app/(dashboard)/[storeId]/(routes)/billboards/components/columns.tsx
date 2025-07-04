"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellActions} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
    id: string
    label: string
    createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "label",
        header: "Papan Iklan",
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