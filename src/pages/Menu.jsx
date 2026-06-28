import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import MealCard from "../components/MealCard";

const CATEGORIES = [
  { key: "All", label: "Все" },
  { key: "Beef", label: "Говядина" },
  { key: "Chicken", label: "Курица" },
  { key: "Seafood", label: "Морепродукты" },
  { key: "Vegetarian", label: "Вегетарианское" },
  { key: "Dessert", label: "Десерты" },
  { key: "Pasta", label: "Паста" },
  { key: "Breakfast", label: "Завтрак" },
];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        let url;
        if (category === "All") {
          url = "https://www.themealdb.com/api/json/v1/1/search.php?f=c";
        } else {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        }
        const res = await axios.get(url);
        const data = res.data.meals || [];
        const withPrice = data.map((m) => ({
          ...m,
          price: 5 + (parseInt(m.idMeal) % 15) + 0.99,
        }));
        setMeals(withPrice);
      } catch (e) {
        console.error(e);
        setError("Не удалось загрузить меню. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [category]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filtered = meals.filter((m) =>
    m.strMeal.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-2">Наше меню</h1>
      <p className="text-gray-500 mb-6">
        Выберите категорию и найдите блюдо по вкусу
      </p>

      
      <div className="relative mb-6 max-w-md">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск блюда..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleCategoryChange(cat.key)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors ${
              category === cat.key
                ? "bg-primary text-white"
                : "bg-white text-dark hover:bg-orange-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      
      {loading && <p className="text-gray-500 text-center py-10">Загрузка блюд...</p>}
      {error && <p className="text-red-500 text-center py-10">{error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-gray-500 text-center py-10">Блюда не найдены.</p>
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
