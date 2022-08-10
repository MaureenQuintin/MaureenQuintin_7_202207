import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Connect from '../../pages/Connect'
import Feed from '../../pages/Feed'
import NavBar from '../NavBar'


const index = () => {
  return (
    <Router>
      <NavBar />
        <Routes>
            <Route path="/" element={<Navigate to="/connect"/>} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/feed" element={<Feed />} />
        </Routes>
    </Router>
  )
}

export default index