"use client"

import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {BillboardColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns";
import {DataTable} from "@/components/ui/data-table";

interface BillboardClientProps {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Papan Iklan (${data.length})`}
                    description="Kelola papan iklan untuk toko Anda"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Papan Iklan
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columns} data={data} searchKey="label" searchLabel="Papan Iklan" />
        </>
    )
}