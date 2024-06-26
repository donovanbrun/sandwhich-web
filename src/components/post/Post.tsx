'use client';

import Sandwich from '@/models/Sandwich';
import './Post.css';
import { useRouter } from 'next/navigation';
import User from '@/models/User';
import { useContext, useEffect, useState } from 'react';
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
        if (!sandwich.userId) return;
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
            <img className="PostImg" src={sandwich.imageUrl} alt={sandwich.name + " image"} />
            <div className='PostOverlay'>
                <p className='PostTitle'> {sandwich.name} </p>
                <p className='PostUser'>By {user?.name} </p>
            </div>
        </div>
    );
}