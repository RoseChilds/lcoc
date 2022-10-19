import {Component, createRef} from "react";
import config from '../../ext/config.js';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

function FooterItem(props){
  return <div className={"flex flex-col gap-2"}>
    <div className={"text-lg font-bold"}>{props.title}</div>
    <div className={`flex flex-col gap-2 ${props.grow ? "grow" : ""}`}>
      {props.children}
    </div>
  </div>
}

class Footer extends Component{
  constructor(props){
    super(props);
    this.mapRef = createRef();
    this.mounted = false;
  }
  componentDidMount(){
    if(this.mounted) return;
    this.mounted = true;
  }
  render(){
    return (
      [<div key={"footer-a"} className={"bg-gray-600 flex justify-center text-white pt-4 pb-4 mt-auto"}>
        <div className={"w-[90vw] md:w-[75vw] lg:w-[70vw] xl:w-[55vw] grid grid-cols-2 lg:grid-cols-4 gap-2"}>
          <FooterItem title={`Study at ${config.abr}`}>
            <ul className={"list-disc list-inside underline"}>
              <li>
                <Link to={"/courses"}>Courses</Link>
              </li>
              <li>
                <Link to={"/international"}>International</Link>
              </li>
              <li>
                <Link to={"/online"}>Study online</Link>
              </li>
            </ul>
          </FooterItem>
          <FooterItem title={`Visit us`}>
            <ul className={"list-disc list-inside underline"}>
              <li>
                <a href={"https://goo.gl/maps/C95e6FrWkSbKE7WWA"} target={"_blank"} rel={"noreferrer"}>Our campus</a>
              </li>
            </ul>
          </FooterItem>
          <FooterItem title={`Facilities`}>
            <ul className={"list-disc list-inside"}>
              <li>
                We don't have any
              </li>
            </ul>
          </FooterItem>
          <FooterItem title={`Contact us`} grow={true}>
            <div className={"flex flex-row gap-2 text-4xl"}>
              <a href={"https://twitter.com/Solithcy"} target={"_blank"} rel={"noreferrer"}>
                <FontAwesomeIcon icon={faTwitter} className={"duration-200 hover:text-[#1DA1F2]"}/>
              </a>
              <a href={"mailto:me@rosechilds.gay"} target={"_blank"} rel={"noreferrer"}>
                <FontAwesomeIcon icon={faEnvelope} className={"duration-200 hover:text-[#EA4335]"}/>
              </a>
            </div>
            <div className={"font-light select-text"}>
              60 Old Montague St, E1 5NG
              <br/>
              London
              <br/>
              England
            </div>
          </FooterItem>
        </div>
      </div>,
        <div className={"bg-gray-800 text-white p-4 font-light text-sm md:text-md"} key={"footer-b"}>
          <div className={"grid grid-cols-[1fr_auto_1fr] gap-2 justify-center"}>
            <span className={"text-right"}>© <a className={"underline"} href={"https://rosechilds.gay"} target={"_blank"} rel={"noreferrer"}>Rose Childs</a> 2022</span>
            <span>&bull;</span>
            <Link className={"underline"} to={"/terms"}>Terms and Conditions</Link>
          </div>
          <div className={"text-center text-xs"}>This is not a real college!</div>
        </div>]
    );
  }
}

export default Footer;
