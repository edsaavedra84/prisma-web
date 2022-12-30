import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Header.css';
import {FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from "@firebase/auth";
import {auth} from "../config/firebase";
import * as Icon from 'react-bootstrap-icons';
import {signInWithEmailAndPassword} from "firebase/auth";

function Header() {
    const [scroll, setScroll] = useState(false);
    const [show, setShow] = useState(false);
    const [openMobile, setOpenMobile] = useState(false);
    const [logged, setLogged] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOpenMobile = () => {
        setOpenMobile(!openMobile);
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const fbprov = new FacebookAuthProvider();
    const gprov = new GoogleAuthProvider();

    const loginWithPopUp = (provider: any) => {
        signInWithPopup(auth, provider).then((data) => {
            console.log("logged =>" + data.user.displayName);
            console.log("logged =>" + data.user.email);
            setLogged(true);
            handleClose();
        }).catch((err) => {
            console.log("error while logging");

            if(err.code === 'auth/popup-closed-by-user') {
                console.log("Pop up closed by user");
            }
        })
    }

    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("wiii");
                setLogged(true);
                handleClose();
            }).catch(() => {
                console.log("oh no");
        });
    }

    const loginFacebook = () => {
        loginWithPopUp(fbprov);
    }

    const loginGoogle = () => {
        loginWithPopUp(gprov);
    }

    const logout = () => {
        signOut(auth).then(() => {
            console.log("logged out");
            setLogged(false);
        }).catch((err) => {
            console.log("err: " + err.message)
        });
    }

    const scrollTop = () => {
        console.log("to top!");
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    });

    return (
        <header id="header" className={scroll ? "fixed-top d-flex align-items-center header-transparent header-scrolled" : "fixed-top d-flex align-items-center header-transparent"}>
            <div className="container d-flex justify-content-between align-items-center">
                <div className={scroll ? "logo-scrolled" : "logo"}>
                    <div id={"logo"} className={scroll ? "logo-scrolled" : ""}></div>
                </div>

                <nav id="navbar" className={openMobile ? "navbar navbar-mobile" : "navbar"}>
                    <ul>
                        <li><a className="dropdown-active " href="index.html">Inicio</a></li>
                        <li><a href="services.html">Servicios</a></li>
                        <li><a href="portfolio.html">Casos</a></li>
                        <li><a href="team.html">Equipo</a></li>
                        <li><a href="contact.html">Contacto</a></li>

                        {(!logged) ?
                            <li>
                                <Button variant="primary" className={"access-button"} onClick={handleShow}>Acceso pacientes</Button>
                            </li>:
                            <li>
                                <div className={"row"}>
                                    <div className={"col"}>
                                        <span className={"loggedIn"}>Bienvenido {auth.currentUser?.displayName}</span>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col"}>
                                        <Button variant="secondary" className={"access-button"} onClick={logout}>Salir</Button>:
                                    </div>
                                </div>
                            </li>
                        }

                    </ul>
                    <i className={openMobile ? "bi mobile-nav-toggle bi-x":"bi bi-list mobile-nav-toggle"} onClick={handleOpenMobile}></i>
                </nav>

            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered>

                <Modal.Header closeButton>
                    <Modal.Title>Ingreso paciente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-outline mb-1">
                            <input type="email" id="form2Example1" onChange={(e) => setEmail(e.target.value)} placeholder={"ejemplo@email.com"} className="form-control"/>
                            <label className="form-label" htmlFor="form2Example1">Email</label>
                        </div>

                        <div className="form-outline mb-1">
                            <input type="password" id="form2Example2" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                            <label className="form-label" htmlFor="form2Example2">Contraseña</label>
                        </div>

                        <div className="row mb-1">
                            <div className="col d-flex justify-content-center">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="form2Example31"
                                           checked/>
                                    <label className="form-check-label" htmlFor="form2Example31"> Recuérdame </label>
                                </div>
                            </div>

                            <div className="col">
                                <a href="#!">Olvidó contraseña?</a>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col d-flex justify-content-center">
                                <button type="button" style={{width: "100%"}} onClick={handleSubmit} className="btn btn-primary btn-block align-content-center">Ingresar</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col d-flex justify-content-center">
                                <button type="button" className="btn btn-link btn-floating" onClick={loginFacebook}>
                                    <Icon.Facebook height="30"></Icon.Facebook>
                                </button>

                                <button type="button" className="btn btn-link btn-floating mx" onClick={loginGoogle}>
                                    <Icon.Google></Icon.Google>
                                </button>
                            </div>
                        </div>

                        <div className="text-center">
                            <p>Aun no es paciente? <a href="#!">Regístrese</a></p>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <a href="#" className={scroll ? "back-to-top d-flex align-items-center justify-content-center active": "back-to-top d-flex align-items-center justify-content-center"} onClick={scrollTop}>
                <Icon.ArrowBarUp width={"30px"}></Icon.ArrowBarUp>
            </a>
        </header>);
}

export default Header;