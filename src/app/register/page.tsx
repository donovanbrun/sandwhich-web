'use client';

import { LoadingContext } from '@/services/Context';
import styles from './page.module.css'
import { register } from "@/services/UserService";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const { setLoading } = useContext(LoadingContext);

    let handleRegister = () => {
        setLoading(true);
        register(name, email, password).then(res => {
            setLoading(false);
            router.push('/login');
        }).catch(err => {
            console.log(err);
            setError("Error while registering");
        });
    }

    return (
        <div className={styles.Register}>
            <h1>Register</h1>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <p className={styles.Error}>{error}</p>
        </div>
    )
}