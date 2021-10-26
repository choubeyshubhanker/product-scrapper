import React from 'react';

function Fetch({articles}) {
   

    return (
        
        <div className="row">
            {articles.slice(0, 9).map((article)=>{
              return (
                  <div className="col-10 col-md-4 my-3"  >
                  <div className="card" style={{"width": "18rem","height":"35rem", "overflow": "hidden"}}>
                        <img src={article.img} className="card-img-top" style={{"width": "100%","height":"15rem", "objectFit":"contain"}} alt="..."/>
                        <div className="card-body">
                            <p className="card-text">{article.title}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Price: {article.price}</li>
                            <li className="list-group-item">Seller: {article.seller}</li>
                        </ul>
                        <div className="card-body">
                            <a href={article.newUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Buy</a>
                        </div>
                    </div>
                </div>
              ) 
            })}
        </div>
    )
}

export default Fetch
