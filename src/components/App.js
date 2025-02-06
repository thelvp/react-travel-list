import {useState} from 'react';
import Logo from './Logo';
import PackingList from './PackingList';
import Stats from './Stats';
import Form from './Form';

export default function App() {
  const [items, setItems] = useState([]);

  // 1. Add item, function is passed on as prop to Form
  // Add item to items array
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // 2. Delete item, function is passed on as prop to PackingList -> Item
  // Filter in items array, if id does not match, keep it, otherwise, remove (filter) from array
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // 3. Update packed state of item
  // Iterate over the items array, and if the id matches, then update that specific item object
  // Update specific item object with {... item (keep this), key: newValue }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? {...item, packed: !item.packed} : item
      )
    );
  }

  // 4. Delete all items (clear list) after doublechecking with set function to get a confirmation
  function handleDeleteItems() {
    const confirmed = window.confirm(
      'Are you sure you want to delete the entire list?'
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onDeleteItems={handleDeleteItems}
      />
      <Stats items={items} />
    </div>
  );
}
