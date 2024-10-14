import { DailyOrder, Feedback, Order, OrderProducts, Product, Restaurant, Table } from "@prisma/client";

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number,
    subtotal: number
}

export type OrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product;
  })[];
  table: Table;
};

export type DailyOrderWithProducts = DailyOrder & {
  orders: OrderWithProducts[];
  table: Table; 
};

export interface FeedbackWithRestaurant extends Feedback {
  restaurant: Restaurant;
}