import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center border-b pb-4">
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="flex-grow px-4">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-gray-500 text-sm">SKU: {item.id.toString().padStart(6, '0')}</p>
      </div>
      
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center border rounded-md mr-4">
          <button 
            className="px-2 py-1 text-gray-600 hover:text-gray-800"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-2 py-1 text-gray-800 w-8 text-center">{item.quantity}</span>
          <button 
            className="px-2 py-1 text-gray-600 hover:text-gray-800"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-right">
          <div className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</div>
          <div className="text-sm text-gray-500">${item.price.toFixed(2)} each</div>
        </div>
        
        <button 
          className="ml-4 text-red-500 hover:text-red-700"
          onClick={() => removeItem(item.id)}
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;