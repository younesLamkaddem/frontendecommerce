import { CartItem } from "./cart";

export interface Order {

        id: number;
        customerName:string;
        totalAmount:number;
        shippingAddress:string;
        orderDate:Date;
        items: CartItem[];


}
