import React from 'react'
import '../Styles/footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div>
                <p className='create'>Created by JHON ESPITIA</p>
            </div>
            <div className='links'>
                <a 
                className='facebook'
                href="https://www.facebook.com"
                target="blank"
                ><i className="fa-brands fa-facebook-square"></i></a>
               
                <a 
                className='instagram'
                href="https://www.instagram.com"
                target="blank">
                <i className="fa-brands fa-instagram-square"></i></a>
                
                <a href="//www.whatsapp.com"
                target="blank">
                <i className="whatsapp fa-brands fa-whatsapp-square"></i></a>
            </div>
            <div>
                <p className='copy'>Copyright © All Rights Reserved 2022</p>
            </div>
        </div>
    )
}

export default Footer;
