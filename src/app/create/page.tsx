'use client';

import Style from './page.module.css'
import Sandwich from "@/models/Sandwich";
import { LoadingContext, UserContext } from "@/services/Context";
import { createSandwich } from "@/services/SandwichService";
import { useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react";

export default function Create() {

    const [sandwich, setSandwich] = useState({} as Sandwich);
    const { user, setUser } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);
    const router = useRouter();
    const [step, setStep] = useState(0);

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
        setLoading(true);
        createSandwich(sandwich).then(res => {
            setLoading(false);
            router.push('/');
        });
    }

    return (
        <div className={Style.Create}>
            {
                step === 0 ?
                    <div className={Style.CreateSection}>
                        <h1 className={Style.CreateTitle}>What's the name of your sandwich ?</h1>
                        <input type="text" name="name" id="name" onChange={handleChange} placeholder='My Favorite Sandwich' />
                        <button onClick={() => setStep(1)}>Next</button>
                    </div>
                    : step === 1 ?
                        <div className={Style.CreateSection}>
                            <h1 className={Style.CreateTitle}>Show us what it looks like !</h1>
                            <input type="text" name="imageUrl" id="imageUrl" onChange={handleChange} placeholder='https://www...' />
                            <button onClick={() => setStep(2)}>Next</button>
                        </div>
                        : step === 2 ?
                            <div className={Style.CreateSection}>
                                <h1 className={Style.CreateTitle}>What's in it ?</h1>
                                <textarea name="description" id="description" onChange={handleChange} />
                                <button onClick={handleSubmit}>Create</button>
                            </div>
                            : null
            }

        </div>
    );
}