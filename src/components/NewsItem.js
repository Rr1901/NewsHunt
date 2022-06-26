import React from 'react'

const NewsItem=(props)=> {
//   Props ko change nhi kr skte
//   state k kr skte hai change
    //the below is destructuring
       let {title,description,newsUrl,imageUrl,author,date,source}=props;
        return (
            <div className='my-3'>
                
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}   <span 
                        style={{zIndex:1,marginLeft:"16%"}}className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">{source}</span>
                        </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toLocaleString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn  btn-sm btn-dark">Read More</a>
                    </div>
                </div>

            </div>
             )
      }

export default NewsItem
