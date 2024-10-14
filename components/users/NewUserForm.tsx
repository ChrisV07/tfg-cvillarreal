"use client";

import { CreateUserFromSuperAdminSchema } from "@/src/schemas";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { createUserFromSuperAdmin } from "@/actions/create-user-from-superadmin-admin-action";
import { FormEvent } from "react";

export default function NewUserForm({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            role: formData.get('role') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
            restaurantID: formData.get('restaurantID') as string,

            
        };

        const result = CreateUserFromSuperAdminSchema.safeParse(data);

        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message, { theme: 'dark' });
            });
            return;
        }

        const response = await createUserFromSuperAdmin(result.data);
        if (response?.error) {
            toast.error(response.error, { theme: 'dark' });
            return;
        }
        router.push('/superadmin/users');
        toast.success('Usuario Creado Exitosamente', { theme: 'dark' });
    };

    return (
        <div className="bg-white mt-1 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
                {children}
                <input
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
                    value="Crear Usuario"
                />
            </form>
        </div>
    );
}