'use client';

import { UserContext, LoadingContext } from '@/services/Context';
import styles from './page.module.css'
import { setAuthToken } from "@/services/Storage";
import { getUser, login } from "@/services/UserService";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Login() {

    const [cred, setCred] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const { setUser } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);

    let handler = () => {
        setLoading(true);
        login(cred.email, cred.password).then(res => {
            setAuthToken(res.data.token, res.data.expiration);
            getUser().then(res => {
                setUser(res.data);
                setLoading(false);
            })
            router.push('/');
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setError("Error while logging in");
        });
    }

    let goToRegister = () => {
        router.push('/register');
    }

    return (
        <div className={styles.Login}>
            <h1> Login </h1>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={cred.email} onChange={(e) => setCred({ ...cred, email: e.target.value })} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={cred.password} onChange={(e) => setCred({ ...cred, password: e.target.value })} />
            <button onClick={handler}>Login</button>
            <p className={styles.Error}>{error}</p>
            <br />
            <p>Don&apos;t have an account ?</p>
            <button onClick={goToRegister}>Register</button>
        </div>
    )
}