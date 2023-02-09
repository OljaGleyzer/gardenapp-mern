import "./App.css";
import Home from "./views/Home";
import { PlantsContextProvider } from "./store/PlantsContext";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div>
      <NavigationBar />
      <PlantsContextProvider>
        <Home />
      </PlantsContextProvider>
    </div>
  );
}

export default App;
