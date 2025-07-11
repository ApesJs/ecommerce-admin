"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
    id: string
    phone: string
    address: string
    isPaid: string
    totalPrice: string
    products: string
    createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Produk",
    },
    {
        accessorKey: "phone",
        header: "No HP",
    },
    {
        accessorKey: "address",
        header: "Alamat",
    },
    {
        accessorKey: "totalPrice",
        header: "Total Harga",
    },
    {
        accessorKey: "isPaid",
        header: "Keterangan",
    },
]