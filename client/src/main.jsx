import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import MainLayout from './MainLayout.jsx'
import SearchResultPage from './components/SearchResultPage.jsx'
import SearchForm from './components/searchForm/SearchForm.jsx'
import SeatPage from './components/pages/SeatPage.jsx'
import { store } from './store/Store.js'
import { Provider } from "react-redux"
import BookingPage from './components/pages/BookingPage.jsx'
import BookingHistoryPage from './components/pages/BookingHistoryPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout /> }>
        <Route path='' element={<SearchForm />} />
        <Route path='/trips' element={<SearchResultPage />} />
        <Route path='/trips/:tripId/seats' element={<SeatPage />} />
        <Route path="/trips/:tripId/booking" element={<BookingPage />} />
        <Route path="/bookings/history" element={<BookingHistoryPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
