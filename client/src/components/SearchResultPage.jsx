import React from 'react'
import SearchForm from './searchForm/SearchForm'
import api from '../api/axios'
import Header from './Header'
import BusList from './bus/BusList'
import '../styles/SearchForm.css'

function SearchResultPage() {
  
  const [trips, setTrips] = React.useState(null)

  const searchHandler = async ({from, to, date}) => {
    const res = await api.get("/search", {params: {source: from, destination: to, date: date}});
    if (res.data != null){
      setTrips(res.data);
    }
    else {
      setTrips([])
    }
  }
  return (
    <div className='search-result-page'>
        <Header />
        <SearchForm onSearch={searchHandler}/>
        <BusList trips={trips}/>
    </div>
  )
}

export default SearchResultPage