import {OrderClient} from "@/app/(dashboard)/[storeId]/(routes)/orders/components/client";
import prismadb from "@/lib/prismadb";
import {OrderColumn} from "@/app/(dashboard)/[storeId]/(routes)/orders/components/columns";
import {format} from "date-fns";
import {id} from "date-fns/locale";
import {formatter} from "@/lib/utils";

const OrdersPage = async ({ params }: { params: {storeId: string} }) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid ? 'Lunas' : 'Menunggu Pembayaran',
        createdAt: format(item.createdAt, 'dd MMMM yyyy', { locale: id })
    }))

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    )
}

export default OrdersPage