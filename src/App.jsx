import { useState } from "react";
import DigitalMenu from "./components/DigitalMenu";
import "./DigitalMenu.css";

function App() {

  const menuItems = [
    {
      id: 1,
      name: "Cappuccino",
      category: "Coffee",
      description: "Rich espresso with steamed milk foam",
      price: 80,
      image_url: "https://source.unsplash.com/400x300/?cappuccino",
      type: "veg",
      badge: "Bestseller",
      available: true
    },
    {
      id: 2,
      name: "Cold Coffee",
      category: "Coffee",
      description: "Chilled coffee blended with milk",
      price: 100,
      image_url: "https://source.unsplash.com/400x300/?cold-coffee",
      type: "veg",
      badge: "Hot",
      available: true
    },
    {
      id: 3,
      name: "Veg Burger",
      category: "Snacks",
      description: "Crispy veg patty with fresh veggies",
      price: 120,
      image_url: "https://source.unsplash.com/400x300/?burger",
      type: "veg",
      badge: "New",
      available: true
    },
    {
      id: 4,
      name: "Chicken Burger",
      category: "Snacks",
      description: "Juicy grilled chicken burger",
      price: 150,
      image_url: "https://source.unsplash.com/400x300/?chicken-burger",
      type: "non-veg",
      badge: "Bestseller",
      available: true
    },
    {
      id: 5,
      name: "French Fries",
      category: "Snacks",
      description: "Crispy golden fries",
      price: 90,
      image_url: "https://source.unsplash.com/400x300/?fries",
      type: "veg",
      badge: "",
      available: true
    },
    {
      id: 6,
      name: "Chocolate Cake",
      category: "Dessert",
      description: "Soft rich chocolate cake",
      price: 180,
      image_url: "https://source.unsplash.com/400x300/?cake",
      type: "veg",
      badge: "Hot",
      available: true
    },
    {
      id: 7,
      name: "Ice Cream",
      category: "Dessert",
      description: "Creamy vanilla ice cream",
      price: 120,
      image_url: "https://source.unsplash.com/400x300/?ice-cream",
      type: "veg",
      badge: "",
      available: true
    },
    {
      id: 8,
      name: "Masala Tea",
      category: "Tea",
      description: "Indian spiced tea",
      price: 30,
      image_url: "https://source.unsplash.com/400x300/?tea",
      type: "veg",
      badge: "",
      available: true
    },
    {
      id: 9,
      name: "Green Tea",
      category: "Tea",
      description: "Healthy detox tea",
      price: 40,
      image_url: "https://source.unsplash.com/400x300/?green-tea",
      type: "veg",
      badge: "New",
      available: true
    },
    {
      id: 10,
      name: "Espresso",
      category: "Coffee",
      description: "Strong black coffee shot",
      price: 60,
      image_url: "https://source.unsplash.com/400x300/?espresso",
      type: "veg",
      badge: "",
      available: true
    }
  ];

  return (
    <div>
      <DigitalMenu menuItems={menuItems} />
    </div>
  );
}

export default App;