import React from 'react';
import '../components/app/App.css';

const Logo = (props) => {
    return (
        <div className="fa">
            <ul>
                <li><a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
            </ul>
        </div>
    );
}

export default Logo;
