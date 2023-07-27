'use client';

import Sandwich from '@/models/Sandwich';
import './Post.css';
import { useRouter } from 'next/navigation';
import User from '@/models/User';
import { useContext, useEffect, useState } from 'react';
import { get } from 'http';
import { findUser } from '@/services/UserService';
import { LoadingContext } from '@/services/Context';

type PostProps = {
    sandwich: Sandwich,
}

export default function Post({ sandwich }: PostProps) {

    const router = useRouter();
    const { setLoading } = useContext(LoadingContext);
    const [user, setUser] = useState({} as User);

    useEffect(() => {
        if (sandwich.userId === undefined) return;
        findUser(sandwich.userId).then(res => {
            setUser(res.data);
        }
        ).catch(err => {
            console.log(err);
        });
    }, [sandwich])

    let handler = () => {
        setLoading(true);
        router.push('/sandwich/' + sandwich?.id);
    }

    return (
        <div className='Post' onClick={handler}>
            <p className='PostTitle'> {sandwich.name} </p>
            <img src={sandwich.imageUrl} width={300} alt={sandwich.name + " image"} />
            <p className='PostUser'>By {user?.name} </p>
        </div>
    );
}