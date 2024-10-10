import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm"; // Importiere ColorForm für die Bearbeitung
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard"; // Importiere CopyToClipboard
import { useEffect } from "react";

// Funktion zur Rückgabe der richtigen Klasse basierend auf dem Kontrastwert
function getContrastClass(contrast) {
  switch (contrast.toLowerCase()) {
    case "yup":
      return "contrast-yup";
    case "kinda":
      return "contrast-kinda";
    case "nope":
      return "contrast-nope";
    default:
      return "";
  }
}

export default function Color({ color, onDeleteColor, onUpdateColor }) {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [contrast, setContrast] = useState("");

  useEffect(() => {
    async function postFetch() {
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            method: "POST",
            body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { overall } = await response.json();
        setContrast(overall);
      } catch (error) {
        console.error("Error fetching contrast score:", error);
        setContrast("Error");
      }
    }

    postFetch();
  }, [color]);

  // Funktion zum Löschen der Farbe
  function handleDelete(id) {
    if (!toggleDelete) {
      setToggleDelete(true);
      setEdit(false); // Setze den Editiermodus zurück, wenn wir den Löschmodus aktivieren
    } else {
      onDeleteColor(id);
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
            isEdit={true} // Setze isEdit auf true für den Bearbeitungsmodus
          />
          {/* Cancel-Button zum Beenden des Editiermodus */}
          <button type="button" onClick={() => setEdit(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3 className="color-card-headline">
            <span className="hex-color">{color.hex}</span>
            <span className="copy-button-wrapper">
              <CopyToClipboard color={color.hex} />
            </span>
          </h3>
          <h4>{color.role}</h4>
          <p>Contrast: {color.contrastText}</p>
          <p className={getContrastClass(contrast)}>
            Overall Contrast Score: {contrast}
          </p>

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
