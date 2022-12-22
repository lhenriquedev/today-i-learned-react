import supabase from "./supabase";

import { useEffect, useState } from "react";
import { CategoryFilter } from "./components/CategoryFilter";
import { FactList } from "./components/FactList";
import { Header } from "./components/Header";
import { NewFactForm } from "./components/NewFactForm";
import { CATEGORIES } from "./data/facts";

import "./style.css";
import Loader from "./components/Loader";

function App() {
  const [facts, setFacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  async function loadFacts() {
    setIsLoading(true);

    let query = supabase.from("facts").select("*");

    if (currentCategory !== "all") {
      query = query.eq("category", currentCategory);
    }

    const { data: facts, error } = await query
      .order("votesInteresting", {
        ascending: false,
      })
      .limit(1000);

    if (!error) {
      setFacts(facts);
    } else {
      alert("There was a problem getting data");
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadFacts();
  }, [currentCategory]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter
          categories={CATEGORIES}
          setCurrentCategory={setCurrentCategory}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} categories={CATEGORIES} />
        )}
      </main>
    </>
  );
}

export default App;
