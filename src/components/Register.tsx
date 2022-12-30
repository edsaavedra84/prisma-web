import React, {useState} from "react";
import './Home.css';
import * as Icon from 'react-bootstrap-icons';
import UserService from "../services/UserService";
import {auth} from "../config/firebase";
import IUserData from "../models/user.type";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";

function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const iconSize = 30;
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate("/");
            setShow(false);
        });
    }
    const handleShow = () => setShow(true);

    const handleSubmit = (e: any) => {
        e.target.disabled = true

        let data: IUserData = {
            name: name,
            email: email,
            isInternalUser: true
        };

        UserService.create(data, password).then((result) => {
            console.log("creado!");
            handleShow();
        }).catch((err) => {
            console.log(err);
        }).finally( () => {
            e.target.disabled = false;
        });
    }

    return (
        <div>
            <section className="">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black">
                                <div className="card-body">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registro  paciente</p>

                                            <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div><Icon.PersonFill size={iconSize}/></div>
                                                    <div className="form-outline flex-fill  mx-2">
                                                        <input type="text" id="name-form" placeholder="Ingrese su nombre"
                                                               className="form-control" onChange={(e) => setName(e.target.value)}/>

                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <Icon.Mailbox2 size={iconSize}/>
                                                    <div className="form-outline flex-fill  mx-2">
                                                        <input type="email" id="email-form" placeholder="Ingrese su E-Mail"
                                                               className="form-control" onChange={(e) => setEmail(e.target.value)}/>

                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <Icon.LockFill size={iconSize}/>
                                                    <div className="form-outline flex-fill  mx-2">
                                                        <input type="password" id="password-form" placeholder="Ingrese contraseña"
                                                               className="form-control" onChange={(e) => setPassword(e.target.value)}/>

                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <Icon.KeyFill size={iconSize}/>
                                                    <div className="form-outline flex-fill mx-2">
                                                        <input type="password" id="rep-pass-form" placeholder="Repita contraseña"
                                                               className="form-control"/>
                                                    </div>
                                                </div>

                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" value=""
                                                           id="form2Example3c"/>
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        Acepto <a href="#!">términos y condiciones</a>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Registrar
                                                    </button>
                                                </div>

                                            </form>

                                        </div>
                                        <div
                                            className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image"/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Registro exitoso
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bienvenido!

                        Se le ha enviado un correo de confirmación para validar su cuenta, porfavor siga las
                        instrucciones para que su cuenta quede activa.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>);
}

export default Register;