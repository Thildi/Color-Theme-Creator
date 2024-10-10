import { initialThemes } from "./lib/themes";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });

  const [currentThemeId, setCurrentThemeId] = useLocalStorageState(
    "currentTheme",
    {
      defaultValue: initialThemes[0].id,
    }
  );

  const currentTheme = themes.find((theme) => theme.id === currentThemeId);

  function handleAddColor(newColor) {
    const colorWithId = { ...newColor, id: uid() };
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === currentThemeId
          ? { ...theme, colors: [colorWithId, ...theme.colors] }
          : theme
      )
    );
  }

  function handleDeleteColor(colorId) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === currentThemeId
          ? {
              ...theme,
              colors: theme.colors.filter((color) => color.id !== colorId),
            }
          : theme
      )
    );
  }

  function handleEditColor(colorId, updatedColors) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === currentThemeId
          ? {
              ...theme,
              colors: theme.colors.map((color) =>
                color.id === colorId ? { ...color, ...updatedColors } : color
              ),
            }
          : theme
      )
    );
  }

  function handleAddTheme() {
    const newTheme = {
      id: uid(),
      name: `Theme ${themes.length + 1}`,
      colors: [],
      isDefault: false,
    };
    setThemes((prevThemes) => [...prevThemes, newTheme]);
    setCurrentThemeId(newTheme.id);
  }

  function handleDeleteTheme(themeId) {
    if (themes.find((theme) => theme.id === themeId).isDefault) {
      return;
    }
    setThemes((prevThemes) =>
      prevThemes.filter((theme) => theme.id !== themeId)
    );
    setCurrentThemeId(themes[0].id);
  }

  function handleEditThemeName(themeId, newName) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === themeId ? { ...theme, name: newName } : theme
      )
    );
  }

  return (
    <div className="app-container">
      <h1>Theme Creator</h1>

      <ThemeSelector
        themes={themes}
        currentThemeId={currentThemeId}
        onThemeChange={setCurrentThemeId}
        onAddTheme={handleAddTheme}
        onDeleteTheme={handleDeleteTheme}
        onEditThemeName={handleEditThemeName}
      />

      <div className="content-container">
        <ColorForm onSubmitColor={handleAddColor} />

        {currentTheme.colors.length === 0 ? (
          <p className="empty-state">
            No colors in this theme... start by adding one!
          </p>
        ) : (
          <div className="colors-grid">
            {currentTheme.colors.map((color) => (
              <Color
                key={color.id}
                color={color}
                onDeleteColor={handleDeleteColor}
                onUpdateColor={handleEditColor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
