import "./ToggleButton.css";
import { useState } from "react";
import { ToggleButton } from "primereact/togglebutton";
import "primeicons/primeicons.css";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

export default function Toggle() {
  const [checked, setChecked] = useState(false);

  return (
    <div className=" flex justify-content-center">
      <ToggleButton
        onLabel="I confirm"
        offLabel="I reject"
        onIcon="pi pi-moon"
        offIcon="pi pi-sun "
        checked={checked}
        onChange={(e) => setChecked(e.value)}
        className="Toggle w-9rem"
      />
    </div>
  );
}
