import supabase from '../supabase';
import CATEGORIES from '../data';
import { useState } from 'react';
import { FactData } from '../App';

interface FactListProps {
  factData: FactData[];
  setFactData: Function;
}

interface FactProps {
  fact: FactData;
  setFactData: Function;
}

type VoteType = 'votesInteresting' | 'votesMindblowing' | 'votesFalse';

const FactList = ({ factData, setFactData }: FactListProps) => {
  if (factData.length === 0)
    return (
      <p className="message">
        There are no facts in this category yet. Add the first one!
      </p>
    );

  return (
    <section>
      {' '}
      <ul className="facts-list">
        {factData.map(fact => (
          <Fact setFactData={setFactData} key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>There are {factData.length} facts in the database, add your own!</p>
    </section>
  );
};

const Fact = ({ fact, setFactData }: FactProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleVote = async (
    id: number,
    voteType: VoteType,
    currentVotes: number
  ) => {
    setIsUpdating(true);
    const { data, error } = await supabase
      .from('facts')
      .update({ [voteType]: currentVotes + 1 })
      .eq('id', id)
      .select();
    if (!error) {
      setFactData((facts: FactData[]) =>
        facts.map(f => (f.id === data[0].id ? (f = data[0]) : f))
      );
    } else alert('There was a problem sending the data.');
    setIsUpdating(false);
  };

  return (
    <li className="fact">
      <p>
        {(fact.votesFalse ? fact.votesFalse : 0) > 4 ? (
          <span className="disputed">[⛔️ DISPUTED]</span>
        ) : null}
        {fact.text}
        <a
          className="source"
          href={fact.source ? fact.source : ''}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(
            category => category.name === fact.category
          )?.color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() =>
            handleVote(
              fact.id,
              'votesInteresting',
              fact.votesInteresting ? fact.votesInteresting : 0
            )
          }
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() =>
            handleVote(
              fact.id,
              'votesMindblowing',
              fact.votesMindblowing ? fact.votesMindblowing : 0
            )
          }
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button
          onClick={() =>
            handleVote(
              fact.id,
              'votesFalse',
              fact.votesFalse ? fact.votesFalse : 0
            )
          }
          disabled={isUpdating}
        >
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
};

export default FactList;
