import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);

  const handleAddColor = (newColor) => {
    const colorWithId = { ...newColor, id: uid() };
    setColors([colorWithId, ...colors]);
  };

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onSubmitColor={handleAddColor} />

      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
