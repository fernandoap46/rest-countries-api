import "./MenuBar.css";
import ToggleButton from "./ToggleButton";

function MenuBar() {
  return (
    <div className="menu-bar">
      <div className="menu-item">Where in the world?</div>
      <ToggleButton />
    </div>
  );
}

export default MenuBar;
