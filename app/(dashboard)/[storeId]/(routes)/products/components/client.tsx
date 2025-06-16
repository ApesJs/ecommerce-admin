"use client"

import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {ProductColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/products/components/colomns";
import {DataTable} from "@/components/ui/data-table";

interface ProductClientProps {
    data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Produk (${data.length})`}
                    description="Kelola Produk untuk toko Anda"
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Produk
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columns} data={data} searchKey="label" searchLabel="Produk" />
        </>
    )
}