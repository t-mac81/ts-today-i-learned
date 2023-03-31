import { useEffect, useState } from 'react';
import CategoryFilter from './components/CategoryFilter';
import FactList from './components/FactList';
import Header from './components/Header';
import NewFactForm from './components/NewFactForm';
import './style.css';
import supabase from './supabase';

export type Categories =
  | 'all'
  | 'technology'
  | 'science'
  | 'finance'
  | 'society'
  | 'entertainment'
  | 'health'
  | 'history'
  | 'news';

export interface FactData {
  id: number;
  text: string | null;
  source: string | null;
  category: string | null;
  votesInteresting: number | null;
  votesMindblowing: number | null;
  votesFalse: number | null;
  created_at: string | null;
}

const Loader = () => {
  return <p className="message">Loading...</p>;
};

const App: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [factData, setFactData] = useState<FactData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Categories>('all');

  useEffect(() => {
    const getData = async function () {
      setIsLoading(true);

      let query = supabase.from('facts').select('*');

      if (currentCategory !== 'all')
        query = query.eq('category', currentCategory);

      let { data, error } = await query.order('votesInteresting', {
        ascending: false,
      });
      console.log(data);
      if (!error && data) setFactData(data);
      else alert('There was a problem getting data...');
      setIsLoading(false);
    };
    getData();
  }, [currentCategory]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFactData={setFactData} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList factData={factData} setFactData={setFactData} />
        )}
      </main>
    </>
  );
};

export default App;
