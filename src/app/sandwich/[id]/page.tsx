'use client';

import User from '@/models/User';
import styles from './page.module.css';
import Sandwich from "@/models/Sandwich";
import { getSandwich, updateSandwich } from "@/services/SandwichService";
import { findUser } from '@/services/UserService';
import { useContext, useEffect, useState } from "react";
import { LoadingContext, UserContext } from '@/services/Context';
import Link from 'next/link';

export default function SandwichPage({ params }: { params: { id: number } }) {

    const [sandwich, setSandwich] = useState({} as Sandwich);
    const [updatedSandwich, setUpdatedSandwich] = useState({} as Sandwich);
    const [user, setUser] = useState({} as User);
    const { setLoading } = useContext(LoadingContext);
    const { user: connectedUser } = useContext(UserContext);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        getSandwich(params?.id)
            .then(res => {
                const s = res.data;
                setSandwich(s);
                setUpdatedSandwich(s);
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


    const handleChange = (e: any, field: string) => {
        if (["name", "description"].indexOf(field) === -1) return;
        setUpdatedSandwich({
            ...updatedSandwich,
            [field]: e.target.value
        })
    }

    const save = () => {
        updateSandwich(updatedSandwich).then(res => {
            setSandwich(res.data);
            setEdit(false);
        });
    };

    return (
        <div className={styles.SandwichPage}>
            {
                edit ?
                    <input type="text" name="name" id="name" value={updatedSandwich.name} onChange={(e) => handleChange(e, "name")} />
                    : <h2>{sandwich.name}</h2>
            }
            <img src={sandwich.imageUrl} alt={sandwich.name + " image"} width={500} />
            <Link href={`/profile/${user.id}`}>By {user.name}</Link>
            {
                edit ?
                    <textarea name="description" id="description" value={updatedSandwich.description} onChange={(e) => handleChange(e, "description")} />
                    : <p>{sandwich.description}</p>
            }
            {
                (connectedUser.id !== undefined && connectedUser.id === user.id) &&
                (
                    edit ?
                        <button onClick={save}>Save</button>
                        : <button onClick={() => setEdit(!edit)}>Edit</button>
                )
            }
        </div >
    )
}