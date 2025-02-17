export const getAllProductsData = async () => {
    const response = await fetch("https://dummyjson.com/products");
  
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    console.log(response.json());
    
    return response.json();
  };