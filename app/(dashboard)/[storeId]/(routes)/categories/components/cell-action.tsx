"use client"

import {CategoryColumn} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/colomns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Copy, Edit, MoreHorizontal, Trash} from "lucide-react";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import {useState} from "react";
import {AlertModal} from "@/components/modals/alert-modal";

interface CellActionProps {
    data: CategoryColumn
}

export const CellActions: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("ID berhasil disalin ke clipboard.")
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/categories/${data.id}`)
            router.refresh()
            toast.success("Kategori dihapus.")
        } catch (error) {
            toast.error("Gagal menghapus Kategori, pastikan anda menghapus semua kategori produk yang terkait terlebih dahulu.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return(
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Buka Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Aksi
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Salin ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Kategori
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Hapus Kategori
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}