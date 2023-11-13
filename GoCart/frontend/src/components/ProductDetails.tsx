// ProductDetails Component: Displays details of a product (aka Product)

import { GET_PRODUCT_BY_ID } from '../utils/queryFunctions/getProduct'
import { useQuery } from '@apollo/client'

interface ProductDetailsProps {
  productID: string // The name of the food product to display
}

// The expected format of the query response
interface Product {
  name: string
  nutrition: {
    display_name: string
    amount: number
    unit: string
  }[]
  store: {
    name: string
  }
  vendor: string
  weight: number
  weight_unit: string
  category: {
    name: string
  }[]
  allergens: {
    display_name: string
  }[]
  description: string
}

function ProductDetails({ productID }: ProductDetailsProps) {
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { _id: productID },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const product: Product | undefined = data.getProduct || undefined

  if (!product) {
    return <div>product not found.</div>
  }

  return (
    <div>
      <h2 className="text-2xl">{product.name}</h2>
      <div className="mt-4 grid sm:grid-cols-2 gap-2">
        <div className="p-2">
          <ul>
            <p className="text-xl">Nutrition</p>
            {product.nutrition ? (
              <ul>
                {product.nutrition.map((nutritionproduct, index) => (
                  <li key={index}>
                    <strong>{nutritionproduct.display_name}: </strong>
                    {nutritionproduct.amount} {nutritionproduct.unit}
                  </li>
                ))}
              </ul>
            ) : (
              'N/A'
            )}
          </ul>
        </div>

        <div className="p-2">
          <p className="text-xl">Info</p>
          <ul>
            <strong>Store: </strong>
            {product.store ? product.store.name : 'N/A'}
          </ul>
          <ul>
            <strong>Vendor: </strong>
            {product.vendor || 'N/A'}
          </ul>
          <ul>
            <strong>Weight: </strong>
            {product.weight || 'N/A'} {product.weight_unit || ''}
          </ul>

          {/* Categories */}
          <div className="">
            <strong>Categories:</strong>
            <ul>
              {product.category ? (
                <li>
                  {product.category.map((categoryproduct, index) => (
                    <li key={index}>{categoryproduct.name}</li>
                  ))}
                </li>
              ) : (
                'N/A'
              )}
            </ul>
          </div>
          {/* Allergens */}
          <div className="">
            <strong>Allergens:</strong>
            <ul>
              {product.allergens ? (
                <ul>
                  {product.allergens.map((allergenproduct, index) => (
                    <li key={index}>{allergenproduct.display_name}</li>
                  ))}
                </ul>
              ) : (
                'N/A'
              )}
            </ul>
          </div>
          {/* Description */}
        </div>
        <div className="p-2 sm:col-span-2">
          <ul>
            <p className="text-xl">Description</p>
          </ul>
          <p>{product.description || 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails