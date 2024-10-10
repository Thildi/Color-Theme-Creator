import { useState } from "react";

export default function ColorInput({ id, defaultValue }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  function handleInputValue(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className="color-input-container">
      <input
        type="text"
        id={id}
        name={id}
        value={inputValue}
        onChange={handleInputValue}
      />
      <input type="color" value={inputValue} onChange={handleInputValue} />
    </div>
  );
}
