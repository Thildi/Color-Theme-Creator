import { useState } from "react";
import "./Color.css";

export default function Color({ color, deleteColor }) {
  const [toggleDelete, setToggleDelete] = useState(false);

  function handleDelete(id) {
    if (!toggleDelete) {
      setToggleDelete(true);
    } else {
      deleteColor(id);
    }
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <section className="color-delete-section">
        {toggleDelete && (
          <>
            <span className="color-card-hightlight">Really delete?</span> <br />
            <button type="button" onClick={() => setToggleDelete(false)}>
              Cancel
            </button>
          </>
        )}

        <button type="button" onClick={() => handleDelete(color.id)}>
          Delete color
        </button>
      </section>
    </div>
  );
}
