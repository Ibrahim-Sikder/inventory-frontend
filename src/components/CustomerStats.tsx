interface CustomerStatsProps {
    totalCustomers: number;
    totalTransactions: number;
    totalLifetimeValue: number;
}

export function CustomerStats({
    totalCustomers,
    totalTransactions,
    totalLifetimeValue
}: CustomerStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted text-sm font-medium">Total Customers</p>
                <p className="text-3xl font-bold text-foreground mt-2">{totalCustomers}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted text-sm font-medium">Total Transactions</p>
                <p className="text-3xl font-bold text-foreground mt-2">{totalTransactions}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted text-sm font-medium">Customer Lifetime Value</p>
                <p className="text-3xl font-bold text-primary mt-2">
                    ৳{(totalLifetimeValue / 1000).toFixed(1)}K
                </p>
            </div>
        </div>
    )
}