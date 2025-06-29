import prismadb from "@/lib/prismadb";

interface GraphData {
    name: string
    total: number
}

export const getGraphRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            }
        }
    })

    const monthlyRevenue: { [key: number]: number } = {}

    for (const order of paidOrders) {
        const month = order.createdAt.getMonth()
        let revenueForOrder = 0

        for (const item of order.orderItems) {
            revenueForOrder += item.product.price.toNumber()
        }

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder
    }

    const graphData: GraphData[] = [
        { name: "Januari", total: 0 },
        { name: "Februari", total: 0 },
        { name: "Maret", total: 0 },
        { name: "April", total: 0 },
        { name: "Mei", total: 0 },
        { name: "Juni", total: 0 },
        { name: "Juli", total: 0 },
        { name: "Agustus", total: 0 },
        { name: "September", total: 0 },
        { name: "Oktober", total: 0 },
        { name: "November", total: 0 },
        { name: "Desember", total: 0 }
    ]

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
    }

    return graphData
}