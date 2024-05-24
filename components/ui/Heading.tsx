import { PropsWithChildren } from "react";


export default function Heading({children} : PropsWithChildren) {
  return (
    <h1 className="text-2xl mt-8 my-4">
        {children}
    </h1>
  )
}
