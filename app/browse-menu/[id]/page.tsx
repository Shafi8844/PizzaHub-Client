import React from 'react'

const itemsDetailsPage = ({params}: {params: {id: string}}) => {
    const {id} = params;
    console.log("item id:", id);
  return (
    <div>itemsDetailsPage</div>
  )
}

export default itemsDetailsPage