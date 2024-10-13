import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li><Link to="/posts/categories/Art">Art</Link></li>
        <li><Link to="/posts/categories/Investment">Investment</Link></li>
        <li><Link to="/posts/categories/Houseplants">Houseplants</Link></li>
        <li><Link to="/posts/categories/FlowerLegends">Flower Legends</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>All Rights NOT Reserved &copy; Copyright, Little Palm Media Soft Tutorials</small>
      </div>
    </footer>
  )
}

export default Footer