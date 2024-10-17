import CommodityPriceChart from '@/components/CommodityPriceChart'
import React from 'react'

const Aluminium = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-16">
        <CommodityPriceChart resource="aluminium" resourceName="Aluminium" />
      </div>
  )
}

export default Aluminium
