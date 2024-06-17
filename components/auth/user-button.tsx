"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogOutButton } from "./logout-button";
import Image from "next/image";

import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();
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
            {user ? (<LogOutButton>
            <DropdownMenuItem>
                <Image src='/LogOut.svg' width={40} height={40} alt="signout"/>
                Cerrar Sesión
            </DropdownMenuItem>
          </LogOutButton>) : (
            <Link href={'/auth/login'}>
            <DropdownMenuItem>
                
                <Image src='/LogOut.svg' width={40} height={40} alt="signout"/>
                Iniciar Sesión
            </DropdownMenuItem>
                </Link>
        ) }
          
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
