import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);

  function addColor(newColor) {
    const colorWithId = { ...newColor, id: uid() };
    setColors((prevColors) => [colorWithId, ...prevColors]);
  }

  function deleteColor(id) {
    setColors(colors.filter((color) => color.id !== id));
  }

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onSubmitColor={addColor} />

      {colors.length === 0 ? (
        <p>No colors... start by adding one!</p>
      ) : (
        colors.map((color) => {
          return (
            <Color key={color.id} color={color} deleteColor={deleteColor} />
          );
        })
      )}
    </>
  );
}
export default App;
