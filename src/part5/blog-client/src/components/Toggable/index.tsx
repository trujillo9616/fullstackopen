import { useState, forwardRef, useImperativeHandle } from "react";

interface ToggableProps {
  buttonLabel: string;
  children: React.ReactNode;
  ref?: React.Ref<any>;
}

const Toggable: React.FC<ToggableProps> = forwardRef(
  ({ buttonLabel, children }, refs) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible} className="toggableContent">
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    );
  }
);

export default Toggable;
