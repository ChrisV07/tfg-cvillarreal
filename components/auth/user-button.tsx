"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-session";
import { LogOutButton } from "./logout-button";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/router";

export const UserButton = () => {
  
  const user = useCurrentUser();


  const handleLoginClick = () => {
    // Almacena la URL actual en localStorage
    const currentUrl = window.location.href;
    localStorage.setItem("redirectUrl", currentUrl);
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-violet-800 text-white">
            <FaUser />
          </AvatarFallback>
        </Avatar>
        <DropdownMenuContent className="w-40" align="end">
          {user ? (
            <LogOutButton>
              <DropdownMenuItem>
                <Image src='/LogOut.svg' width={40} height={40} alt="signout" />
                Cerrar Sesión
              </DropdownMenuItem>
            </LogOutButton>
          ) : (
            <Link href={'/auth/login'} onClick={handleLoginClick}>
              <DropdownMenuItem>
                <Image src='/LogOut.svg' width={40} height={40} alt="signin" />
                Iniciar Sesión
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};