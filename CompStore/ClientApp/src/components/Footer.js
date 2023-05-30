import React from 'react'
import './Footer.scss'

export default function footer() {
    return (
        <footer id="footer">
            <div className="container footer">
                <div className="links">
                    <a ><i className="fa-brands fa-youtube"></i></a>
                    <a ><i className="fa-brands fa-instagram"></i></a>
                    <a ><i className="fa-brands fa-twitter"></i></a>
                </div>
                <div className="subtitle">CompStore</div>
            </div>
        </footer>
    )
}
