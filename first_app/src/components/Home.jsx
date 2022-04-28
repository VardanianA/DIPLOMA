import '../components/app/App.css';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination]);
const slides = ['cafe.jpg', 'music.jpg', 'party.jpg', 'res.jpg', 'pub.jpg'];
const delay = 2500;

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);


  return (
    <div className="home" id="home">
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {slides.map((background, index) => (
          <div className="slide" key={index} style={{ background }}><img src={require(`../images/${background}`)} /></div>
        ))}
      </div>

      <div className="slideshowDots">
        {slides.map((_, idx) => (
          <div key={idx} className={`slideshowDot${index === idx ? " active" : ""}`} onClick={() => { setIndex(idx); }}></div>
        ))}
      </div>
      <div>
        <form action="">
          <input type="search" />
          <i class="fa fa-search"></i>
        </form>
      </div>
    </div>
  );

}

export default Home;

