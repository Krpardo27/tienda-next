import AddProductForm from '@/components/products/AddProductForm'
import ProductForm from '@/components/products/ProductForm'
import GoBackButton from '@/components/ui/GoBackButton'
import Heading from '@/components/ui/Heading'
import React from 'react'

export default function CreateProductPage() {
  return (
    <>
      <Heading>Crear nuevo producto</Heading>

       <GoBackButton />

      <AddProductForm>
        <ProductForm />
      </AddProductForm>

    </>
  )
}
