import logo from './logo.svg';
import './App.css';
import Cocktail from "./components/Cocktail";
import SearchBar from "./components/SearchBar";
import React, {useState} from "react";


function App() {

  //accessing the searches and passing them down to cocktail element
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");

  // setInterval(() => {
  //   alert("It's always a good idea to have some fun!");
  // },60000)

  return (
    <div className="body">
      <h1>Random Cocktail</h1>
      <SearchBar setSearch={setSearch} setResult={setResult} search={search} />
      <Cocktail result={result} />
    </div>
  );
}

export default App;
