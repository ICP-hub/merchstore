import React from 'react'
import placeholderImg from "../../assets/placeholderImg-Small.jpeg"

const TrendingProductCardLoader = ({product}) => {
  return (
        <div className="bg-white/50 backdrop-blur-sm p-2 rounded-2xl overflow-hidden mx-2 border-[1px]">
            <img
              src={placeholderImg}
              alt="..."
              className="w-full object-cover bg-gray-300 rounded-xl mb-2 animate-pulse"
            />
            <div className="flex justify-between items-center px-1 mb-2">
              <h4 className="h-6 w-40 bg-gray-200 rounded-full animate-pulse"></h4>
            </div>
            <div className="flex justify-between items-center px-1">
              <h4 className="h-5 w-20 bg-gray-200 rounded-full animate-pulse">
              </h4>
            </div>
          </div>
    
  )
}

export default TrendingProductCardLoader