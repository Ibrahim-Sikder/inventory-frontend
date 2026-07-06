interface SalesStatsProps {
    totalSales: number
    totalRevenue: number
    averageOrderValue: number
}

export function SalesStats({ totalSales, totalRevenue, averageOrderValue }: SalesStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted text-sm font-medium">Total Sales</p>
                <p className="text-3xl font-bold text-foreground mt-2">{totalSales}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-primary mt-2">
                    ৳{totalRevenue.toLocaleString()}
                </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted text-sm font-medium">Average Order Value</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                    ৳{averageOrderValue.toLocaleString()}
                </p>
            </div>
        </div>
    )
}