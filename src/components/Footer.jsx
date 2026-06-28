import { FaInstagram, FaFacebook, FaTwitter, FaUtensils } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-cream mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-xl font-extrabold text-primary mb-2">
            <FaUtensils />
            FoodHub
          </div>
          <p className="text-sm text-gray-300">
            Вкусная еда с доставкой прямо к вашей двери. Быстро, свежо, аппетитно.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Ссылки</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Главная</li>
            <li>Меню</li>
            <li>О нас</li>
            <li>Корзина</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Мы в соцсетях</h4>
          <div className="flex gap-4 text-2xl">
            <FaInstagram className="hover:text-primary cursor-pointer transition-colors" />
            <FaFacebook className="hover:text-primary cursor-pointer transition-colors" />
            <FaTwitter className="hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-400 py-4 border-t border-gray-700">
        © 2026 FoodHub. Все права защищены.
      </div>
    </footer>
  );
}
