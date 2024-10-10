import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({
  onSubmitColor,
  initialData = { role: "some color", hex: "#123456", contrastText: "#ffffff" },
  isEdit = false,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmitColor(data);
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <div className="color-form-grid">
        <label htmlFor="role">
          Role
          <input
            type="text"
            id="role"
            name="role"
            defaultValue={initialData.role}
          />
        </label>

        <label htmlFor="hex">
          Hex
          <ColorInput id="hex" defaultValue={initialData.hex} />
        </label>

        <label htmlFor="contrastText">
          Contrast Text
          <ColorInput
            id="contrastText"
            defaultValue={initialData.contrastText}
          />
        </label>

        <div className="button-container">
          <button type="submit">{isEdit ? "Edit Color" : "Add Color"}</button>
        </div>
      </div>
    </form>
  );
}
