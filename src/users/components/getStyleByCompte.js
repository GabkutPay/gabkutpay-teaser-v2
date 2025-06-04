// src/utils/getStyleByCompte.js

export const getStyleByCompte = (type) => {
  switch (type) {
    case "VIP":
      return {
        background: "bg-gradient-to-r from-yellow-400 to-yellow-700 text-black",
        badge: "bg-yellow-600 text-white",
      };
    case "Pro":
      return {
        background: "bg-blue-900 text-white",
        badge: "bg-blue-800 text-white",
      };
    case "Élève":
      return {
        background: "bg-green-50 text-black",
        badge: "bg-green-600 text-white",
      };
    case "Diaspora":
      return {
        background: "bg-purple-50 text-black",
        badge: "bg-purple-700 text-white",
      };
    case "Institutionnel":
      return {
        background: "bg-gray-900 text-white",
        badge: "bg-gray-800 text-white",
      };
    default:
      return {
        background: "bg-white text-black",
        badge: "bg-gray-400 text-white",
      };
  }
};
