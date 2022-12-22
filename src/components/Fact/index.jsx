import { useState } from "react";
import supabase from "../../supabase";

export function Fact({ fact, setFacts, categories }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;
  const categoryBg = categories.find((cat) => cat.name === fact.category).color;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({
        [columnName]: fact[columnName] + 1,
      })
      .eq("id", fact.id)
      .select();

    setIsUpdating(false);

    if (!error) {
      setFacts((state) =>
        state.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
    }
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[DISPUTED]</span> : null}
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span className="tag" style={{ background: categoryBg }}>
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍{fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯{fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️{fact.votesFalse}
        </button>
      </div>
    </li>
  );
}
