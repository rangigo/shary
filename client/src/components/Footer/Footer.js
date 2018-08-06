import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="page-footer grey darken-3" style={{marginTop: '20px'}}>
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Shary</h5>
            <p className="grey-text text-lighten-4">
              Share your stories with the world
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li>
                <Link className="grey-text text-lighten-3" to="/stories">
                  Stories
                </Link>
              </li>
              <li>
                <Link className="grey-text text-lighten-3" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2018 Shary
          <a className="grey-text text-lighten-4 right" href="#!">
            More Links
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
