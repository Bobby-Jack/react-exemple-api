import React, { useState } from 'react'
import { useEffect } from 'react'
import { getProductsFromSearch } from '../api/fetchApi'
import { useParams } from 'react-router-dom'
import DefaultTemplate from '../templates/DefaultTemplate'
import AbortController from 'abort-controller'

export default function SearchResult() {
    const [searchData, setSearchData] = useState(null)
    const { token } = useParams()
    useEffect(() => {
        const controller = new AbortController()
        async function fetchingData() {
            try {
                
                const response = await getProductsFromSearch(token)
                setSearchData(response.products)
                controller.signal
              
            }
            catch (e) {
                console.log(e);
                if (e.name == "AbortError") {
                    console.log("Aborted");
                    
                }
            }
        }

        fetchingData()

        return () => {
            controller.abort()
        }
    }, [token])



    return (
        <DefaultTemplate>
            {
                searchData ?
                    <>
                        {
                            searchData.length == 0 ?
                            <h1>No product found for {token}</h1>
                            :
                            <ul>
                                {
                                    searchData.map((data, key) => {
                                        return (
                                            <li key={key}>{data.title}</li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </>
                    :
                    <h2>loading ...</h2>
            }
        </DefaultTemplate>
    )
}
