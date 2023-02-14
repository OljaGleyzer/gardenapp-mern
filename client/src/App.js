import "./App.css";
import Home from "./views/Home";
import { PlantsContextProvider } from "./store/PlantsContext";
import NavigationBar from "./components/NavigationBar";
import { Route, Routes } from "react-router-dom";
import Pdp from "./views/Pdp";
import SignUp from "./views/SignUp.js";
import Login from "./views/Login";

function App() {
  return (
    <div>
      <NavigationBar />
      <PlantsContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants/:_id" element={<Pdp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </PlantsContextProvider>
    </div>
  );
}

export default App;
