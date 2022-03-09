import React, {useEffect, useState} from "react";

function Cocktail() {

    const [cocktail, setCocktail] = useState(null);
    const [cocktailLoaded, setCocktailLoaded] = useState(false);
    const [instructions, setInstructions] = useState("");

    const loadRandomCocktail = async () => {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");

        const data = await response.json();
        
        console.log(data.drinks[0]);

        data && setCocktail(data.drinks[0]);
        setCocktailLoaded(true);
      }
    
    useEffect(() => {
      loadRandomCocktail();
    }, []);


  
    return (
        <>
        {cocktailLoaded ?
        (<>
        <h2>{cocktail.strDrink}</h2>
        <img src={cocktail.strDrinkThumb} alt={"thumb of a " + cocktail.strDrink} style={{width: 300 + "px"}} />
        <p><strong>Alcoholic: </strong>{cocktail.strAlcoholic}</p>
        <p><strong>Category: </strong>{cocktail.strCategory}</p>
        <p><strong>Instructions: </strong>{cocktail[`strInstructions${instructions}`]}</p>
        <button onClick={() => setInstructions("")}>EN</button>
        <button onClick={() => setInstructions("DE")}>DE</button>
        <button onClick={() => setInstructions("ES")}>ES</button>
        <button onClick={() => setInstructions("FR")}>FR</button>
        <button onClick={() => setInstructions("IT")}>IT</button>
        </>) :
        <p>Loading</p>      
        }
        </>

    );
}

export default Cocktail;