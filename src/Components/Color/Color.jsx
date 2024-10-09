import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm"; // Importiere ColorForm für die Bearbeitung

export default function Color({ color, deleteColor, onUpdateColor }) {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [edit, setEdit] = useState(false);

  // Funktion zum Löschen der Farbe
  function handleDelete(id) {
    if (!toggleDelete) {
      setToggleDelete(true);
      setEdit(false); // Setze den Editiermodus zurück, wenn wir den Löschmodus aktivieren
    } else {
      deleteColor(id);
    }
  }

  // Funktion zum Aktualisieren der Farbe
  function handleUpdateColor(updatedColor) {
    onUpdateColor(color.id, updatedColor);
    setEdit(false); // Setze den Editiermodus zurück
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {edit ? (
        <>
          <ColorForm
            initialData={color} // Übergebe die aktuellen Farbdaten als Initialwerte
            onSubmitColor={handleUpdateColor} // Funktion zum Aktualisieren der Farbe
          />
          {/* Cancel-Button zum Beenden des Editiermodus */}
          <button type="button" onClick={() => setEdit(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3 className="color-card-headline">{color.hex}</h3>
          <h4>{color.role}</h4>
          <p>Contrast: {color.contrastText}</p>
          <section className="color-delete-section">
            {toggleDelete && (
              <>
                <span className="color-card-hightlight">Really delete?</span>{" "}
                <br />
                <button type="button" onClick={() => setToggleDelete(false)}>
                  Cancel
                </button>
              </>
            )}

            <button type="button" onClick={() => handleDelete(color.id)}>
              Delete color
            </button>
            {/* Button zum Aktivieren des Editiermodus, nur sichtbar wenn nicht im Löschmodus */}
            {!toggleDelete && (
              <button type="button" onClick={() => setEdit(true)}>
                Edit
              </button>
            )}
          </section>
        </>
      )}
    </div>
  );
}
