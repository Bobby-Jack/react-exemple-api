import React, { cache } from 'react'
import { useState, useEffect } from 'react'
import { getAllProductsData } from '../api/fetchApi'

export default function Home() {
    //ce state conserve les données 
    const [productData, setProductData] = useState(null)
    const [errorApi, setErrorApi] = useState(null)


    useEffect(() => {
      async function fetchDummyData(){
        try{
            const response = await getAllProductsData()
            setProductData(response.products)
      
        }catch(error){
            console.log(error.message);
            
            setErrorApi(error)
            console.log(errorApi);
            setProductData(null)
        }
    
        }

        fetchDummyData()
      

    
      
    }, [])
    
  return (
    <div>
    <h1>All products</h1>  
    {
        errorApi && <h2 style={{color : "red"}}>{errorApi.message}</h2>  
    }
    <div>
        {
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
