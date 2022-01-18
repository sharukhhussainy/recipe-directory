import RecipeList from "../../components/RecipesList/RecipeList";
import useFetch from "../../hooks/useFetch";
import "./Home.css";

export default function Home() {
  const {
    data: recipes,
    isPending,
    error,
  } = useFetch("http://localhost:3000/recipes");
  return (
    <div className="home">
      {error && <div className="error">{error}</div>}
      {isPending && <div className="loading">Loading...</div>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
}
