import { useState } from "react";
import "./ThemeSelector.css";

export default function ThemeSelector({
  themes,
  currentThemeId,
  onThemeChange,
  onAddTheme,
  onDeleteTheme,
  onEditThemeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const currentTheme = themes.find((theme) => theme.id === currentThemeId);

  function handleEditName(e) {
    e.preventDefault();
    if (newName.trim()) {
      onEditThemeName(currentThemeId, newName);
      setIsEditing(false);
      setNewName("");
    }
  }

  return (
    <div className="theme-selector">
      <select
        value={currentThemeId}
        onChange={(e) => onThemeChange(e.target.value)}
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>

      <button type="button" onClick={onAddTheme}>
        Add New Theme
      </button>

      {!currentTheme.isDefault && (
        <>
          <button type="button" onClick={() => onDeleteTheme(currentThemeId)}>
            Delete Theme
          </button>
          {!isEditing ? (
            <button type="button" onClick={() => setIsEditing(true)}>
              Rename Theme
            </button>
          ) : (
            <form onSubmit={handleEditName} className="rename-form">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={currentTheme.name}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
