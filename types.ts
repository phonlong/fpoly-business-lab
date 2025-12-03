export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  note: string;
}

export interface Order {
  customerName: string;
  items: CartItem[];
  total: number;
  orderTime: string;
  paymentMethod: 'cash' | 'transfer';
}

export enum Category {
  COFFEE = "Cà có phê",
  MILK_TEA = "Trà mix sữa",
  TEA = "Trà ko sữa",
  SNACK = "Măm măm"
}