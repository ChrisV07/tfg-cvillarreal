import AddTableForm from "@/components/tables/AddTableForm";
import TableForm from "@/components/tables/TableForm";
import Heading from "@/components/ui/Heading";


export default function page() {
  return (
    <>
      
        <Heading>Nueva Mesa</Heading>

        <AddTableForm>
          <TableForm showQr={false}/>
        </AddTableForm>


    </>
  )
}
