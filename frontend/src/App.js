import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Home from "./components/Home";
import LoginProtected from "./components/LoginProtected";
import Provider from "./components/Provider";
import Consumer from "./components/Consumer";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/login'
          element={
            <LoginProtected>
              <Login />
            </LoginProtected>
          }
        />
        <Route path='/' element={<Home />} />
        <Route
          path='/provider'
          element={
            <Protected>
              <Provider />
            </Protected>
          }
        />
        <Route
          path='/consumer'
          element={
            <Protected>
              <Consumer />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
