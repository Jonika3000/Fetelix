import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css"; 
import slide3 from '../../assets/images/slide1.jpg';
import slide2 from '../../assets/images/slide2.jpg';
import slide1 from '../../assets/images/slide3.jpg';
import 'react-awesome-slider/dist/custom-animations/fall-animation.css';
import "./Slider.css"


const Slider = () => {
    return (
        <AwesomeSlider className="sliderImages" animation="fallAnimation">
            <div data-src={slide1} />
            <div data-src={slide2} />
            <div data-src={slide3} /> 
        </AwesomeSlider>
    );
};

export default Slider;
