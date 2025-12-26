import { useState } from "react";

export default function Togglable({ children, buttonLabel }) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  function handleToggleVisibility() {
    setVisible(prevVisibleStatus => !prevVisibleStatus);
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={handleToggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={handleToggleVisibility} className="cancel-btn">cancel</button>
      </div>
    </div>
  );
}