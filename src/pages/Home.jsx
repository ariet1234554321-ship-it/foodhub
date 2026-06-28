import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaArrowRight,
  FaTruck,
  FaLeaf,
  FaClock,
  FaDrumstickBite,
  FaFish,
  FaCarrot,
  FaIceCream,
  FaPizzaSlice,
  FaHamburger,
} from "react-icons/fa";
import MealCard from "../components/MealCard";

const CATEGORIES = [
  { key: "Beef", label: "Говядина", icon: <FaHamburger /> },
  { key: "Chicken", label: "Курица", icon: <FaDrumstickBite /> },
  { key: "Seafood", label: "Морепродукты", icon: <FaFish /> },
  { key: "Vegetarian", label: "Вегетарианское", icon: <FaCarrot /> },
  { key: "Dessert", label: "Десерты", icon: <FaIceCream /> },
  { key: "Pasta", label: "Паста", icon: <FaPizzaSlice /> },
];

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?f=c"
        );
        const meals = (res.data.meals || []).slice(0, 4).map((m) => ({
          ...m,
          price: (5 + (parseInt(m.idMeal) % 15) + 0.99),
        }));
        setPopular(meals);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  return (
    <div>
      
      <section className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Вкусная еда <br /> с доставкой за 30 минут
            </h1>
            <p className="text-lg mb-6 text-white/90">
              Закажите любимые блюда из нашего меню — свежо, быстро и
              с любовью приготовлено.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-md hover:bg-cream transition-colors"
            >
              Смотреть меню <FaArrowRight />
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
            alt="Еда"
            className="flex-1 rounded-md shadow w-full max-w-md object-cover h-72"
          />
        </div>
      </section>

      
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <FaTruck />, title: "Быстрая доставка", text: "Доставим заказ в течение 30 минут" },
          { icon: <FaLeaf />, title: "Свежие продукты", text: "Только качественные и свежие ингредиенты" },
          { icon: <FaClock />, title: "Работаем 24/7", text: "Заказывайте в любое время дня и ночи" },
        ].map((f, i) => (
          <div key={i} className="bg-white rounded-md shadow p-6 text-center">
            <div className="text-primary text-3xl mb-3 flex justify-center">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.text}</p>
          </div>
        ))}
      </section>

      
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-dark mb-6">Категории</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              to={`/menu?category=${c.key}`}
              className="bg-white rounded-md shadow p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-primary text-3xl mb-2 flex justify-center">
                {c.icon}
              </div>
              <div className="font-medium text-sm">{c.label}</div>
            </Link>
          ))}
        </div>
      </section>

      
      <section className="max-w-6xl mx-auto px-4 py-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark">Популярные блюда</h2>
          <Link to="/menu" className="text-primary font-medium flex items-center gap-1 hover:underline">
            Всё меню <FaArrowRight />
          </Link>
        </div>
        {loading ? (
          <p className="text-gray-500">Загрузка...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {popular.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
