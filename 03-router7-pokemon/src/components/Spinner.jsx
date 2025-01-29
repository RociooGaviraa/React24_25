import React from 'react'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center'>
        <div className='relative'>
            <div className='w-14 h-14 rounded-full absolute border-4 border-gray-200'></div>
            <div className='w-14 h-14 rounded-full animate-spin absolute border-4 border-rose-600 border-t-transparent'></div>
        </div>
    </div>
  )
}

export default Spinner