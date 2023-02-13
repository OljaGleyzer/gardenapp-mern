import "./App.css";
import Home from "./views/Home";
import { PlantsContextProvider } from "./store/PlantsContext";
import NavigationBar from "./components/NavigationBar";
import { Route, Routes } from "react-router-dom";
import Pdp from "./views/Pdp";

function App() {
  return (
    <div>
      <NavigationBar />
      <PlantsContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants/:_id" element={<Pdp />} />
        </Routes>
      </PlantsContextProvider>
    </div>
  );
}

export default App;
