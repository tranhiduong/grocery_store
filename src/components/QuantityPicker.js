import React from 'react';

const QuantityPicker = ({ value, onChange }) => {
  const increment = () => onChange(value + 1);
  const decrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center border rounded-md">
      <button
        className="w-10 h-10 flex items-center justify-center border-r"
        onClick={decrement}
      >
        -
      </button>
      <span className="mx-4 text-xl">{value}</span>
      <button
        className="w-10 h-10 flex items-center justify-center border-l"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default QuantityPicker;
