'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { getSandwiches } from '@/services/SandwichService';
import Post from '@/components/post/Post';
import Sandwich from '@/models/Sandwich';
import Loader from '@/components/loader/Loader';

export default function Explore({ navigation }: any) {

    const [sandwiches, setSandwiches]: [Sandwich[], any] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadMore();
    }, [])

    const loadMore = () => {
        if (!hasMore) return;
        setLoading(true);
        getSandwiches(page + 1)
            .then(res => {
                if (res.data.length === 0) {
                    setHasMore(false);
                }
                else setHasMore(res.data.hasMore);
                setSandwiches([...sandwiches, ...res.data.data]);
                setPage(page + 1);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleScroll = (e: any) => {
        if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 100) {
            loadMore();
        }
    }

    return (
        <main className={styles.main} id='main' onScroll={handleScroll}>
            {
                sandwiches.map((sandwich: Sandwich) => {
                    return (<Post sandwich={sandwich} key={sandwich.id} />)
                })
            }
            {loading && <Loader />}
        </main>
    )
}
