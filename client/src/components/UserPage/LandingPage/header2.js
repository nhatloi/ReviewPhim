import React from 'react'
import './header.css'



function header2() {

    const progress = document.querySelector('.progress-bar');
        const winScroll = window.pageYOffset;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll/height) *100;


    return (
        <header>
            <h2>Scroll Indicator</h2>
            <div className='progress' style={{width:`${scrolled}%`}}>
                <div className='progress-bar'></div>

            </div>
        </header>
    )
}

export default header2
