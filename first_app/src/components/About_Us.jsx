import React from 'react';
import '../components/app/App.css';

const About = () => {

  return (
    <div className="venues" id="about">
      <h1>About Us</h1>
      <div className="about">
        <div>
          <img src={require(`../images/IPEV.png`)} />
        </div>
        <div>
          <p>IPEV - Information Platform for Entertainment Venues, is the business directory of Yerevan. It collects, processes and distributes information about leisure activities in Yerevan.
            The information received from the organization IPEV presents on its page a photo report, address, phone number and email address.</p>
        </div>
      </div>
    </div>
  )
}

export default About;