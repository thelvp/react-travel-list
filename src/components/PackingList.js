import {useState} from 'react';
import Item from './Item';

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onDeleteItems,
}) {
  const [sortBy, setSortBy] = useState('input');

  // 1. Sorting method
  let sortedItems;
  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'name')
    sortedItems = items
      .slice() // makes a copy of the original array
      .sort((a, b) => a.description.localeCompare(b.description)); // sorts array by comparing and alphabetizing
  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='name'>Sort by name</option>
          <option value='packed'>Sort by packed state</option>
        </select>
        <button onClick={onDeleteItems}>Clear list</button>
      </div>
    </div>
  );
}
