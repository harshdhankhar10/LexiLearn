import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
const Blog = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <>
    <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <h1 className="text-3xl font-semibold text-gray-900 py-12 text-center">Blog Page</h1>

    </>
  )
}

export default Blog