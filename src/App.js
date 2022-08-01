import { useEffect, useState } from 'react';

import LoupeIcon from './components/svg/LoupeIcon/LoupeIcon';
import ShipCards from './components/ShipCards/ShipCards';
import Loader from './components/Loader/Loader';

import uniqueKey from './helpers/uniqueKey';

import useDebounce from './hooks/useDebounce';

import './App.css';

const KEY_ENTER = 'Enter';
const TYPE_CLICK = 'click';

const fetchURL = 'https://swapi.dev/api/starships';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultShown, setResultShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredShips, setFilteredShips] = useState([]);
  const debounceSearch = useDebounce(fetchData, 300);

  async function fetchData(findingValue) {
    setIsLoading(true);
    try {
      const response = await fetch(fetchURL);
      const data = await response.json();

      const filteredData = data.results.filter(ship => ship.name.toLowerCase()
        .includes(findingValue ? findingValue.toLowerCase() : null));

      setFilteredShips(filteredData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeHandler = async (event) => {
    setInputValue(event.target.value);
    setResultShown(false);
    debounceSearch(event.target.value);
  };

  const showResult = (event) => event.key === KEY_ENTER || event.type === TYPE_CLICK
    ? setResultShown(true)
    : null;


  useEffect(() => {
    window.addEventListener('keydown', showResult);
  }, []);

  return (
    <div className='App'>
      <div className='wrapper'>
        <div className='search-section'>
          <span className='search-input-wrapper'>
            { isLoading ? <Loader /> : <LoupeIcon /> }
            <input value={ inputValue }
                   autoComplete='off'
                   onChange={ onChangeHandler }
                   className='search-input'
                   placeholder='Search...'
                   type='text' />
            { (!resultShown && !!filteredShips.length) && (
              <ul className='auto-complete'>
                { filteredShips.map(({ name }) => (
                  <li key={ uniqueKey(name) }
                      className='auto-complete-item'>
                    { name }
                  </li>)) }
              </ul>) }
          </span>
          <button className='search-btn' onClick={ showResult }>
            Search
          </button>
        </div>
        { resultShown && <ShipCards ships={ filteredShips } /> }
      </div>
    </div>
  );
};

export default App;
