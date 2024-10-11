import Heading from "@/components/ui/Heading";
import NewUserForm from "@/components/users/NewUserForm";
import UserForm from "@/components/users/UserForm";




export default function NewUserPage() {
  return (
    <>
        <Heading>Nuevo Usuario</Heading>

        
        <NewUserForm>
          <UserForm isRegister= {true}/>
        </NewUserForm>


    </>
  )
}
