import { useState, useMemo } from 'react'
import { Search, Calendar, User, Package } from 'lucide-react'
import { format } from 'date-fns'

interface RecentSalesProps {
    sales: any[]
    totalSales: number
    totalRevenue: number
    averageOrderValue: number
    isLoading?: boolean
}

export function RecentSales({
    sales,
    totalSales,
    totalRevenue,
    averageOrderValue,
    isLoading
}: RecentSalesProps) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredSales = useMemo(() => {
        if (!searchTerm) return sales
        return sales.filter(
            (sale: any) =>
                sale.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale._id.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [sales, searchTerm])

    if (isLoading) {
        return (
            <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">Recent Sales</h2>
                    <div className="h-5 w-16 bg-background animate-pulse rounded"></div>
                </div>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="p-3 bg-background rounded-lg animate-pulse">
                            <div className="flex items-center justify-between">
                                <div className="h-4 w-24 bg-background/50 rounded"></div>
                                <div className="h-3 w-16 bg-background/50 rounded"></div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <div className="h-3 w-20 bg-background/50 rounded"></div>
                                <div className="h-4 w-16 bg-background/50 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Recent Sales</h2>
                <span className="text-xs text-muted">{totalSales} total</span>
            </div>

            {/* Stats Summary */}
            <div className="space-y-2 mb-4 p-3 bg-background rounded-lg">
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Total Revenue</span>
                    <span className="font-bold text-primary">৳{totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Average Order</span>
                    <span className="font-bold text-foreground">৳{averageOrderValue.toLocaleString()}</span>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                    type="text"
                    placeholder="Search sales..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {filteredSales.slice(0, 10).map((sale: any) => (
                    <div
                        key={sale._id}
                        className="p-3 bg-background rounded-lg hover:bg-background/70 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <User className="w-3 h-3 text-muted" />
                                <p className="font-medium text-foreground text-sm">
                                    {sale.customer?.name || 'Unknown Customer'}
                                </p>
                            </div>
                            <span className="text-xs text-muted font-mono">
                                #{sale._id.slice(-6).toUpperCase()}
                            </span>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3 text-muted" />
                                <p className="text-xs text-muted">
                                    {sale.createdAt ? format(new Date(sale.createdAt), 'dd MMM yyyy') : 'N/A'}
                                </p>
                            </div>
                            <p className="text-primary font-bold text-sm">
                                ৳{sale.grandTotal?.toLocaleString() || 0}
                            </p>
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Package className="w-3 h-3 text-muted" />
                                <span className="text-xs text-muted">
                                    {sale.items?.length || 0} items
                                </span>
                            </div>
                            <span className="text-xs text-muted">•</span>
                            <span className="text-xs text-muted">
                                By: {sale.createdBy || 'N/A'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSales.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-muted text-sm">
                        {searchTerm ? 'No sales found matching your search' : 'No sales available'}
                    </p>
                </div>
            )}
        </div>
    )
}