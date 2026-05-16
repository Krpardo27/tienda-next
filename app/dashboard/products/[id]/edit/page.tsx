import EditProductForm from "@/src/shared/components/forms/EditProductForm"
import ProductForm from "@/src/shared/components/forms/ProductForm"
import GoBackButton from "@/src/shared/ui/GoBackButton"
import Heading from "@/src/shared/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
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

  const product = await getProductById(id)

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