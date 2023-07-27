'use client';

import User from '@/models/User';
import styles from './page.module.css';
import Sandwich from "@/models/Sandwich";
import { getSandwich } from "@/services/SandwichService";
import { findUser } from '@/services/UserService';
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from '@/services/Context';

export default function SandwichPage({ params }: { params: { id: number } }) {

    const [sandwich, setSandwich] = useState({} as Sandwich);
    const [user, setUser] = useState({} as User);
    const { setLoading } = useContext(LoadingContext);

    useEffect(() => {
        getSandwich(params?.id)
            .then(res => {
                const s = res.data;
                setSandwich(s);
                if (s.userId === undefined) return;
                findUser(s.userId).then(res => {
                    setUser(res.data);
                    setLoading(false);
                }
                ).catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, [params?.id])

    return (
        <div className={styles.SandwichPage}>
            <h1>{sandwich.name} by {user.name}</h1>
            <img src={sandwich.imageUrl} alt={sandwich.name + " image"} width={500} />
            <p>{sandwich.description}</p>
        </div >
    )
}