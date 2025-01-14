import * as React from "react"
import { useEffect, useState } from "react"

interface Asset extends Object {
  symbol: string
  price: number
  name: string
  last_price: number
}

const PriceWidget: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [iconCache, setIconCache] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.energiswap.exchange/v1/assets')
        const data = await response.json()

        setAssets(Object.values(data) as Asset[])

        // Check icons for all assets
        for (const asset of Object.values(data) as Asset[]) {
          await checkImageExists(asset.symbol)
        }
        
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch price data')
        setLoading(false)
      }
    }

    fetchPrices()
    // Refresh every 30 seconds
    const interval = setInterval(fetchPrices, 30000)
    return () => clearInterval(interval)
  }, [])

  const checkImageExists = async (symbol: string) => {
    if (iconCache[symbol] !== undefined) return iconCache[symbol]
    
    try {
      const response = await fetch(`/assets/icons/${symbol}.svg`)
      const exists = response.ok
      setIconCache(prev => ({ ...prev, [symbol]: exists }))
      return exists
    } catch {
      setIconCache(prev => ({ ...prev, [symbol]: false }))
      return false
    }
  }

  if (loading) {
    return <div className="flex justify-center p-4">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Object.keys(assets).map((asset:any, i) => (
            <tr key={assets[asset].symbol} className="hover:bg-gray-50">
              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                {i + 1}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 flex items-center">
                {iconCache[assets[asset].symbol] && (
                  <img src={`/assets/icons/${assets[asset].symbol}.svg`} className="max-w-[2rem]" />
                )}&nbsp;
                {assets[asset].name}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                {assets[asset].symbol}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                ${assets[asset].last_price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PriceWidget
