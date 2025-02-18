
//cette fonction lance une requête API et retourne la réponse sous format json

export const getAllProductsData = async () => {
    //fetch permet d'envoyer une requête (GET par défaut)
    //elle est await car son résultat provient d'internet, une source extérieur au programme
    const response = await fetch("https://dummyjson.com/products", );
    //si la réponse est mauvaise une erreur est lancé (elle sera catché par le try dans Home.jsx)
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    
    return response.json();
  };

  export async function getOneProductById(id){
    const response = await fetch("https://dummyjson.com/products/"+id);
    //si la réponse est mauvaise une erreur est lancé (elle sera catché par le try dans Home.jsx)
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    
    return response.json();
  }
  
  export async function getProductsFromSearch(searchToken){
    const response = await fetch('https://dummyjson.com/products/search?q='+searchToken);
    //si la réponse est mauvaise une erreur est lancé (elle sera catché par le try dans Home.jsx)
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    
    return response.json();
  }
  