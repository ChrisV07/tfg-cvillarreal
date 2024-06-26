import { CardWrapper } from "./card-wrapper"

export default function ErrorCard() {
  return (
        <CardWrapper 
            headerTitle="😩 Error" 
            headerLabel="Oops! Algo salió mal!"
            backButtonLabel="Volver a la pagina de inicio de sesion" 
            backButtonHref=" api/auth/signout"
        >
            <p className="text-center text-2xl">⚠️</p>
        </CardWrapper>
  )
}
