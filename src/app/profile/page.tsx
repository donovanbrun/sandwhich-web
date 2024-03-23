'use client';

import Sandwich from '@/models/Sandwich';
import Style from './page.module.css';
import { LoadingContext, UserContext } from "@/services/Context";
import { removeAuthToken } from "@/services/Storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getSandwichesByUserID } from '@/services/SandwichService';
import User from '@/models/User';

export default function Profile() {

    const { user, setUser } = useContext(UserContext);
    const [sandwiches, setSandwiches] = useState([] as Sandwich[]);
    const { setLoading } = useContext(LoadingContext);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        if (user.id) {
            getSandwichesByUserID(user.id).then(res => {
                setSandwiches(res.data);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            })
        }
        else {
            setLoading(false);
        }
    }, [user])

    let logout = () => {
        removeAuthToken()
        setUser({} as User);
        router.push('/login');
    }

    let navigateToSandwich = (id: any) => {
        setLoading(true);
        router.push('/sandwich/' + id);
    }

    return (
        <div className={Style.Profile}>
            <h1>{user?.name}</h1>
            <p>Email : {user?.email}</p>
            <p>Bio : {user?.bio}</p>
            <h2>My sandwiches : {sandwiches?.length ?? 0}</h2>
            <div className={Style.Sandwiches}>
                {
                    sandwiches?.map((sandwich: Sandwich) => {
                        return (
                            <div className={Style.Sandwich} key={sandwich.id} onClick={() => navigateToSandwich(sandwich.id)}>
                                <h3>{sandwich.name}</h3>
                                <img src={sandwich.imageUrl} alt={sandwich.name} width={100} height={100} />
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}