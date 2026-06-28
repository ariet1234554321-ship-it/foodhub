import { useState } from "react";
import { FaCartPlus, FaEllipsisH } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import MealModal from "./MealModal";

export default function MealCard({ meal }) {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-md shadow overflow-hidden flex flex-col hover:shadow-md transition-shadow">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-44 object-cover cursor-pointer"
          loading="lazy"
          onClick={() => setShowModal(true)}
        />
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className="font-semibold text-dark text-lg line-clamp-1 cursor-pointer hover:text-primary transition-colors"
              onClick={() => setShowModal(true)}
            >
              {meal.strMeal}
            </h3>
            <button
              onClick={() => setShowModal(true)}
              className="text-gray-400 hover:text-primary transition-colors shrink-0 p-1"
              title="Подробнее"
            >
              <FaEllipsisH />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-3">{meal.strCategory || "Блюдо"}</p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-primary font-bold text-lg">
              ${meal.price.toFixed(2)}
            </span>
            <button
              onClick={() => addToCart(meal)}
              className="bg-primary text-white px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-primaryDark transition-colors"
            >
              <FaCartPlus />
              В корзину
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <MealModal
          meal={meal}
          displayName={meal.strMeal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
