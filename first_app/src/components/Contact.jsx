import React from 'react';
import '../components/app/App.css';
import Logo from '../components/Logo';
const Contact = () => {

  return (
    <div className="venues" id="contact" >
      <h1>Contact Us</h1>
      <div className="contact">
        <div>
          <p><b>Gmail: </b>anivardanian99@gmail.com</p>
          <p><b>Address: </b></p>
          <p><b>Phone: </b></p>
        </div>
        <p>Copyright ©  2021 IPEV Company S.L. All rights reserved.</p>
        <div>
          <Logo />
        </div>
      </div>
    </div>
  )
}

export default Contact;