import React from 'react';
import { MenuItem } from '../types';
import { Plus } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onAdd }) => {
  const formatPrice = (price: number) => {
    return (price / 1000) + 'k';
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-coffee-100 flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <div className="relative h-32 w-full mb-3 rounded-2xl overflow-hidden bg-coffee-50">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="text-coffee-900 font-bold text-lg leading-tight mb-1">{item.name}</h3>
        <p className="text-coffee-500 text-xs mb-3 line-clamp-2">{item.description}</p>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-coffee-700 font-bold text-xl">{formatPrice(item.price)}</span>
          <button 
            onClick={() => onAdd(item)}
            className="w-10 h-10 bg-coffee-500 hover:bg-coffee-600 active:bg-coffee-800 text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};