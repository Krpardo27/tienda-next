56
import EditProductForm from "@/src/components/products/EditProductForm"
import ProductForm from "@/src/components/products/ProductForm"
import GoBackButton from "@/src/components/ui/GoBackButton"
import Heading from "@/src/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    notFound()
  }

  return product
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = await getProductById(Number(id))

  console.log(product)

  return (
    <>
      <Heading>Editar producto: {product.name}</Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>


    </>
  )
}