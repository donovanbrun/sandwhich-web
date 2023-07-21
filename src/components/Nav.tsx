'use client';

import { useContext, useEffect, useState } from 'react';
import './Nav.css'
import Link from 'next/link'
import { UserContext } from '@/services/Context';

export default function Nav() {

    const { user, setUser } = useContext(UserContext);

    return (
        <nav>
            <Link href="/" className='NavItem'>Explore</Link>
            <Link href="/create" className='NavItem'>Create</Link>

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