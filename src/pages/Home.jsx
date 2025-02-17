import React, { cache } from 'react'
import { useState, useEffect } from 'react'
import { getAllProductsData } from '../api/fetchApi'

export default function Home() {
    //ce state conserve les données de tout les produits
    const [productData, setProductData] = useState(null)
    //ce state conserve une erreur survenu lors de la requête API
    const [errorApi, setErrorApi] = useState(null)

    //le useEffect aura pour but de lancé la requête au chargement du composant 
    useEffect(() => {
      //cette fonction asynchrone s'occupe de lancer la fonction getAllProductsData
      // et de stocker le résultat dans productData ou errorApi (en cas de problème)
      async function fetchDummyData(){
        try{
            const response = await getAllProductsData()
            setProductData(response.products)
      
        }catch(error){
            console.log(error.message);
            setProductData(null)
        }
    
        }

        fetchDummyData()
      
    }, [])
    
  return (
    <div>
    <h1>All products</h1>  
    {
        //affichage conditionel du message d'erreur
        errorApi && <h2 style={{color : "red"}}>{errorApi.message}</h2>  
    }
    <div>
        {
            //affichage conditionelle des données une fois qu'elles sont chargées
            productData ?
            <ul>
            {
                productData.map((data, key)=>{
                    return(
                        <li key={key}>{data.title}</li>
                    )
                })
            }
        </ul>
        :
        <h2>Loading...</h2>
        }
    </div>
    </div>
  )
}
