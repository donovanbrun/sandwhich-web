import User from "@/models/User";
import { createContext } from "react";

export const UserContext = createContext({
    user: new User(),
    setUser: (user: User) => { }
});