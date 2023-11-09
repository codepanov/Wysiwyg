import "./styles.css";
import WYSIWYG from "./components/Wysiwyg";
import ExportHTML from "./components/ExportHTML";

export default function App() {
  return (
    <div className="App">
      <h1>Hello WYSIWYG editor</h1>
      <h2>Try it now!</h2>
      <h3>No registration, no time limit, but no export</h3>
      <h3>
        Or <button>Register</button> and get 30 min & export
      </h3>
      <h4>Export to HTML or image</h4>
      <p>? Register with mail, or phone ?</p>
      <ul className="ww-notes">
        <li>Slika se pomera po ekranu slobodno (mouse track)</li>
        <li>Zoom</li>
        <li>Crop</li>
        <li>Text preko slike</li>
        <li>Realtime preview HTML export-a</li>
      </ul>
      <WYSIWYG />
      <button onClick={ExportHTML}>Export?</button>
      <p>
        Next steps would be:
        <br />
        1.{" "}
        <span style={{ color: "lightgrey" }}>
          Make the image follow the mouse,
        </span>{" "}
        &#x2713;
        <br />
        2.{" "}
        <span style={{ color: "lightgrey" }}>
          Image will persist it's position,
        </span>{" "}
        &#x2713;
        <br />
        3. <span style={{ color: "red" }}>Make an early HTML export,</span>
        <br />
        4. Make SCALE & CROP,
        <br />
        5. Make preset positioning with CTRL, SHIFT, NUMERIC KEYBOARD
      </p>
    </div>
  );
}
