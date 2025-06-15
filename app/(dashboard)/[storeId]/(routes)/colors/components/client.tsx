"use client"

import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {ColorColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/colors/components/colomns";
import {DataTable} from "@/components/ui/data-table";

interface ColorClientProps {
    data: ColorColumn[]
}

export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Warna (${data.length})`}
                    description="Kelola Warna untuk toko Anda"
                />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Warna
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columns} data={data} searchKey="name" searchLabel="Warna" />
        </>
    )
}