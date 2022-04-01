import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from "react-redux";
import EventList from "./pages/eventList/EventList";
import Table from "./components/table/Table";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={user ? <Navigate to='/' /> : <Login />} />
            <Route path="users">
              <Route index element={<List />} />//userlist
              <Route path=":userId" element={<Single />} />
              {/* <Route 
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              /> */}
            </Route>
            <Route path="events">
              <Route index element={<EventList />} />
              <Route path=":eventId/users" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    // <Table/>
  );
}

export default App;
