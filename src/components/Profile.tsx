import React, {useEffect, useState} from 'react';
import {auth} from "../config/firebase";
import UserService from "../services/UserService";
import IUserData from "../models/user.type";

function Profile() {
    const [user, setUser] = useState<IUserData | null>(null);

    useEffect(() => {
        UserService.getById(auth.currentUser?.uid as string).then((data: any) => {
            const da: IUserData = {
                name: data.name,
                email: data.email,
                isInternalUser: true
            }

            console.log("fethcing user data");
            setUser(da);
        })
    }, []);

    return (
    <div>
        <div className={"d-flex flex-column"}>
            <div>Hola {user?.name}</div>
            <div>
                {(auth.currentUser?.emailVerified) ? "Bien hecho! Tu correo ha sido verificado!": "Tu correo aun no ha sido verificado, por favor sigue las instrucciones"}
            </div>

            <div className={"d-flex flex-row justify-content-center mt-5"}>
                <div>Name: </div>
                <div>{user?.name}</div>
            </div>
            <div className={"d-flex flex-row justify-content-center "}>
                <div>Email: </div>
                <div>{user?.email}</div>
            </div>
        </div>
    </div>);
}

export default Profile;
