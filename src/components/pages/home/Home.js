import {Component} from "react";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import CoursesHome from "./CoursesHome";
import Discover from "./Discover";
import {Helmet} from "react-helmet";
import config from "../../../ext/config";

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){

  }

  render(){
    return (
      <div>
        <Helmet>
          <title>{config.title}</title>
        </Helmet>
        <Hero/>
        <div className={"min-h-[calc(100vh-2.5rem)] flex flex-col gap-2"}>
          <Testimonials/>
          <CoursesHome/>
          <Discover/>
        </div>
      </div>
    );
  }
}

export default Home;
