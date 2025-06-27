"use client"

import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {CategoryColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/columns";
import {DataTable} from "@/components/ui/data-table";

interface CategoryClientProps {
    data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Kategori (${data.length})`}
                    description="Kelola Kategori untuk toko Anda"
                />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Kategori
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columns} data={data} searchKey="name" searchLabel="Kategori" />
        </>
    )
}