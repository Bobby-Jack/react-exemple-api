import React, { cache } from 'react'
import { useState, useEffect } from 'react'
import { getAllProductsData } from '../api/fetchApi'
import "./Home.css"
import { Link } from 'react-router-dom'
import DefaultTemplate from '../templates/DefaultTemplate'
import AbortController from 'abort-controller'
export default function Home() {
    //ce state conserve les données de tout les produits
    const [productData, setProductData] = useState(null)
    //ce state conserve une erreur survenu lors de la requête API
    const [errorApi, setErrorApi] = useState(null)

    const [targetProduct, setTargetProduct] = useState(null)

    const [searchValue, setSearchValue] = useState("")

    //le useEffect aura pour but de lancé la requête au chargement du composant 
    useEffect(() => {
        const controller = new AbortController()
      //cette fonction asynchrone s'occupe de lancer la fonction getAllProductsData
      // et de stocker le résultat dans productData ou errorApi (en cas de problème)
      async function fetchDummyData(){
        try{
            const response = await getAllProductsData()
            setProductData(response.products)
            controller.signal
      
        }catch(error){
            console.log(error.message);
            setErrorApi(error)
            setProductData(null)

            let popupError = document.querySelector('.popupError')
            let pop = document.createElement('div')
            pop.textContent = error.message
            pop.classList.add("pop")
            popupError.appendChild(pop)
            setTimeout(() => {
                pop.remove()
            }, 5000);
        }
    
        }

        fetchDummyData()

        return ()=>{
            controller.abort()
        }
      
    }, [])
    
  return (
    <DefaultTemplate>
    <div className='popupError'>

    </div>
    <h1>All products</h1>  
    <input type="text" onChange={(e)=>{setSearchValue(e.target.value)}} />
    <h2>search {searchValue}</h2>
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
                    if(data.title.toLowerCase().includes(searchValue.toLowerCase())){
                        return(
                        <li onClick={()=>{setTargetProduct(data)}} key={key}>{data.title} <Link to={"/product/"+data.id}>see more</Link></li>
                        )
                    }
                })
            }
        </ul>
        :
        <h2>Loading...</h2>
        }
    </div>
    {
        targetProduct &&
        <div className="infoBox">
            <img src={targetProduct.images[0]} alt="" />
            <span>{targetProduct.price} €</span>
            <span>{targetProduct.description}</span>
        </div>
    }
    </DefaultTemplate>
  )
}
