import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const { postData, data } = useFetch("http://localhost:3000/recipes", "POST");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIngredient = {
      title: title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };
    postData(newIngredient);
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  const handleAdd = (e) => {
    e.preventDefault();
    console.log("add");
    const newIng = ingredientName.trim();
    if (newIng && !ingredients.includes(newIng)) {
      setIngredients((prevIngredients) => [...prevIngredients, newIng]);
    }
    setIngredientName("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients: </span>
          <div className="ingredients">
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
          <p>
            Current Ingredients:
            {ingredients && ingredients.toString()}
          </p>
        </label>

        <label>
          <span>Recipe Method</span>
          <textarea
            type="text"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
        </label>
        <button className="btn">submit</button>
      </form>
    </div>
  );
}
