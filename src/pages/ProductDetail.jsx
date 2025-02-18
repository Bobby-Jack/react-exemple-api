import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOneProductById } from '../api/fetchApi'
import DefaultTemplate from '../templates/DefaultTemplate'
import AbortController from 'abort-controller'
export default function ProductDetail() {
    const {id} = useParams()
    const [productData, setProductData] = useState(null)
    const [errorApi, setErrorApi] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        async function fetchingData() {
            try{
                const reponse = await getOneProductById(id)
                setProductData(reponse)
                console.log(reponse);
                controller.signal
            }catch(e){
                console.log(e);
                setErrorApi(e)
            }
        }
        fetchingData()
    
      return () => {
        controller.abort()
      }
    }, [])
    

  return (
    <DefaultTemplate>
        <Link to={"/"}>return to Home</Link>
        {
            productData ? 
            <>
            <h1>{productData.title}</h1>
            <img src={productData.images[0]} alt="" />
            <span>{productData.description}</span>
            </>
            :
            errorApi ?
            <h1>{errorApi.message}</h1>
            :
            <h1>Loading...</h1>
        }
    </DefaultTemplate>
  )
}
