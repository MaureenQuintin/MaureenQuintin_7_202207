import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Connect from '../../pages/Connect'
import Feed from '../../pages/Feed'
import Post from '../../pages/Post'
import NavBar from '../NavBar'


const index = () => {
  return (
    <Router>
      <NavBar />
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/post" element={<Post />} />
            <Route path="/connect" element={<Connect />} />
        </Routes>
    </Router>
  )
}

export default index