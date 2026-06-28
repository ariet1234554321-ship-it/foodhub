import { Link } from "react-router-dom";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaCheckCircle,
  FaCcVisa,
  FaCcMastercard,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Cart() {
  const { items, removeFromCart, changeQty, totalPrice, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleOrder = (e) => {
    e.preventDefault();
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl text-primary mb-4 flex justify-center">
          <FaCheckCircle />
        </div>
        <h1 className="text-3xl font-bold text-dark mb-2">Спасибо за заказ!</h1>
        <p className="text-gray-500 mb-6">
          Ваш заказ принят и скоро будет доставлен. Среднее время доставки — 30 минут.
        </p>
        <Link
          to="/menu"
          className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primaryDark transition-colors inline-block"
        >
          Вернуться в меню
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-dark mb-2">Корзина пуста</h1>
        <p className="text-gray-500 mb-6">
          Добавьте блюда из меню, чтобы сделать заказ.
        </p>
        <Link
          to="/menu"
          className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primaryDark transition-colors inline-block"
        >
          Перейти в меню
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-6">Корзина</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.idMeal}
            className="bg-white rounded-2xl shadow p-4 flex items-center gap-4"
          >
            <img
              src={item.strMealThumb}
              alt={item.strMeal}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-dark">{item.strMeal}</h3>
              <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeQty(item.idMeal, -1)}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 transition-colors"
              >
                <FaMinus className="text-sm" />
              </button>
              <span className="w-8 text-center font-medium">{item.qty}</span>
              <button
                onClick={() => changeQty(item.idMeal, 1)}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 transition-colors"
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.idMeal)}
              className="text-red-400 hover:text-red-600 transition-colors p-2"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between text-lg mb-2">
          <span className="text-gray-500">Итого:</span>
          <span className="font-bold text-dark">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg mb-4">
          <span className="text-gray-500">Доставка:</span>
          <span className="font-bold text-dark">$2.99</span>
        </div>
        <div className="flex justify-between text-xl border-t pt-4 mb-6">
          <span className="font-bold">К оплате:</span>
          <span className="font-bold text-primary">
            ${(totalPrice + 2.99).toFixed(2)}
          </span>
        </div>

        
        <div className="mb-6">
          <p className="font-semibold text-dark mb-3">Способ оплаты</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium transition-colors ${
                paymentMethod === "card"
                  ? "border-primary bg-orange-50 text-primary"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <FaCcVisa className="text-xl" />
              <FaCcMastercard className="text-xl" />
              Картой
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium transition-colors ${
                paymentMethod === "cash"
                  ? "border-primary bg-orange-50 text-primary"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <FaMoneyBillWave className="text-xl" />
              Наличными
            </button>
          </div>
        </div>

        <form onSubmit={handleOrder} className="space-y-3">
          <input
            type="text"
            required
            placeholder="Ваше имя"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            required
            placeholder="Адрес доставки"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="tel"
            required
            placeholder="Телефон"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {paymentMethod === "card" && (
            <div className="space-y-3 pt-2 border-t">
              <input
                type="text"
                required
                placeholder="Номер карты"
                maxLength={19}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  required
                  placeholder="ММ/ГГ"
                  maxLength={5}
                  className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  required
                  placeholder="CVV"
                  maxLength={3}
                  className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primaryDark transition-colors"
          >
            {paymentMethod === "card" ? "Оплатить и оформить заказ" : "Оформить заказ"}
          </button>
        </form>
      </div>
    </div>
  );
}
