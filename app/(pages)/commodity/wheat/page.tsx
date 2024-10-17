import CommodityPriceChart from '@/components/CommodityPriceChart'
import React from 'react'

const Wheat = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-16">
        <CommodityPriceChart resource="wheat" resourceName="Wheat" />
      </div>
  )
}

export default Wheat
