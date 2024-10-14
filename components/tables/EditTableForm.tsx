"use client";
import { TableSchema } from "@/src/schemas";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { updateTable } from "@/actions/update-table-action";
import { useParams } from "next/navigation";
import { useCurrentRestaurant } from "@/hooks/use-current-session";

export default function EditTableForm({children} : {children : React.ReactNode}) {

    const router = useRouter();
    const params = useParams();
    const id = params.id?.toString(); 
    const restaurantID = useCurrentRestaurant();

    const handleSubmit = async (formData: FormData) => {
        // Verifica y proporciona valores predeterminados si son nulos
        const data = {
            name: formData.get('name')?.toString() || '',
            ubication: formData.get('ubication')?.toString() || '',
            qr: `qr_${formData.get('name')}_${formData.get('ubication')}.jpg`,
            restaurantID,
        };


        const result = TableSchema.safeParse(data);

        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message, {theme: 'dark'});
            });
            return;
        }

        const response = await updateTable(result.data, id);
        if (response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message, {theme: 'dark'});
            });
            return;
        }
        router.push('/admin/tables');
        toast.success('Mesa Modificada Exitosamente', {theme: 'dark'});
    };

    return (
        <div className="bg-white px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto mt-4">
            <form action={handleSubmit} className="space-y-5">
                {children}
                <input 
                    type="submit" 
                    className="bg-pink-600 hover:bg-pink-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
                    value={'Guardar Cambios'}
                />
            </form>
        </div>
    );
}