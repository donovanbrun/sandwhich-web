'use client';

import Sandwich from '@/models/Sandwich';
import Style from './page.module.css';
import { LoadingContext, UserContext } from "@/services/Context";
import { removeAuthToken } from "@/services/Storage";
import { useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react";
import { getSandwichesByUserID } from '@/services/SandwichService';
import { findUser, updateUser } from '@/services/UserService';
import User from '@/models/User';

export default function Profile({ params }: { params: { id: string } }) {

    const [user, setUser] = useState({} as User); // will be us later for public profile
    const [sandwiches, setSandwiches] = useState([] as Sandwich[]);
    const { setLoading } = useContext(LoadingContext);
    const [modifiedUser, setModifiedUser] = useState({} as User);
    const { user: connectedUser, setUser: setConnectedUser } = useContext(UserContext);
    const [edit, setEdit] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        findUser(params?.id).then(res => {
            setModifiedUser(res.data);
            setUser(res.data);
            if (res.data?.id) {
                getSandwichesByUserID(res.data?.id).then(res => {
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
        });
    }, [params?.id])

    const logout = () => {
        removeAuthToken()
        setConnectedUser({} as User);
        router.push('/login');
    }

    const navigateToSandwich = (id: any) => {
        setLoading(true);
        router.push('/sandwich/' + id);
    }

    const handleChange = (e: any, field: string) => {
        if (["bio", "description"].indexOf(field) === -1) return;
        setModifiedUser({
            ...modifiedUser,
            [field]: e.target.value
        })
    }

    const save = () => {
        updateUser(modifiedUser).then(res => {
            setUser(res.data);
            setModifiedUser(res.data);
            setEdit(false);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={Style.Profile}>
            <h1>{user?.name}</h1>
            {
                edit ?
                    <textarea onChange={(e) => handleChange(e, "bio")} value={modifiedUser?.bio}></textarea>
                    : <p>{user?.bio}</p>
            }
            {
                connectedUser.id === user.id && (
                    edit ?
                        <button onClick={save}>Save</button>
                        : <button onClick={() => setEdit(!edit)}>Edit</button>
                )
            }
            <h2>Sandwiches : {sandwiches?.length ?? 0}</h2>
            <div className={Style.Sandwiches}>
                {
                    sandwiches?.map((sandwich: Sandwich) => {
                        return (
                            <div className={Style.Sandwich} key={sandwich.id} onClick={() => navigateToSandwich(sandwich.id)}>
                                <h3>{sandwich.name}</h3>
                                <img src={sandwich.imageUrl} alt={sandwich.name} width={150} height={150} />
                            </div>
                        )
                    })
                }
            </div>
            {
                connectedUser.id === user.id &&
                <button onClick={logout}>Logout</button>
            }
        </div>
    )
}