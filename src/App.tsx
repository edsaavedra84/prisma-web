import React, {useEffect, useState} from 'react';
import './App.css';
import {auth} from "./config/firebase";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Register from "./components/Register";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {onAuthStateChanged} from "@firebase/auth";
import Profile from "./components/Profile";
import Services from "./components/Services";
import Team from "./components/Team";
import Contact from "./components/Contact";
import UserService from "./services/UserService";
import IUserData from "./models/user.type";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, value => {
            console.log("on auth change:");
            console.log(value);

            // is already logged in?
            if (auth?.currentUser && auth.currentUser?.uid) {

                UserService.getById(auth.currentUser?.uid).then((existing: any) => {
                    //if it's logged in, does exists in our database?
                    if(!existing) {
                        // if doesn't exists we have to create it in our DB
                        const u : IUserData  = {
                            name: (value?.displayName) ? value.displayName : "",
                            email: (value?.email) ? value?.email : "",
                            key: value?.uid,
                            isInternalUser: false
                        }

                        if (value?.uid) {
                            UserService.createFromExternalChannel(u, value?.uid).then(() => {
                                sessionStorage.setItem("user", JSON.stringify(u));
                                setLoggedIn(value != null);
                            });
                        }
                    } else {
                        // if already created, then just use the retrieved information to set the session
                        sessionStorage.setItem("user", JSON.stringify(existing));
                        setLoggedIn(value != null);
                    }
                })
            } else {
                // logout!
                sessionStorage.removeItem("user");
                setLoggedIn(value != null);
            }
        })
    }, []);

    return (
    <BrowserRouter>
        <div className="App">
            <Header loggedIn={loggedIn}/>

            <div className={"mainContent"}>
                <Routes>
                    <Route index element={<Home />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/team" element={<Team />}></Route>
                    <Route path="/services" element={<Services />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                </Routes>
            </div>

            <Footer />
        </div>
    </BrowserRouter>);
}

export default App;
