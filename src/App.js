import {useState} from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  // Add item, function is passed on as prop to Form
  // State of items array is updated in this parent component with setItems
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // Delete item, function is passed on as prop to PackingList -> Item
  // State of items array is updated in this parent component with setItems
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // Update packed state of item
  // Iterate over the items array, and if the id matches, then update that specific item object
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? {...item, packed: !item.packed} : item
      )
    );
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌺 Far Away 🏝️</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    // Prevent refresh
    e.preventDefault();
    // Prevent empty description item to be submitted into new object
    if (!description) return;
    // Get data out of the form, put it in newItem object, and push newItem object in items state array
    const newItem = {description, quantity, packed: false, id: Date.now()};
    onAddItems(newItem);
    // Set back useState object to default state
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      {/* // Add quantity of item */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* Method to create array from 1-20 and iterate over it for options 1-20 */}
        {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* Add name of item */}
      <input
        type='text'
        placeholder='Item....'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({items, onDeleteItem, onToggleItem}) {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({item, onDeleteItem, onToggleItem}) {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className='stats'>
      <em>🧳 You have X items on your list and you already packed X%!</em>
    </footer>
  );
}

// NOTES
// - Number() function converts number from form inputfield into number
// - Method to create array 1-20 in option of form -> see Form component
// - Always add not only onChange to change state (e.g. setCount), but also value={e.g. count}
// -----
// THINKING IN REACT
// 1. Break UI in components and establish a component tree
// 2. Build a static version in React (without state)
// 3. Think about state:
// -- When to use state
// -- Types of state: local vs global
// -- Where to place each piece of state
// 4. Establish data flow:
// -- One-way data flow
// -- Child to parent communication
// -- Accessing global state
