'use client';

import { useContext } from 'react';
import './Nav.css'
import Link from 'next/link'
import { UserContext } from '@/services/Context';

export default function Nav() {

    const { user, setUser } = useContext(UserContext);

    return (
        <nav>
            <img src="/SandWhich-icon.png" alt="SandWhich" width={50} height={50} />
            <div className='NavItems'>
                <Link href="/" className='NavItem'>Explore</Link>
                <Link href="/create" className='NavItem'>Create</Link>
            </div>

            {
                user ? (
                    <Link href="/profile" className='NavItem'>{user.name}</Link>
                ) : (
                    <Link href="/login" className='NavItem'>Login</Link>
                )
            }
        </nav>
    )
}