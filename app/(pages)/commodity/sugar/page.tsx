import CommodityPriceChart from '@/components/CommodityPriceChart'
import React from 'react'

const Sugar = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-16">
        <CommodityPriceChart resource="sugar" resourceName="Sugar" />
      </div>
  )
}

export default Sugar
