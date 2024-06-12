"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";







type LogOutButtonProps = {
    children?: React.ReactNode 
}

export const LogOutButton = ({ children }: LogOutButtonProps) => {
    const handleClick = () => {
        signOut()
        
}

return (
    <span onClick={handleClick} className="cursor-pointer">
        {children}
    </span>
)
}