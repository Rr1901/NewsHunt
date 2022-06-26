import React, { useEffect ,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import particle from './particlesjs-config.json'


const News=(props)=> {
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    
    const capitalizeFirstLetter=(string)=>{
          return string.charAt(0).toUpperCase()+string.slice(1);
    }
    
    
    
    const updateNews= async()=>{
        props.setProgress(0);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true);
        props.setProgress(30);
        let data=await fetch(url);
        props.setProgress(60);
        let parsedData=await data.json();
        setarticles(parsedData.articles);
        setloading(false)
        settotalResults(parsedData.totalResults)
        
        props.setProgress(100);
        
    }
    // Use effect in place of componentdidmount
    useEffect(() => {
        document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`;
      updateNews();
  }, [])
   


   const handlePrevClick = async ()=>{
       setpage(page-1)
    updateNews();
}

   
   const handleNextClick = async ()=>{
    setpage(page+1)
    updateNews();
}

const fetchMoreData = async() => {
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
//    setState({loading:true}); vrna upr taskbar ke niche vala spinner bhi dikhne lagega
   let data=await fetch(url);
   let parsedData=await data.json();
   setarticles(articles.concat(parsedData.articles));
   setloading(false)
   settotalResults(parsedData.totalResults)
 
  };


  

        return (
            <>
                <h1 className='text-center' style={{margin:'35px 0px ',marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                { loading && <Spinner/>}


                <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length!==totalResults}
                        loader={<Spinner/>}
                >

                    <div className="container" style={{background:particle}}>
                     <div className="row">
                         
                        {articles.map((element)=>{
                            return  <div className="col-md-4" key={element.url}>
                                <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAm6dU5JsOoX02Rm2pRIq0hW6uIQ8VC8h42w&usqp=CAU"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                     </div>
                    </div>
                </InfiniteScroll>

               {/* This below div is for next and previous page  */}
                {/* <div className="container d-flex justify-content-between ">
                <button type="button" disabled={state.page<=1} className="btn btn-success" onClick={handlePrevClick}>&larr;Previous</button>
                <button type="button" disabled={(Math.ceil(state.totalResults/props.pageSize)<state.page+1)} className="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    
}


News.defaultProps ={
    country:'in',
    pageSize: 8,
    category:'general'
}
News.propTypes ={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
}

export default News
