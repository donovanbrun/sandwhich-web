'use client';

import Nav from "@/components/nav/Nav"
import './globals.css'
import { LoadingContext, UserContext } from "@/services/Context";
import { useEffect, useState } from "react";
import { getUser } from "@/services/UserService";
import { getAuthToken } from "@/services/Storage";
import { useRouter } from "next/navigation";
import User from "@/models/User";

const metadata = {
    title: 'SandWhich',
    description: "It's time to share your favorite sandwiches !",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState({} as User);
    const [loading, setLoading] = useState(false);
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
            <head>
                <title>SandWhich</title>
                <meta name="description" content={"It's time to share your favorite sandwiches !"} />
                <link rel="icon" href={"/SandWhich-icon.png"} />
            </head>
            <body>
                <LoadingContext.Provider value={{ loading, setLoading }}>
                    {
                        loading ?
                            <div className="Loader">
                                <div className="Spinner">
                                </div>
                            </div>
                            : null
                    }
                    <UserContext.Provider value={{ user, setUser }}>
                        <Nav />
                        {children}
                    </UserContext.Provider>
                </LoadingContext.Provider>
            </body>
        </html>
    )
}
