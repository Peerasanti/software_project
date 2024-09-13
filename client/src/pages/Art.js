import React from 'react'
import { useParams } from 'react-router-dom'

function Art() {
    let {id} = useParams();
  return (
    <div>
      {id}
    </div>
  )
}

export default Art
