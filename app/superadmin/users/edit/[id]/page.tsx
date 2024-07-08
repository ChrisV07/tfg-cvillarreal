import EditUserForm from "@/components/users/EditUserForm"
import UserForm from "@/components/users/UserForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { User } from "@prisma/client"

import { notFound } from "next/navigation"

async function getUserById(id: User['id']){
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    if(!user){
        notFound()
    }
    return user
}

export default async function EditUserPage({params} : {params: {id: User['id']}}) {
  
    const user = await getUserById(params.id)
  
    return (
    <>
        <div className="py-4">
        <Heading>Editar Usuario: {user.name}</Heading>

       <GoBackButton seccion="Usuarios"/>
        </div>



        <EditUserForm>
            <UserForm
                user= {user}
            />
        </EditUserForm>

    </>
  )
}
