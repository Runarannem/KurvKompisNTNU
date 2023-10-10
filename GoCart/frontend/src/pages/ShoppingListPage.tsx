// this page is for mobile view only
// the shoppinglist will be displayed in the home page in desktop view

import ShoppingList from '../components/ShoppingList'
import { useParams } from 'react-router-dom';


interface ShoppingListProps {
  title: string;
  items: string[];
}


function ShoppingListPage( {title, items}: ShoppingListProps) {

  const { id: paramId } = useParams();
  const id = paramId as string;


  return (
    <div className='sm:hidden'>
        <ShoppingList title={title} id={id} items={items}/>
    </div>
  )
}

export default ShoppingListPage

