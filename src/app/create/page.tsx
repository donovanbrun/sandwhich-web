'use client';

import Style from './page.module.css'
import Sandwich from "@/models/Sandwich";
import { UserContext } from "@/services/Context";
import { createSandwich } from "@/services/SandwichService";
import { useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react";

export default function Create() {

    const [sandwich, setSandwich] = useState({} as Sandwich);
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        setSandwich({
            ...sandwich,
            userId: user?.id
        })
    }, [user])

    let handleChange = (e: any) => {
        setSandwich({
            ...sandwich,
            [e.target.name]: e.target.value
        })
    }

    let handleSubmit = (e: any) => {
        createSandwich(sandwich).then(res => {
            router.push('/');
        });
    }

    return (
        <div className={Style.Create}>
            <h1>Create a sandwich</h1>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={handleChange} />
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" name="imageUrl" id="imageUrl" onChange={handleChange} />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" onChange={handleChange} />
            <button onClick={handleSubmit}>Create</button>
        </div>
    );
}