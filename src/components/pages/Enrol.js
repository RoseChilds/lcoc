import {Component} from "react";
import events from "../../ext/events";
import config from "../../ext/config";
import {HeroButton} from "./home/Hero";

class Enrol extends Component {
  render() {
    return <div className={"flex flex-col items-center justify-center grow"}>
      <HeroButton onClick={()=>{
        events.emit("toast", config.enrolError);
      }}>
        Enrol with UCAS
      </HeroButton>
    </div>
  }
}

export default Enrol;