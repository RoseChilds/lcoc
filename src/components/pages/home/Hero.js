import outside from '../../../assets/img/college/outside.png';
import closeup from '../../../assets/img/college/closeup.png';
import improv1 from '../../../assets/img/college/improv1.png';

import {Carousel} from "react-responsive-carousel";
import '../../../assets/css/Hero.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Component, createRef} from "react";
import {Link} from "react-router-dom";
import config from '../../../ext/config.js';
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {convertRemToPixels} from "../../../ext/utils";

export function HeroButton(props){
  let content = <div className={"p-1 whitespace-pre bg-black text-xl uppercase font-bold " + props.className || ""}>
      <div
        className={"bg-black text-white hover:bg-white hover:text-black hover:shadow duration-300 p-4"}>
        {props.children}
      </div>
    </div>;
  if(props.to) {
    return <Link to={props.to}>
      {content}
    </Link>
  }
  return <div className={"cursor-pointer"} onClick={()=>{
    if(typeof props.onClick === "function"){
      props.onClick();
    }
  }}>
    {content}
  </div>;
}

export function HeroChevron(){
  return <FontAwesomeIcon icon={faChevronDown} onClick={() => {
    window.scrollTo({top: window.innerHeight - convertRemToPixels(2.5), behavior: "smooth"});
  }} size={"2x"}
                          className={"absolute left-1/2 bottom-24 -translate-x-1/2 -translate-y-1/2 z-20 text-white cursor-pointer chevron-anim"}/>
}

class Hero extends Component{
  constructor(props){
    super(props);
    this.ref = createRef();
    this.state = {
      progress: 0,
      height: 500,
      width: 500,
      text: config.title,
      posXTarget: 0,
      diff: 100,
      loaded: [],
      mounted: false
    }
    this.progress = 0;
    const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    this.speed = isReduced ? 0 : 0.001;
    this.images = [
      outside,
      closeup,
      improv1
    ];
    this.animrefs = {
      "0": createRef(),
      "0.25": createRef(),
      "0.5": createRef(),
      "0.75": createRef(),
      "0.33": createRef(),
      "0.66": createRef(),
    }
  }

  movementFrame = (ms) => {
    if(!this.mounted) return;
    if(!this.oldms){
      this.oldms = ms;
    }
    let sinceLastFrame = ms - this.oldms;
    let speed = (this.speed / 60) * sinceLastFrame;
    this.progress += speed;
    if(this.progress > 1) this.progress = this.progress % 1;
    let targetx = ((this.state.width + this.state.height) * 2 - 483);
    for(let key in this.animrefs){
      let ref = this.animrefs[key];
      if(!ref.current) continue;
      let progress = (this.progress + parseFloat(key)) % 1;
      ref.current.setAttribute("x", targetx * progress);
    }
    this.oldms = ms;
    requestAnimationFrame(this.movementFrame);
  }

  componentDidMount(){
    this.mounted = true;
    requestAnimationFrame(this.movementFrame);
    this.images.map(url => {
      return fetch(url).then(res => res.text()).then(() => {
        this.setState((state) => {
          state.loaded.push(url);
          return state;
        });
      });
    });
    this.calculateSize();
    this.setState({
      mounted: true
    });
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = ()=>{
    this.calculateSize();
    let interval = setInterval(this.calculateSize, 50);
    setTimeout(() => {
      clearInterval(interval);
    }, 600);
  }

  calculateSize = () => {
    let boundingbox = this.ref.current.getBoundingClientRect();
    this.setState({
      height: boundingbox.height,
      width: boundingbox.width
    });
  }

  componentWillUnmount(){
    this.mounted = false;
    window.removeEventListener("resize", this.handleResize);
  }

  render(){
    let height = this.state.height - this.state.diff;
    let width = this.state.width - this.state.diff;
    return <div className={"relative overflow-hidden"} ref={this.ref}>
      <Carousel autoPlay={true} infiniteLoop={true} interval={7500} className={"pointer-events-none"}
                dynamicHeight={true} showThumbs={false} showStatus={false} showArrows={false} showIndicators={false}>
        {this.images.map((url, i) => {
          return <div key={`image_${i}`} className={"bg-cover bg-center relative bg-black"}
                      style={{
                        backgroundImage: this.state.loaded.includes(url) ? `url("${url}")` : "",
                        height: window.innerHeight - convertRemToPixels(2.5),
                      }}>
            <div
              className={`absolute top-0 left-0 ${this.state.loaded.includes(url) ? "bg-transparent" : "bg-black"} z-10 duration-500 w-full h-full`}/>
          </div>
        })}
      </Carousel>
      <div
        className={"absolute top-0 left-0 w-full h-full pointer-events-none z-10 font-black text-[2.75rem] md:text-[3.75rem] lg:text-[4.1rem] md:p-2 text-white drop-shadow-xl font-black"}>
        <svg viewBox={`0 0 ${this.state.width} ${this.state.height}`} preserveAspectRatio={"none"}
             className={"w-full h-full"}>
          <defs/>
          <path style={{
            fill: "none",
            stroke: "none"
          }} id="curve"
                d={`m 100 50 l ${width - 100} 0 c 0 0 50 0 50 50 l 0 ${height - 100} c 0 0 0 50 -50 50 l -${width - 100} 0 c 0 0 -50 0 -50 -50 l 0 -${height - 100} c 0 0 0 -50 50 -50 l ${width - 100} 0 c 0 0 50 0 50 50 l 0 ${height - 100} c 0 0 0 50 -50 50 l -${width - 100} 0 z `}/>
          <text ref={this.animrefs["0"]} width={width}>
            <textPath xlinkHref="#curve" fill={"white"}>
              {this.state.text}
            </textPath>
          </text>
          <text className={"hidden 2xl:block"} ref={this.animrefs["0.25"]}
                width={width}>
            <textPath xlinkHref="#curve" fill={"white"}>
              {this.state.text}
            </textPath>
          </text>
          <text className={"hidden 2xl:block"} ref={this.animrefs["0.75"]}
                width={width}>
            <textPath xlinkHref="#curve" fill={"white"}>
              {this.state.text}
            </textPath>
          </text>
          <text className={"block md:block lg:hidden 2xl:block"}
                ref={this.animrefs["0.5"]} width={width}>
            <textPath xlinkHref="#curve" fill={"white"}>
              {this.state.text}
            </textPath>
          </text>
          <text className={"hidden lg:block 2xl:hidden"} ref={this.animrefs["0.66"]}
                width={width}>
            <textPath xlinkHref="#curve" fill={"white"}>
              {this.state.text}
            </textPath>
          </text>
          <text className={"hidden lg:block 2xl:hidden"} ref={this.animrefs["0.33"]}
                width={width}>
            <textPath xlinkHref="#curve" fill={"white"}>
              {this.state.text}
            </textPath>
          </text>
        </svg>
      </div>
      <div
        className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <HeroButton to={"/enrol"}>Enrol Now</HeroButton>
        <HeroButton to={"/courses"}>Our Courses</HeroButton>
      </div>
      <HeroChevron/>
      <div
        className={`absolute top-0 left-0 w-full h-full z-30 bg-black ${this.state.mounted ? "opacity-0 pointer-events-none" : ""} duration-300`}/>
    </div>
  }
}

export default Hero;
