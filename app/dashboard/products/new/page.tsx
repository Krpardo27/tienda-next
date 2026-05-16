
import AddProductForm from '@/src/shared/components/forms/AddProductForm'
import ProductForm from '@/src/shared/components/forms/ProductForm'
import GoBackButton from '@/src/shared/ui/GoBackButton'
import Heading from '@/src/shared/ui/Heading'
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
