import {useState} from 'react';

export default function Form({onAddItems}) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    // 1. Prevent refresh
    e.preventDefault();
    // 2. Prevent empty description item to be submitted into new object
    if (!description) return;
    // 3. Get data out of the form, put it in newItem object, and push newItem object in items state array
    const newItem = {description, quantity, packed: false, id: Date.now()};
    onAddItems(newItem);
    // 4. Set back useState object to default state
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      {/* 1. Add quantity of item */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* 2. Method to create array from 1-20 and iterate over it for options 1-20 */}
        {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* 3. Add name of item */}
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
