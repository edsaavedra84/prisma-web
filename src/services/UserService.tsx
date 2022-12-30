import { collection, setDoc, updateDoc, deleteDoc,  doc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import {db, auth} from "../config/firebase";
import IUserData from "../models/user.type"

let userRef = collection(db, "/user");

class UserService {
    getAll() {
        return userRef;
    }

    create(user: IUserData, password: string) {
        return createUserWithEmailAndPassword(auth, user.email, password).then((result) => {
            user.key = result.user.uid; // let's get the uid from auth

            const actionCodeSettings = {
                url: 'http://localhost:3000/verified/?email='+user.email,
                handleCodeInApp: true
            };

           sendEmailVerification(result.user, actionCodeSettings).then(() => {
                return setDoc(doc(db, "user", result.user.uid), user);
            }).then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
                console.log("failed to regiuster user");
            });
        });
    }

    createFromExternalChannel(user: IUserData, uid: string) {
        return setDoc(doc(db, "user", uid), user).then((data) => {
            console.log("failed to regiuster user");
        }).catch((err) => {
            console.log(err);
            console.log("failed to regiuster user");
        });
    }

    getById(key: string) {
        const ref =  doc(db, "user", key);

        return getDoc(ref).then((data) => {
            return data.data();
        });
    }

    update(key: string, value: any) {
        const ref = doc(db, "user", key)
        return updateDoc(ref, value);
    }

    delete(key: string) {
        const ref = doc(db, "user", key)
        return deleteDoc(ref);
    }
}

export default new UserService();