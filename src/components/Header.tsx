import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Header.css';
import {FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from "@firebase/auth";
import {auth} from "../config/firebase";
import * as Icon from 'react-bootstrap-icons';
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import IUserData from "../models/user.type";

function Header(props: any) {
    const navigate = useNavigate();

    const [scroll, setScroll] = useState(false);

    const [openMobile, setOpenMobile] = useState(false);
    const [logged, setLogged] = useState(false);
    const [userInfo, setUserInfo] = useState<IUserData | null>(null);

    const [show, setShow] = useState(false);
    const handleClose = () => {
        if(show){
            setShow(false);
            navigate("/");
        }
    }
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
            // setLogged(true);

            if (auth?.currentUser && auth.currentUser?.uid) {
                UserService.getById(auth.currentUser?.uid).then((existing: any) => {
                    if(!existing) {
                        const u : IUserData  = {
                            name: (data.user.displayName) ? data.user.displayName : "",
                            email: (data.user.email) ? data.user.email : "",
                            key: data.user.uid,
                            isInternalUser: false
                        }

                        UserService.createFromExternalChannel(u, data.user.uid).then(() => {
                            console.log("wea");
                        });
                    }
                })
            }

            handleClose();
        }).catch((err) => {
            console.log("error while logging");

            if(err.code === 'auth/popup-closed-by-user') {
                console.log("Pop up closed by user");
            }
        })
    }

    const handleSubmit = (e: any) => {
        e.target.disabled = true;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("wiii");
            }).catch(() => {
                console.log("oh no");
        }). finally(() => {
            e.target.disabled = false;
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
            // setLogged(false);
            navigate("/");
        }).catch((err) => {
            console.log("err: " + err.message)
        });
    }

    const scrollTop = () => {
        window.scrollTo(0, 0);
    }

    const navigateTo = (button: any) => {
        console.log(button);
        handleClose();

        if (button.target.dataset && button.target.dataset.meta) {
            navigate(button.target.dataset.meta);
        } else {
            navigate("/");
        }
    }

    useEffect(() => {
        if(props.loggedIn !== logged) {
            setLogged(props.loggedIn);

            if (props.loggedIn === true) {
                if (auth?.currentUser && auth.currentUser?.uid) {
                    UserService.getById(auth.currentUser?.uid).then((data: any) => {
                        const da: IUserData = {
                            name: data.name,
                            email: data.email,
                            isInternalUser: true
                        }

                        setUserInfo(da);
                        handleClose();
                    })
                }
            } else {
                setUserInfo(null);
            }
        }

        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, [props.loggedIn, logged]);

    return (
        <header id="header" className={scroll ? "fixed-top d-flex align-items-center header-transparent header-scrolled" : "fixed-top d-flex align-items-center header-transparent"}>
            <div className="container d-flex justify-content-between align-items-center">
                <div className={scroll ? "logo-scrolled" : "logo"}>
                    <div id={"logo"} className={scroll ? "logo-scrolled" : ""}></div>
                </div>

                <nav id="navbar" className={openMobile ? "navbar navbar-mobile" : "navbar"}>
                    <ul>
                        <li><Link className="dropdown-item" to="/">Inicio</Link></li>
                        <li><a href="services.html">Servicios</a></li>
                        <li><a href="portfolio.html">Casos</a></li>
                        <li><a href="team.html">Equipo</a></li>
                        <li><a href="contact.html">Contacto</a></li>

                        {(!logged) ?
                            <li>
                                <Button variant="primary" className={"access-button"} onClick={handleShow}>Acceso pacientes</Button>
                                <Button variant="warning" className={"m-4"} data-meta="/register" onClick={navigateTo}>Regístrese</Button>
                            </li>:
                            <li>
                                <div className={"row"}>
                                    <div className={"col"}>
                                        <span className={"loggedIn"}>Bienvenido {userInfo?.name}</span>
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
                            <p>Aun no es paciente?</p>
                            <Button variant={"success"} data-meta="/register" onClick={navigateTo}>Regístrese</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <a href="#" className={scroll ? "back-to-top d-flex align-items-center justify-content-center active": "back-to-top d-flex align-items-center justify-content-center"} onClick={scrollTop}>
                <Icon.ArrowBarUp size={30}></Icon.ArrowBarUp>
            </a>
        </header>);
}

export default Header;