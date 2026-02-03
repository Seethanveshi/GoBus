import React, { useState, useEffect } from 'react'
import BusList from '../bus/BusList'
import "../../styles/SearchForm.css";
import { useNavigate, useSearchParams } from 'react-router'
import SearchForm from '../searchForm/SearchForm'
import api from '../../api/axios'

function SearchResultPage() {
  
  const [trips, setTrips] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const from = searchParams.get('source') || '';
  const to = searchParams.get('destination') || '';
  const date = searchParams.get('date') || '';

  useEffect(() => {
    if (from && to && date) {
      fetchTrips();
    }
  }, [from, to, date]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await api.get('/trips', {
        params: { source: from, destination: to, date: date },
      });

      setTrips(res.data || []);
    } catch (err) {
      console.error(err);
      setTrips([]);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <div className='search-result-page'>
        <SearchForm />
        <BusList trips={trips} loading={loading} />
    </div>
  )
}

export default SearchResultPage