import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("themeColors", {
    defaultValue: initialColors,
  });

  function addColor(newColor) {
    const colorWithId = { ...newColor, id: uid() };
    setColors((prevColors) => [colorWithId, ...prevColors]);
  }

  function deleteColor(id) {
    setColors(colors.filter((color) => color.id !== id));
  }

  function editColor(colorId, updatedColors) {
    setColors((prev) => {
      const editColor = prev.map((color) =>
        color.id === colorId ? { ...color, ...updatedColors } : color
      );
      return editColor;
    });
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
            <Color
              key={color.id}
              color={color}
              deleteColor={deleteColor}
              onUpdateColor={editColor}
            />
          );
        })
      )}
    </>
  );
}
export default App;
