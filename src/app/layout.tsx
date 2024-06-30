'use client';

import Nav from "@/components/nav/Nav"
import './globals.css'
import { LoadingContext, UserContext } from "@/services/Context";
import { useEffect, useState } from "react";
import { getUser } from "@/services/UserService";
import { getAuthToken } from "@/services/Storage";
import { useRouter, usePathname } from "next/navigation";
import User from "@/models/User";

const metadata = {
    title: 'SandWhich',
    description: "It's time to share your favorite sandwiches !",
}

const unrestrictedRoutes = [
    '/',
    '/login',
    '/register',
    '/sandwich',
    '/404',
]

const isAuthorized = (path: string, allowedPaths: string[]) => {
    return allowedPaths.some(allowedPath => {
        return path === allowedPath || path.startsWith(`${allowedPath}/`);
    });
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState({} as User);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        getUser().then(res => {
            setUser(res.data);
        }).catch(err => {
            console.log(err);
        });

        if (isAuthorized(pathname, unrestrictedRoutes)) {
            return;
        }
        if (getAuthToken().token === null || getAuthToken()?.expiration < (Date.now() / 1000)) {
            router.push('/login');
        }
    }, [router, pathname])

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
