"use client"

import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {SizeColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/colomns";
import {DataTable} from "@/components/ui/data-table";

interface SizeClientProps {
    data: SizeColumn[]
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Ukuran (${data.length})`}
                    description="Kelola ukuran untuk toko Anda"
                />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Ukuran
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columns} data={data} searchKey="name" searchLabel="Ukuran" />
        </>
    )
}