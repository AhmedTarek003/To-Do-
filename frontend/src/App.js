import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Task from "./pages/Task/Task";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import ForgetPassword from "./pages/ResetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center" autoClose={1300} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/task/:id"
            element={
              user ? (
                <>
                  <Home />
                  <Task />
                </>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to={"/"} />}
          />
          <Route
            path="/forget-password"
            element={!user ? <ForgetPassword /> : <Navigate to={"/"} />}
          />
          <Route
            path="/reset-password/:userId/:tokenId"
            element={!user ? <ResetPassword /> : <Navigate to={"/"} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
