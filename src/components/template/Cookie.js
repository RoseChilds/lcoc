import {Component} from "react";
import events from "../../ext/events";
import {getCookie, setCookie} from "../../ext/utils";

class Cookie extends Component{
  constructor(props){
    super(props);
    if(!getCookie("cookieAcceptance")){
      setCookie("cookieAcceptance", "undecided");
    }
    this.state = {
      accepted: getCookie("cookieAcceptance") !== "undecided"
    }
    if(this.state.accepted) this.emitCookies();
  }

  handleAccept = () => {
    setCookie("cookieAcceptance", "true", 365 * 24 * 60 * 60 * 1000);
    this.setState({accepted: true});
    this.emitCookies();
  }

  handleReject = () => {
    setCookie("cookieAcceptance", "false");
    this.setState({accepted: true});
    this.emitCookies();
  }

  emitCookies = () => {
    events.emit("cookieChange", getCookie("cookieAcceptance") === "true");
  }

  render(){
    return <div
      className={`${this.state.accepted ? "opacity-0 pointer-events-none" : ""} select-none max-w-[calc(100vw-2rem)] duration-300 bg-white shadow-2xl rounded-xl fixed bottom-4 left-4 p-4 z-[9999] w-[22.5rem]`}>
      <div className={"font-bold text-lg"}>🍪🍪🍪🍪🍪</div>
      <div>
        This site uses cookies and Google Analytics, but only if you love them.
      </div>
      <div className={"flex mt-2 font-semibold gap-2"}>
        <div
          className={"bg-blue-400 rounded-xl p-2 shadow hover:shadow-lg hover:bg-blue-500 duration-200 cursor-pointer"}
          onClick={this.handleAccept}>
          I love cookies!
        </div>
        <div
          className={"bg-gray-300 text-black/90 rounded-xl p-2 shadow hover:shadow-lg hover:bg-gray-400 hover:text-black duration-200 cursor-pointer"}
          onClick={this.handleReject}>
          I hate cookies..
        </div>
      </div>
    </div>
  }
}

export default Cookie;
