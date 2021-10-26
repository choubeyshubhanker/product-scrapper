import React, { useState, useEffect } from 'react'
import Fetch from './Fetch';

const Search = () => {
    const [searchText, setSearchText] = useState("");
    const[submitText, setSubmittext] = useState("");
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);




    const textChange = () =>{
        const query = searchText.trim().replace(/ /g,"+")
        setSubmittext(query);
        console.log("I m searched keyword" + query );
    }

  
    
     useEffect(() => {
        const getData = async () =>{
            const url = `http://localhost:8000/compare/${submitText}`
            const response =  await fetch(url, {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
            });
            setArticles(await response.json())
            setLoading(true)
            }
        getData()
        setLoading(false)
        // console.table(articles)
        // eslint-disable-next-line
    },[submitText])
    return (
        <>
        <div className="input-group mb-3">
            <input type="text" className="form-control"  placeholder="Search Here" onChange={(e)=>setSearchText(e.target.value)} />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2"  onClick={()=>textChange()}>Button</button>
        </div>
        {  !loading ? <h1>Loading</h1> : <Fetch articles={articles}/> }
        {/* {!submitText || !searchText ?(<h1>nothing found</h1>): <Fetch articles={articles}/>} */}
        </>
    )
}

export default Search
