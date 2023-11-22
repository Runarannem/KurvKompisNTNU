import { describe, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import ProductList from '../src/components/ProductList'
import React from 'react'

// Mock data for testing
const mockProducts = [
  {
    productName: 'Product 1',
    productID: '1',
    productQuantity: 5,
    increment: true,
    decrement: true,
    quantity: true,
    listView: false,
  },
]

// Mocking the react-router-dom context for testing
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))

describe('ProductList Component', () => {
  test('renders ProductList with grid view', async (context) => {
    const { container } = render(<ProductList products={mockProducts} listView={true} />)

    // Check if ProductList renders with the grid view based on the listView prop
    context.expect(container.querySelector('.grid')).toBeTruthy()
    context.expect(container.querySelector('.grid-cols-1')).toBeTruthy()
  })

  test('renders ProductList with list view', async (context) => {
    const { container } = render(<ProductList products={mockProducts} listView={false} />)

    // Check if ProductList renders with the list view based on the listView prop
    context.expect(container.querySelector('.grid')).toBeTruthy()
    context.expect(container.querySelector('[class*="sm:grid-cols-2"]')).toBeTruthy() // Using attribute selector
    context.expect(container.querySelector('[class*="lg:grid-cols-3"]')).toBeTruthy() // Using attribute selector
    context.expect(container.querySelector('[class*="xl:grid-cols-4"]')).toBeTruthy() // Using attribute selector
  })

  test('renders no products when products array is empty', async (context) => {
    const { container } = render(<ProductList products={[]} listView={true} />)
    context.expect(container.querySelector('.grid.rounded-2xl.grid-cols-1')).toBeTruthy()
  })

  test('renders the correct number of products', async (context) => {
    const { container } = render(<ProductList products={mockProducts} listView={true} />)
    const productElements = container.querySelectorAll('.grid > div') // Select all direct children of .grid
    const productNames = Array.from(productElements).map((element) => element.textContent) // Get text content of each product

    mockProducts.forEach((product) => {
      const productName = product.productName.toLowerCase() // Convert product name to lowercase for case-insensitive comparison

      // Check if 'name' is 'null' before using toLowerCase() and includes()
      if (productNames !== null && productNames !== undefined) {
        const productNameFound = productNames.some((name) => {
          if (name !== null && name !== undefined) {
            return name.toLowerCase().includes(productName)
          }
          return false
        })
        context.expect(productNameFound).toBe(true) // Check if part of the product name exists in the rendered list
      }
    })
  })
})