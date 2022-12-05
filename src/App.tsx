import { ReactElement } from "react";

import AdsSpendGraph from "./AdsSpendGraph";
import "../src/styles/App.css";

function App(): ReactElement {
  return (
    <div className="App">
      <header className="site-header">
        <h1 className="site-header__heading">Ark Kapital Case</h1>
        <h3 className="site-header__owner">Ellinor Svalberg</h3>
      </header>
      <AdsSpendGraph />
    </div>
  );
}

export default App;
