import { Routes, Route } from "react-router-dom";
import Home from './main-pages/Home'
import About from './main-pages/About'
import Map from './main-pages/Map'
import Contact from './main-pages/Contact'
import PageNotFound from './main-pages/PageNotFound'
import LogIn from './main-pages/LogIn'

function Main() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/map" element={<Map />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
    );
}

export default Main;
