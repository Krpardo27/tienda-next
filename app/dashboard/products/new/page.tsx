
import AddProductForm from '@/src/components/products/AddProductForm'
import ProductForm from '@/src/components/products/ProductForm'
import GoBackButton from '@/src/components/ui/GoBackButton'
import Heading from '@/src/components/ui/Heading'
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
