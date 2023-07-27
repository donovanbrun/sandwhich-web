'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { getSandwiches } from '@/services/SandwichService';
import Post from '@/components/post/Post';
import Sandwich from '@/models/Sandwich';

export default function Explore({ navigation }: any) {

    const [sandwiches, setSandwiches]: [Sandwich[], any] = useState([]);

    useEffect(() => {
        getSandwiches()
            .then(res => {
                setSandwiches(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <main className={styles.main}>
            {
                sandwiches.map((sandwich: Sandwich) => {
                    return (<Post sandwich={sandwich} key={sandwich.id} />)
                })
            }
        </main>
    )
}
