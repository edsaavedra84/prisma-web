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
import {FormInput} from "./forms/form-input";

export type RegistrationFormFields = {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
    terms: boolean;
};

function Register() {
    const iconSize = 30;
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } , trigger} = useForm<RegistrationFormFields>();

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
                                                <FormInput<RegistrationFormFields>
                                                    id="name2"
                                                    icon={<Icon.PersonFill size={iconSize}/>}
                                                    name="name"
                                                    type="text"
                                                    label="Nombre"
                                                    placeholder="Ingrese nombre"
                                                    className="mb-2"
                                                    register={register}
                                                    rules={{
                                                        required: 'Campo requerido'
                                                    }}
                                                    errors={errors}
                                                />

                                                <FormInput<RegistrationFormFields>
                                                    id="email"
                                                    icon={<Icon.Mailbox2 size={iconSize}/>}
                                                    type="email"
                                                    name="email"
                                                    label="Email Address"
                                                    placeholder="Ingrese Email"
                                                    className="mb-2"
                                                    register={register}
                                                    rules={{
                                                        required: 'Campo requerido',
                                                        pattern: {value: /^\S+@\S+\.\S+$/i, message: "Formato incorrecto de E-Mail"}
                                                    }}
                                                    errors={errors}
                                                />

                                                <FormInput<RegistrationFormFields>
                                                    id="password"
                                                    icon={<Icon.LockFill size={iconSize}/>}
                                                    type="password"
                                                    name="password"
                                                    label="Password"
                                                    placeholder="Ingrese contraseña"
                                                    className="mb-2"
                                                    register={register}
                                                    rules={{
                                                        required: 'Campo requerido'
                                                    }}
                                                    errors={errors}
                                                />

                                                <FormInput<RegistrationFormFields>
                                                    id="confirmPassword"
                                                    icon={<Icon.KeyFill size={iconSize}/>}
                                                    type="password"
                                                    name="confirmPassword"
                                                    label="confirmPassword"
                                                    placeholder="Confirme contraseña"
                                                    className="mb-2"
                                                    register={register}
                                                    rules={{
                                                        validate: (val: string) => {
                                                            if (val && val !== "" && watch('password') !== val) {
                                                                return "Your passwords do no match";
                                                            }
                                                        }
                                                    }}
                                                    errors={errors}
                                                />

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