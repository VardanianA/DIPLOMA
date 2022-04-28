import React from 'react';
import '../../components/app/App.css';
import About from '../About_Us';
import Contact from '../Contact';
import Home from '../Home';
import Cafe from '../menu/Cafe';
import Cinema from '../menu/Cinema';
import Club from '../menu/Club';
import Opera from '../menu/Opera';
import Party from '../menu/Party';
import Pub from '../menu/Pub';
import Restaurant from '../menu/Restaurant';
import Theatre from '../menu/Theatre';
import Nav from '../Nav';

const App = (props) => {
    return (
        <div className="app-wrapper">
            <Nav />
            <Home />
            <Cinema />
            <Cafe />
            <Restaurant />
            <Club />
            <Pub />
            <Party />
            <Opera />
            <Theatre />
            <About />
            <Contact />
        </div>
    );
}
export default App;