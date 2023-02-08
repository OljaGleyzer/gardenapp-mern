import "./App.css";
import Home from "./views/Home";
import { PlantsContextProvider } from "./store/PlantsContext";

function App() {
  return (
    <div>
      <PlantsContextProvider>
        <Home />
      </PlantsContextProvider>
    </div>
  );
}

export default App;
