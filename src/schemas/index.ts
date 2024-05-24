
import { z } from 'zod'

export const  OrderSchema = z.object({
    name: z.string()
                .min(1, 'Tu nombre es obligatorio.'),
    total: z.number()
                .min(1, 'Hay errores en la orden'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    })),
    tableId: z.number()
                    .min(1, 'No se ha Asignado Mesa'),
                    
})

export const OrderIdSchema = z.object({
    orderId: z.string()
                    .transform((value) => parseInt(value))
                    .refine(value => value > 0, {message: 'Hay Errores'})
})

export const SearchSchema = z.object({
    search: z.string()
                .trim()
                .min(1, {message: 'La Búsqueda no puede estar Vacía!'})
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image: z.string()
                .min(1, {message: 'La Imagen es Obligatoria!'})
})

export const TableSchema = z.object({
    name: z.string()
                .trim()
                .min(1, 'El Nombre de La Mesa es Obligatorio'),
    ubication: z.string()
                .trim()
                .min(1, 'La Ubicación de La Mesa es Obligatorio'),
    qr: z.string()
})

export const LoginSchema = z.object({
    email: z.string()
                .email({
        message: 'El Email es Obligatorio!'
    }),
    password: z.string()
                .min(1, {
                    message: 'La contraseña es Obligatoria!'
                })
})

export const RegisterSchema = z.object({
    email: z.string()
                .email({
        message: 'El Email es Obligatorio!'
    }),
    password: z.string()
                .min(8, {
                    message: 'La Contraseña debe tener minimo 8 caracteres!'
                }),
    name: z.string()
                .min(1, {
                    message: "El Nombre es Obligatorio!"
                })
            
})
