import React, { useState, useEffect } from 'react';
import { CartItem, Order } from '../types';
import { X, Trash2, QrCode, Clock, CheckCircle } from 'lucide-react';

interface OrderModalProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  onClearCart: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ 
  items, onClose, onUpdateQuantity, onRemoveItem, onUpdateNote, onClearCart 
}) => {
  const [step, setStep] = useState<'cart' | 'details' | 'payment' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setStep('details');
  };

  const handlePayment = () => {
    if (!customerName.trim()) {
      alert("Vui lòng nhập tên của bạn nhé!");
      return;
    }
    setStep('payment');
  };

  const finishOrder = () => {
    setStep('success');
    // In a real app, send data to backend here
  };

  const closeAndReset = () => {
    if (step === 'success') onClearCart();
    onClose();
  };

  const formatPrice = (price: number) => (price / 1000) + 'k';

  if (items.length === 0 && step === 'cart') {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl p-6 text-center">
          <h2 className="text-xl font-bold text-coffee-800 mb-4">Giỏ hàng trống</h2>
          <p className="text-coffee-600 mb-6">Bạn chưa chọn món nào cả. Hãy xem menu nhé!</p>
          <button onClick={onClose} className="bg-coffee-600 text-white px-6 py-2 rounded-full font-bold">
            Quay lại Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="bg-white w-full max-w-lg h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-coffee-50 border-b border-coffee-100 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold text-coffee-900 flex items-center gap-2">
            {step === 'cart' && 'Giỏ hàng của bạn'}
            {step === 'details' && 'Thông tin đặt hàng'}
            {step === 'payment' && 'Thanh toán'}
            {step === 'success' && 'Hoàn tất'}
          </h2>
          <button onClick={closeAndReset} className="p-2 hover:bg-coffee-200 rounded-full transition-colors">
            <X size={24} className="text-coffee-700" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          
          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-coffee-500 mb-2">
                <span className="flex items-center gap-1"><Clock size={14}/> Thời gian order:</span>
                <span>{time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              {items.map((item) => (
                <div key={item.id} className="flex gap-3 border-b border-coffee-50 pb-4 last:border-0">
                   <div className="w-16 h-16 rounded-xl overflow-hidden bg-coffee-100 shrink-0">
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                   </div>
                   <div className="flex-1">
                     <div className="flex justify-between items-start">
                       <h4 className="font-bold text-coffee-800">{item.name}</h4>
                       <span className="font-bold text-coffee-600">{formatPrice(item.price * item.quantity)}</span>
                     </div>
                     <input 
                       type="text" 
                       placeholder="Ghi chú (ít đá, ít ngọt...)" 
                       value={item.note}
                       onChange={(e) => onUpdateNote(item.id, e.target.value)}
                       className="w-full text-xs mt-1 p-1 bg-coffee-50 rounded border-none focus:ring-1 focus:ring-coffee-300 outline-none text-coffee-700"
                     />
                     <div className="flex justify-between items-center mt-2">
                       <div className="flex items-center gap-3 bg-coffee-50 rounded-lg p-1">
                         <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow text-coffee-700 font-bold">-</button>
                         <span className="text-sm font-bold text-coffee-900 w-4 text-center">{item.quantity}</span>
                         <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow text-coffee-700 font-bold">+</button>
                       </div>
                       <button onClick={() => onRemoveItem(item.id)} className="text-red-400 hover:text-red-600 p-1">
                         <Trash2 size={16} />
                       </button>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-coffee-700 mb-1">Tên của bạn (*)</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-coffee-50 border border-coffee-200 focus:outline-none focus:border-coffee-500"
                  placeholder="Nhập tên để tiệm gọi nhé..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-coffee-700 mb-1">Lời nhắn cho Tiệm</label>
                <textarea 
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  className="w-full p-3 rounded-xl bg-coffee-50 border border-coffee-200 focus:outline-none focus:border-coffee-500 h-24 resize-none"
                  placeholder="Ví dụ: Giao nhanh giúp mình nha..."
                />
              </div>
              <div className="bg-coffee-50 p-4 rounded-xl">
                <h4 className="font-bold text-coffee-800 mb-2">Tóm tắt đơn hàng</h4>
                <div className="space-y-1 text-sm text-coffee-600">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t border-coffee-200 mt-2 pt-2 flex justify-between font-bold text-coffee-900 text-lg">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 'payment' && (
            <div className="flex flex-col items-center justify-center py-4 space-y-6">
              <div className="text-center">
                <p className="text-coffee-600 mb-2">Quét mã để chuyển khoản</p>
                <div className="bg-white p-4 rounded-2xl shadow-lg inline-block border-2 border-coffee-100">
                  {/* Using a placeholder QR Code API */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Thanh toan ${total} VND cho Tiem Ca Phe Chill - ${customerName}`} 
                    alt="QR Code" 
                    className="w-48 h-48"
                  />
                </div>
              </div>
              
              <div className="w-full bg-coffee-50 p-4 rounded-xl flex items-center justify-between">
                <span className="text-coffee-600 font-medium">Số tiền cần thanh toán</span>
                <span className="text-coffee-900 font-bold text-xl">{total.toLocaleString('vi-VN')}đ</span>
              </div>
              
              <div className="w-full text-center text-sm text-coffee-500">
                <p>Ngân hàng: VietQR / Napas247</p>
                <p>Nội dung: {customerName} - Chill Cafe</p>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'success' && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-2xl font-bold text-coffee-800">Đặt hàng thành công!</h3>
              <p className="text-coffee-600">
                Cảm ơn <strong>{customerName}</strong> nha!<br/>
                Tiệm đã nhận đơn và đang chuẩn bị món.
              </p>
              <div className="bg-coffee-50 p-4 rounded-xl w-full text-left mt-4">
                <p className="text-sm text-coffee-500 mb-1">Thời gian đặt: {time.toLocaleTimeString()}</p>
                <p className="font-bold text-coffee-800">Số thứ tự: #{Math.floor(Math.random() * 90 + 10)}</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-coffee-100 shrink-0">
          {step === 'cart' && (
            <button 
              onClick={handleCheckout}
              className="w-full bg-coffee-600 hover:bg-coffee-700 text-white font-bold py-3 px-4 rounded-2xl shadow-md transition-colors flex justify-between items-center"
            >
              <span>Đặt hàng</span>
              <span>{formatPrice(total)}</span>
            </button>
          )}

          {step === 'details' && (
            <div className="flex gap-3">
              <button 
                onClick={() => setStep('cart')}
                className="flex-1 bg-coffee-100 text-coffee-800 font-bold py-3 rounded-2xl"
              >
                Quay lại
              </button>
              <button 
                onClick={handlePayment}
                className="flex-[2] bg-coffee-600 text-white font-bold py-3 rounded-2xl hover:bg-coffee-700 shadow-md"
              >
                Tiếp tục thanh toán
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="flex gap-3">
              <button 
                onClick={() => setStep('details')}
                className="flex-1 bg-coffee-100 text-coffee-800 font-bold py-3 rounded-2xl"
              >
                Quay lại
              </button>
              <button 
                onClick={finishOrder}
                className="flex-[2] bg-coffee-600 text-white font-bold py-3 rounded-2xl hover:bg-coffee-700 shadow-md"
              >
                Đã chuyển khoản
              </button>
            </div>
          )}
          
          {step === 'success' && (
             <button 
                onClick={closeAndReset}
                className="w-full bg-coffee-600 text-white font-bold py-3 rounded-2xl hover:bg-coffee-700 shadow-md"
              >
                Đặt món khác
              </button>
          )}
        </div>
      </div>
    </div>
  );
};