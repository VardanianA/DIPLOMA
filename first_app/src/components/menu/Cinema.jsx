import React, { useEffect, useState } from 'react';
import '../../components/app/App.css';
import { Dropdown } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

const Cinema = (props) => {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    fetch('/cinemas').then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(jsonRes => setCinemas(jsonRes.cinemas));
  })

  return (
    <div className="venues" id="cinema">
      <h1>Cinemas</h1>
      <div>
        <div>
          {cinemas.map((cinema, i) =>
            <div className="cinema-star">
              <div>
                <h1>{cinema.title}</h1>
                <img src={cinema.image}></img>
              </div>
              <div>
                <div className={classes.root}>
                  <Rating
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />
                  {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                </div>
                <div className="rating">
                  <form action='/stars' method="post">
                    <input type="email" name="mail" placeholder="Email" required />
                    <input type="text" name="star" value={value + " " + "stars"} />
                    <input name="cinema" value={cinema.title} />
                    <input type="submit" value="Send" />
                  </form>
                </div>
                <div>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">Description</Dropdown.Toggle>
                    <Dropdown.Menu >
                      <Dropdown.Item href="#" target="_blank" className="addresscinemas">{cinema.description}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cinema;