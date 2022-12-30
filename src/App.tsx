import React, {useEffect, useState} from 'react';
import './App.css';
import {auth} from "./config/firebase";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Register from "./components/Register";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {onAuthStateChanged} from "@firebase/auth";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, value => {
            setLoggedIn(value != null);
        })
    });

    return (
    <BrowserRouter>
        <div className="App">
            <Header loggedIn={loggedIn}/>

            <div className={"mainContent"}>
                <Routes>
                    <Route index element={<Home />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            </div>

            <Footer />
        </div>
    </BrowserRouter>);
}

export default App;
