import { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes, FaCartPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function MealModal({ meal, displayName, onClose }) {
  const { addToCart } = useCart();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        setDetails(res.data.meals ? res.data.meals[0] : null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [meal.idMeal]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const instructions = details?.strInstructions
    ? details.strInstructions.length > 700
      ? details.strInstructions.slice(0, 700) + "…"
      : details.strInstructions
    : "";

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow z-10"
        >
          <FaTimes />
        </button>

        <img
          src={meal.strMealThumb}
          alt={displayName}
          className="w-full h-56 object-cover rounded-t-2xl"
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold text-dark mb-1">{displayName}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {meal.strCategory || "Блюдо"}
            {details?.strArea ? ` · ${details.strArea}` : ""}
          </p>

          {loading ? (
            <p className="text-gray-500">Загрузка описания...</p>
          ) : instructions ? (
            <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line">
              {instructions}
            </p>
          ) : (
            <p className="text-gray-500 mb-6">Описание недоступно.</p>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-primary font-bold text-2xl">
              ${meal.price.toFixed(2)}
            </span>
            <button
              onClick={() => {
                addToCart(meal);
                onClose();
              }}
              className="bg-primary text-white px-5 py-3 rounded-xl flex items-center gap-2 font-medium hover:bg-primaryDark transition-colors"
            >
              <FaCartPlus />
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
