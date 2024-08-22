import {useState} from 'react';

const initialItems = [
  {id: 1, description: 'Passports', quantity: 2, packed: true},
  {id: 2, description: 'Socks', quantity: 12, packed: false},
  {id: 3, description: 'Charger', quantity: 1, packed: false},
  {id: 4, description: 'Book', quantity: 1, packed: true},
];

export default function App() {
  return (
    <div className='app'>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌺 Far Away 🏝️</h1>;
}

function Form() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    // Prevent refresh
    e.preventDefault();

    // Prevent empty description item to be submitted into new object
    if (!description) return;

    // Get data out of the form and put it in new object
    const newItem = {description, quantity, packed: false, id: Date.now()};
    console.log(newItem);

    // Set back useState object to default state
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
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

function PackingList() {
  return (
    <div className='list'>
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({item}) {
  return (
    <li>
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
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
