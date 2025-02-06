export default function Stats({items}) {
  // 1. Conditional rendering by 'early return' - skips all calculations below if array is empty.
  if (!items.length)
    return (
      <footer className='stats'>
        <em>Add an item to pack! 🎉</em>
      </footer>
    );

  // 2. If array is not empty, we continue to the stats and render those.
  const numberOfItems = items.length;
  const numberOfPacked = items.filter((item) => item.packed).length;
  const percentagePacked = Math.round((numberOfPacked / numberOfItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percentagePacked === 100
          ? 'You got everything packed! Ready to go ✈'
          : `🧳 You have ${numberOfItems} items on your list and you already packed ${numberOfPacked} (${percentagePacked}%)!`}
      </em>
    </footer>
  );
}
