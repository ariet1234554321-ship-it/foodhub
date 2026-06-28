import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

export default function About() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-2">О нас</h1>
      <p className="text-gray-500 mb-8 max-w-2xl">
        FoodHub — это сервис доставки еды, который объединяет лучшие рестораны
        вашего города. Мы готовим с любовью и доставляем быстро, чтобы вы
        могли наслаждаться вкусной едой не выходя из дома.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-dark mb-4">Контакты</h2>
          <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
            <FaMapMarkerAlt className="text-primary text-xl" />
            <span>г. Алматы, ул. Абая 150</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
            <FaPhone className="text-primary text-xl" />
            <span>+7 (700) 123-45-67</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
            <FaEnvelope className="text-primary text-xl" />
            <span>support@foodhub.kz</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
            <FaClock className="text-primary text-xl" />
            <span>Ежедневно: 09:00 – 23:00</span>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-dark mb-4">Напишите нам</h2>
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl text-primary mb-3 flex justify-center">
                <FaCheckCircle />
              </div>
              <p className="text-gray-600 font-medium">
                Спасибо! Мы скоро с вами свяжемся.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Ваше имя"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                required
                rows="4"
                placeholder="Сообщение"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primaryDark transition-colors"
              >
                Отправить
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
