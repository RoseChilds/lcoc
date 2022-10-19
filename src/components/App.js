import '../assets/css/App.css';
import {Component, useEffect} from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/home/Home";
import SideMenu from "./template/SideMenu";
import NavTitle from "./template/NavTitle";
import Footer from "./template/Footer";
import Cookie from "./template/Cookie";
import config from '../ext/config.js';
import impostor from '../assets/img/impostor.webp';
import amongus from '../assets/audio/amongus-drip.mp3';
import thud from '../assets/audio/instagram-thud-sound-effect.mp3';
import fart from '../assets/audio/fart.mp3';
import events from '../ext/events';
import {useLocation} from "react-router";
import NotFound from './errors/NotFound';
import Terms from "./pages/Terms";
import Online from "./pages/Online";
import Courses from "./pages/Courses";
import International from "./pages/intl/International";
import Enrol from "./pages/Enrol";
import Course from "./pages/Course";
import {createStandaloneToast} from "@chakra-ui/react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      konami: false
    }
    this.konamicode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    this.currentcode = [];
    this.sounds = [
      amongus,
      thud,
      fart
    ].map(f => {
      let a = new Audio(f);
      a.volume = 0.5;
      a.pause();
      return a;
    });
  }


  handleKeyUp = (e) => {
    this.currentcode.push(e.keyCode);
    if (this.currentcode.length > this.konamicode.length) this.currentcode.shift();
    if (this.konamicode.join("-") === this.currentcode.join("-")) {
      this.handleKonami();
    }
  }

  handleMenuClick = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  handleKonami = () => {
    if (this.state.konami) {
      this.sounds[0].pause();
      this.sounds[2].currentTime = 0;
      this.sounds[2].play();
      clearTimeout(this.stoptimeout);
      setTimeout(() => {
        this.setState({amongusgrow: false});
      }, 400);
      window.document.body.style.overflow = "unset";
    } else {
      this.sounds[0].currentTime = 0;
      this.sounds[0].play();
      this.sounds[1].currentTime = 0;
      this.sounds[1].play();
      this.stoptimeout = setTimeout(this.handleKonami, 25500);
      window.document.body.style.overflow = "hidden";
    }
    this.setState({
      konami: !this.state.konami,
      amongusgrow: true
    });
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  render() {
    return <div>
      <Cookie/>
      <div className={"select-none font-gotham min-h-screen flex flex-col"}>
        <SideMenu open={this.state.menuOpen} title={config.title} handleMenuClick={this.handleMenuClick}/>
        <div className={"sticky top-0 h-10 bg-black w-full flex justify-start items-center text-white z-[49] relative"}>
          <div className={"pl-2 z-10"}>
            <svg viewBox="0 0 100 80" width="40" height="40" className={"cursor-pointer w-7 h-7"} fill={"white"}
                 onClick={this.handleMenuClick}>
              <rect width="100" height="15"></rect>
              <rect y="30" width="100" height="15"></rect>
              <rect y="60" width="100" height="15"></rect>
            </svg>
          </div>
          <div
            className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-ultra h-full w-full"}>
            <NavTitle/>
          </div>
        </div>
        <>
          <Switch>
            <Route path={"/"} exact>
              <Home/>
            </Route>
            <Route path={"/online"} exact>
              <Online/>
            </Route>
            <Route path={"/terms"} exact>
              <Terms/>
            </Route>
            <Route path={"/courses"} exact>
              <Courses/>
            </Route>
            <Route path={"/international"} exact>
              <International/>
            </Route>
            <Route path={"/enrol"} exact>
              <Enrol/>
            </Route>
            <Route path={"/courses/:id"} exact>
              <Course/>
            </Route>
            <Route path={"*"}>
              <NotFound/>
            </Route>
          </Switch>
        </>
        <Footer/>
      </div>
      <div
        onClick={this.handleKonami}
        className={`fixed top-0 left-0 w-full h-full duration-300 bg-black/50 backdrop-invert ${this.state.konami ? "" : "pointer-events-none opacity-0"} flex justify-center items-center z-[100000]`}>
        <img src={impostor}
             className={`drop-shadow-2xl pointer-events-none ${this.state.amongusgrow ? "amongus-grow" : ""}`}
             alt=""/>
      </div>
    </div>
  }
}


const { ToastContainer, toast } = createStandaloneToast();
events.on("toast", (options)=>{
  toast(options)
});
const AppParent = () => {
  let location = useLocation();
  useEffect(() => {
    events.emit("pathChange", location);
  }, [location]);
  return <>
    <App/>
    <ToastContainer />
  </>;
}

export default AppParent;
