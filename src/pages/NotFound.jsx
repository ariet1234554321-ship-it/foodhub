import { Link } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl text-primary mb-4 flex justify-center">
        <FaUtensils />
      </div>
      <h1 className="text-3xl font-bold text-dark mb-2">404 — Страница не найдена</h1>
      <p className="text-gray-500 mb-6">
        Похоже, такой страницы не существует. Но не переживайте — еда никуда не делась!
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primaryDark transition-colors inline-block"
      >
        На главную
      </Link>
    </div>
  );
}
