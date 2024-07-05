"use client";

import { UserSchema } from "@/src/schemas";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { updateUser } from "@/actions/update-user-action";
import { useParams } from "next/navigation";

export default function EditUserForm({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : params.id[0];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            role: formData.get('role') as string,
            restaurantID: formData.get('restaurantID') as string,
        };

        const result = UserSchema.safeParse(data);

        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message, { theme: 'dark' });
            });
            return;
        }

        const response = await updateUser(result.data, id);
        if (response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message, { theme: 'dark' });
            });
            return;
        }
        router.push('/superadmin/users');
        toast.success('Usuario Modificado Exitosamente', { theme: 'dark' });
    };

    return (
        <div className="bg-white mt-1 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
                {children}
                <input
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
                    value="Guardar Cambios"
                />
            </form>
        </div>
    );
}