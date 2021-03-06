import React, {useEffect, useState} from "react";

function Cocktail({result}) {

    //storing cocktail and checking, whether the data have been fetched
    const [cocktail, setCocktail] = useState(null);
    const [cocktailLoaded, setCocktailLoaded] = useState(false);

    //storing instructions
    const [instructions, setInstructions] = useState("");

    //storing ingredients and checking whether the data have been fetched
    const [ingredient, setIngredient] = useState([]);
    const [ingredientLoaded, setIngredientLoaded] = useState(false);

    //function, that loads a random cocktail and assigns it to a "cocktail" variable
    const loadRandomCocktail = async () => {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");

        const data = await response.json();
        
        // console.log(data.drinks[0]);

        data && setCocktail(data.drinks[0]);
        setCocktailLoaded(true);
      }

    //function, that loads the searched cocktail and assign it to a "cocktail" variable
    const loadSearchedCocktail = async (query) => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();

      // console.log(data);

      data && setCocktail(data.drinks[0]);
      setCocktailLoaded(true);
    }

    //function, that loads the ingredients
    const loadSearchedIngredient = async (query) => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`);
      const data = await response.json();

      console.log(data.drinks);

      data && setIngredient(data.drinks);
      setIngredientLoaded(true);
    } 
    
    
    useEffect(() => {
      //if the search is empty, the random cocktail should be fetched, if there is something, the searched cocktail should be fetched
      if(result === "") {
        loadRandomCocktail();
      } else {
        loadSearchedCocktail(result);
      }

    }, [result]);


  
    return (
        <>
        <button onClick={() => loadRandomCocktail()}>Random cocktail</button>
        {/* checking, whether the cocktail data are loaded, and if yes, displaying all necessary info */}
        {cocktailLoaded ?
        (<>
        <h2>{cocktail.strDrink}</h2>
        <img src={cocktail.strDrinkThumb} alt={"thumb of a " + cocktail.strDrink} style={{width: 300 + "px"}} />
        <p><strong>Alcoholic: </strong>{cocktail.strAlcoholic}</p>
        <p><strong>Category: </strong>{cocktail.strCategory}</p>
        <p><strong>Glass: </strong>{cocktail.strGlass}</p>
        <p><strong>Instructions: </strong>{cocktail[`strInstructions${instructions}`]}</p>
        {/* buttons, that change the language of instructions  */}
        <button onClick={() => setInstructions("")}>EN</button>
        <button onClick={() => setInstructions("DE")}>DE</button>
        <button onClick={() => setInstructions("ES")}>ES</button>
        <button onClick={() => setInstructions("FR")}>FR</button>
        <button onClick={() => setInstructions("IT")}>IT</button>
        <ul>
          {/* list of all keys, that include "strIngredient", and listing them unless the have a null or empty value  */}
          {Object.keys(cocktail).filter((key) => key.includes("strIngredient")).map((key, index) => {
            if(cocktail[key] !== null && cocktail[key] !== "") {
              return <li onClick={() => loadSearchedIngredient(cocktail[key])} key={index}>{cocktail[key]}</li>
            }
          }  
          )}
        </ul>
       {/* checking, whether the cocktail data are loaded, and if yes, displaying all necessary info */}
        {!ingredientLoaded ?
        null :
        (<>
        <button onClick={() => setIngredientLoaded(false)}>Hide</button> <br />
        <div style={{display: "flex", flexWrap: "wrap", gap: 10 + "px"}}>
        {ingredient.map((drink, index) => (
          <div key={index}>
            <h5>{drink.strDrink}</h5>
            <img style={{width: 100 + "px"}} src={drink.strDrinkThumb} alt={"image of " + drink.strDrink} />
          </div>
        ))
        }</div></>)
        }
        </>) :
        <p>Loading</p>      
        }
        </>

    );
}

export default Cocktail;