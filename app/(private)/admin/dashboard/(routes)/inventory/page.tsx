import React from 'react'
import ProductCreateForm from './components/product-create-form'

const InventoryPage = () => {
  return (
    <section>
        <h1 className='text-4xl'>InventoryPage</h1>
        <div>
          <ProductCreateForm />
        </div>
    </section>
  )
}

export default InventoryPage