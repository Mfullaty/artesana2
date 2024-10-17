import CommodityPriceChart from '@/components/CommodityPriceChart'
import React from 'react'

const Coffee = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-16">
        <CommodityPriceChart resource="coffee" resourceName="Coffee" />
      </div>
  )
}

export default Coffee
