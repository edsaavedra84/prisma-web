import React, {useEffect, useState} from "react";
import './Register.css';
import * as Icon from 'react-bootstrap-icons';
import UserService from "../services/UserService";
import {auth} from "../config/firebase";
import IUserData from "../models/user.type";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import { useForm } from "react-hook-form";

function Register() {
    const iconSize = 30;
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } , trigger} = useForm();

    const password = watch("password");
    const email = watch("email");

    const [show, setShow] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = () => {
        if (!registrationError) {
            signInWithEmailAndPassword(auth, email, password).then(() => {
                navigate("/");
                setShow(false);
            });
        } else {
            setShow(false);
        }
    }
    const handleShow = () => setShow(true);

    const onSubmit  = (dataInput: any) => {
        setSubmitting(true);

        let data: IUserData = {
            name: dataInput.name,
            email: dataInput.email,
            isInternalUser: true
        };

        UserService.create(data, dataInput.password).then((result) => {
            console.log("creado!");
            setRegistrationError(false);
            setErrorMessage("");

            handleShow();
        }).catch((err) => {
            console.log(err);

            if (err.message) {
                if(err.message.includes("auth/email-already-in-use")) {
                    setErrorMessage("E-Mail ya esta siendo utilizado.");
                }
            }

            setRegistrationError(true);
            handleShow();
        }).finally( () => {
            setSubmitting(false);
        });
    }

    useEffect(() => {
        trigger("confirmPassword");
    }, [password, trigger]);

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

                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit(onSubmit)}>

                                                <div className="d-flex flex-column form-container">
                                                    <div className="d-flex flex-row align-items-center form-container">
                                                        <div><Icon.PersonFill size={iconSize}/></div>
                                                        <div className="form-outline flex-fill mx-2">
                                                            <input {...register("name", { required: true })} type="text" id="name-form" placeholder="Ingrese su nombre"
                                                                   className={errors.name ? "form-control error":"form-control"} aria-invalid={errors.name ? "true" : "false"} />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row-reverse err-container">
                                                        <span className={"validationErrors"}>
                                                            {errors.firstName?.type === 'required' && <p role="alert">Campo requerido</p>}
                                                            {errors.name &&  <p role="alert">Campo requerido</p>}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-column form-container">
                                                    <div className="d-flex flex-row align-items-center form-container">
                                                        <div><Icon.PersonFill size={iconSize}/></div>
                                                        <div className="form-outline flex-fill mx-2">
                                                            <input {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/i })} type="email" id="email-form" placeholder="Ingrese su E-Mail"
                                                                   className={errors.email ? "form-control error":"form-control"}/>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row-reverse err-container">
                                                        <span className={"validationErrors"}>
                                                            {errors.email?.type === 'required' && <p role="alert">Campo requerido</p>}
                                                            {errors.email?.type === 'pattern' && <p>Formato de e-mail incorrecto</p>}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-column form-container">
                                                    <div className="d-flex flex-row align-items-center form-container">
                                                        <div><Icon.LockFill size={iconSize}/></div>
                                                        <div className="form-outline flex-fill mx-2">
                                                            <input {...register("password", { required: true, minLength: 6 })} type="password" id="password-form" placeholder="Ingrese contraseña"
                                                                   className={errors.password ? "form-control error":"form-control"}/>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row-reverse err-container">
                                                        <span className={"validationErrors"}>
                                                            {errors.password?.type === 'required' && <p role="alert">Campo requerido</p>}
                                                            {errors.password?.type === 'minLength' && <p role="alert">Minimo de 6 caracteres</p>}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-column form-container">
                                                    <div className="d-flex flex-row align-items-center form-container">
                                                        <div><Icon.KeyFill size={iconSize}/></div>
                                                        <div className="form-outline flex-fill mx-2">
                                                            <input {...register("confirmPassword", {
                                                                validate: (val: string) => {
                                                                    if (val && val !== "" && watch('password') !== val) {
                                                                        return "Your passwords do no match";
                                                                    }
                                                                } })} type="password" id="password-confirm-form" placeholder="Repita contraseña"
                                                                   className={errors.confirmPassword ? "form-control error":"form-control"}/>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row-reverse err-container">
                                                        <span className={"validationErrors"}>
                                                            {errors.confirmPassword?.type === 'required' && <p role="alert">Campo requerido</p>}
                                                            {errors.confirmPassword?.type === 'validate' && <p role="alert">Contraseñas no coinciden</p>}
                                                        </span>
                                                    </div>
                                                </div>


                                                <div className="d-flex flex-column form-container">
                                                    <div className="d-flex flex-row justify-content-center form-container">
                                                        <input className="form-check-input me-2" type="checkbox" value=""
                                                               id="form2Example3c" {...register("terms", { required: true })}/>
                                                        <label className="form-check-label" htmlFor="form2Example3">
                                                            Acepto <a href="#!">términos y condiciones</a>
                                                        </label>
                                                    </div>
                                                    <div className="d-flex flex-row justify-content-center err-container">
                                                        <span className={"validationErrors"}>
                                                            {errors.terms?.type === 'required' && <p role="alert">Campo requerido</p>}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <input type="submit" className="btn btn-primary btn-lg" value={"Registrar"} disabled={submitting}/>
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
                        {!registrationError ? <p>Registro exitoso</p> : <p>Registro fallido</p>}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!registrationError ?
                    <p>
                        Bienvenido!

                        Se le ha enviado un correo de confirmación para validar su cuenta, porfavor siga las
                        instrucciones para que su cuenta quede activa.
                    </p> :
                    <p>
                        Ha habido un error con el registro: <span className={"important-text"}>{errorMessage}</span>
                    </p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {!registrationError ? <Button onClick={handleClose} variant={"success"}>Cerrar</Button> : <Button onClick={handleClose} variant={"danger"}>Cerrar</Button>}
                </Modal.Footer>
            </Modal>
        </div>);
}

export default Register;