import React, { useState } from "react";
import Country from "./components/Country";
import { useCountry, useField } from "./hooks";

function App() {
  const { reset: resetName, ...nameInput } = useField("text", "name");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <h1>Country Hook</h1>
      <form onSubmit={fetch}>
        <div>
          find countries <input {...nameInput} />
          <button type="submit">find</button>
        </div>
      </form>

      <Country country={country} />
    </div>
  );
}

export default App;
