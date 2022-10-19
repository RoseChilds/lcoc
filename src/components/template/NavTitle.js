import {Component} from "react";
import config from '../../ext/config.js';
import {Link} from "react-router-dom";

class NavTitle extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: config.title
    }
  }

  render(){
    return <Link to={"/"} className={"relative h-full flex justify-center items-center w-fit m-auto"}>
      {this.state.title}
    </Link>
  }
}

export default NavTitle;
