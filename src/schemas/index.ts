
import {z } from "zod";

export const RestaurantSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  image: z.string().optional(),
})

export const OrderSchema = z.object({
  name: z.string().min(1, "Tu nombre es obligatorio."),
  total: z.number().min(1, "Hay errores en la orden"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),
  restaurantID: z.string(),
  tableId: z.string().min(1, "No se ha Asignado Mesa"),
});

export const OrderIdSchema = z.object({
  orderId: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "Hay Errores" }),
});

export const DailyOrderIdSchema = z.object({
  dailyOrderId: z
    .string()
});

export const SearchSchema = z.object({
  search: z
    .string()
    .trim()
    .min(1, { message: "La Búsqueda no puede estar Vacía!" }),
});

export const ProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "El Nombre del Producto no puede ir vacio" }),
  price: z
    .string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: "Precio no válido" })
    .or(z.number().min(1, { message: "La Categoría es Obligatoria" })),
  categoryId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "La Categoría es Obligatoria" })
    .or(z.number().min(1, { message: "La Categoría es Obligatoria" })),
  image: z.string().min(1, { message: "La Imagen es Obligatoria!" }),
  restaurantID: z.string(),
});

export const TableSchema = z.object({
  name: z.string().trim().min(1, "El Nombre de La Mesa es Obligatorio"),
  ubication: z.string().trim().min(1, "La Ubicación de La Mesa es Obligatorio"),
  qr: z.string(),
  restaurantID: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "El Email es Obligatorio!",
  }),
  password: z.string().min(1, {
    message: "La contraseña es Obligatoria!",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "El Email es Obligatorio!",
    }),
    password: z.string().min(8, {
      message: "La Contraseña debe tener minimo 8 caracteres!",
    }),
    confirmPassword: z.string().min(8, {
      message: "La Confirmación de Contraseña debe tener mínimo 8 caracteres!",
    }),
    name: z.string().min(1, {
      message: "El Nombre es Obligatorio!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // Este path es para que el mensaje de error aparezca en el campo de confirmación
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "El Email es Obligatorio!",
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "La Contraseña debe tener minimo 8 caracteres!",
    }),
    confirmPassword: z.string().min(8, {
      message: "La Confirmación de Contraseña debe tener mínimo 8 caracteres!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // Este path es para que el mensaje de error aparezca en el campo de confirmación
  });

const UserRoleEnum = z.enum([
    'SUPER_ADMIN',
    'RESTO_ADMIN',
    'KITCHEN_ORDERS',
    'READY_ORDERS',
    'CLIENT_USER'
  ]);

  export const UserSchema = z.object({
    email: z.string().email({
        message: "El correo electrónico es obligatorio y debe ser válido!",
    }),
    name: z.string().min(1, {
        message: "El nombre es obligatorio!",
    }),
    restaurantID: z.string().min(1, {
        message: "El Restaurante es Obligatorio!",
    }),
    role: UserRoleEnum,
});

export const CreateUserSchema = z
  .object({
    email: z.string().email({
      message: "El Email es Obligatorio!",
    }),

    password: z.string().min(8, {
      message: "La Contraseña debe tener minimo 8 caracteres!",
    }),

    name: z.string().min(1, {
      message: "El Nombre es Obligatorio!",
    }),
    role: UserRoleEnum,
    restaurantID: z.string()
  })

  export const CreateUserFromSuperAdminSchema = z
  .object({
    email: z.string().email({
      message: "El Email es Obligatorio!",
    }),

    password: z.string().min(8, {
      message: "La Contraseña debe tener minimo 8 caracteres!",
    }),

    name: z.string().min(1, {
      message: "El Nombre es Obligatorio!",
    }),
    role: UserRoleEnum,
    restaurantID: z.string(),
  })
