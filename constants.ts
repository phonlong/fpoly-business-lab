import { MenuItem, Category } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Cà có phê
  {
    id: 'cf-1',
    name: 'Xỉu up xỉu down',
    price: 25000,
    category: Category.COFFEE,
    description: 'Cà phê sữa đậm đà bừng tỉnh',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'cf-2',
    name: 'Dark night',
    price: 20000,
    category: Category.COFFEE,
    description: 'Cà phê đen đá không đường',
    image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'cf-3',
    name: '"Nâu" tan',
    price: 20000,
    category: Category.COFFEE,
    description: 'Cà phê nâu truyền thống',
    image: 'https://images.unsplash.com/photo-1582650088746-b3334c9103c2?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'cf-4',
    name: 'Thêm "nâu"',
    price: 5000,
    category: Category.COFFEE,
    description: 'Thêm shot cà phê',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop'
  },

  // Trà mix sữa
  {
    id: 'tm-1',
    name: 'Conan',
    price: 25000,
    category: Category.MILK_TEA,
    description: 'Trà sữa trân châu thám tử lừng danh',
    image: 'https://images.unsplash.com/photo-1558857563-b31cfc36fa67?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'tm-2',
    name: 'Chô cô',
    price: 25000,
    category: Category.MILK_TEA,
    description: 'Trà sữa Chocolate ngọt ngào',
    image: 'https://images.unsplash.com/photo-1626388435183-42eb4dc4fa0c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'tm-3',
    name: 'Xanh sữa',
    price: 25000,
    category: Category.MILK_TEA,
    description: 'Trà sữa Thái xanh thơm mát',
    image: 'https://images.unsplash.com/photo-1626570659972-747d8f58c734?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'tm-4',
    name: 'Thêm Nhai đã',
    price: 10000,
    category: Category.MILK_TEA,
    description: 'Topping trân châu giòn dai',
    image: 'https://images.unsplash.com/photo-1605193988672-b7e527d81a96?q=80&w=1000&auto=format&fit=crop'
  },

  // Trà ko sữa
  {
    id: 't-1',
    name: 'Anh Đào',
    price: 20000,
    category: Category.TEA,
    description: 'Trà hoa anh đào thanh nhẹ',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 't-2',
    name: 'Bé Cúc',
    price: 25000,
    category: Category.TEA,
    description: 'Trà hoa cúc mật ong',
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 't-3',
    name: 'Dì Xoài',
    price: 25000,
    category: Category.TEA,
    description: 'Trà xoài nhiệt đới',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 't-4',
    name: 'Út Tắc',
    price: 15000,
    category: Category.TEA,
    description: 'Trà tắc khổng lồ giải nhiệt',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop'
  },

  // Măm măm
  {
    id: 's-1',
    name: 'Phúng phính',
    price: 15000,
    category: Category.SNACK,
    description: 'Bánh bông lan mềm mịn',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 's-2',
    name: 'Giòn giòn',
    price: 15000,
    category: Category.SNACK,
    description: 'Khoai tây lắc phô mai',
    image: 'https://images.unsplash.com/photo-1518013431117-e5952c874f49?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 's-3',
    name: 'Úp ly',
    price: 15000,
    category: Category.SNACK,
    description: 'Mì tôm úp trứng lòng đào',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1000&auto=format&fit=crop'
  },
];