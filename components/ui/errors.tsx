import React from 'react'

const Errors = ({err}:{err: string}) => {
  return (
    <p className='text-sm text-red-600'>{err}</p>
  )
}

export default Errors