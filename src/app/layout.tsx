'use client';

import Nav from "@/components/Nav"
import './globals.css'
import { UserContext } from "@/services/Context";
import { useEffect, useState } from "react";
import { getUser } from "@/services/UserService";
import { getAuthToken } from "@/services/Storage";
import { useRouter } from "next/navigation";
import User from "@/models/User";

// export const metadata = {
//     title: 'SandWhich',
//     description: "It's time to share your favorite sandwiches !",
// }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState({} as User);
    const router = useRouter();

    useEffect(() => {
        if (getAuthToken().token === null || getAuthToken()?.expiration < (Date.now() / 1000)) {
            router.push('/login');
        }
        else {
            getUser().then(res => {
                setUser(res.data);
            })
        }
    }, [router])

    return (
        <html lang="en">
            <body>
                <UserContext.Provider value={{ user, setUser }}>
                    <Nav />
                    {children}
                </UserContext.Provider>
            </body>
        </html>
    )
}
