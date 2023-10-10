// "ListeDetaljer" -> The site that shows details about the shoppinglist with the specific title you choose

import React from 'react'
import ItemList from './ItemList'
import { Link } from 'react-router-dom'

// mock data just for visualizing the list
const mockiItems = [
    { itemName: 'Item 1', increment: true, decrement: true, quantity: true },
    { itemName: 'Item 2', increment: true, decrement: true, quantity: true },
    { itemName: 'Item 3', increment: true, decrement: true, quantity: true },
    { itemName: 'Item 4', increment: true, decrement: true, quantity: true },
    { itemName: 'Item 5', increment: true, decrement: true, quantity: true },
    { itemName: 'Item 6', increment: true, decrement: true, quantity: true },
    { itemName: 'Item 7', increment: true, decrement: true, quantity: true }
    // Add more items as needed
  ];

interface ShoppingList {
    title: string;
    items: string[];
    id: string;
  }

interface ShoppingListProps {
    title: string;
    items: string[];
    id: string;
}

function ShoppingList( {title, id, items}: ShoppingListProps ) {

    return (
        <div className='px-4 py-10'>
            <h1 className='mb-2 text-2xl font-light text-center'>{title}</h1>
            <ItemList items={mockiItems}/>
            <div className=' flex justify-center py-8'>
                <Link to={'/AddItem'}>
                    <button className='bg-white py-2 px-8 text-lg rounded-3xl border-green-700 border-2 hover:bg-green-700 hover:text-white'>Add item</button>
                </Link>
            </div>
        </div>
    )
}

export default ShoppingList