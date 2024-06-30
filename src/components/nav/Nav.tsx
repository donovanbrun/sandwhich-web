'use client';

import { useContext } from 'react';
import './Nav.css'
import Link from 'next/link'
import { UserContext } from '@/services/Context';

export default function Nav() {

    const { user } = useContext(UserContext);

    return (
        <nav>
            <Link href="/" className='NavItem'>
                <img src="/SandWhich-icon.png" alt="SandWhich" width={60} height={60} />
            </Link>
            <div className='NavItems'>
                <Link href="/" className='NavItem'>Explore</Link>
                <Link href="/create" className='NavItem'>Create</Link>
            </div>

            {
                user?.id ? (
                    <Link href={`/profile/${user.id}`} className='NavItem'>{user.name}</Link>
                ) : (
                    <Link href="/login" className='NavItem'>Login</Link>
                )
            }
        </nav>
    )
}