import CommodityPriceChart from '@/components/CommodityPriceChart'
import React from 'react'

const Corn = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-16">
        <CommodityPriceChart resource="corn" resourceName="Corn" />
      </div>
  )
}

export default Corn
