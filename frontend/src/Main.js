import { Routes, Route } from "react-router-dom";
import Home from './main-pages/Home'
import About from './main-pages/About'
import Map from './main-pages/Map'
import Contact from './main-pages/Contact'
import PageNotFound from './main-pages/PageNotFound'
import LogIn from './main-pages/LogIn'
import SignUp from './main-pages/SignUp'
import UserProfile from "./main-pages/UserProfile";

function Main() {
    return (
        // <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/map" element={<Map />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/login" element={<LogIn />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/user-profile" element={<UserProfile />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
        // </BrowserRouter>
    );
}

export default Main;
