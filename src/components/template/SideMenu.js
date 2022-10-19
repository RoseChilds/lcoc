import {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import config from "../../ext/config";
import events from "../../ext/events";

class SideMenu extends Component{
  constructor(props){
    super(props);
    this.state = {
      sections: [
        {
          title: "Courses",
          items: [
            {
              title: "All Courses",
              link: "/courses"
            },
            {
              title: "Online Courses",
              link: "/online"
            }
          ]
        },
        {
          title: config.abr,
          items: [
            {
              title: "Terms and Conditions",
              link: "/terms"
            }
          ]
        }
      ]
    }
  }

  handleClick = () => {
    if(this.props.open) this.props.handleMenuClick();
  }

  componentDidMount() {
    events.on("pathChange", this.handleClick);
  }

  componentWillUnmount() {
    events.off("pathChange", this.handleClick);
  }

  render(){
    return (
      <div
        className={`h-full w-full md:w-1/2 lg:w-1/3 fixed top-0 left-0 z-50 ${this.props.open ? "" : "-translate-x-full"} duration-300`}>
        <div className={"h-full w-full bg-black text-white grid grid-rows-[auto_auto_1fr] gap-2"}>
          <div className={"m-4 mb-0 flex flex-row p-1"}>
            <div className={"text-xl w-full flex items-center"}>
              {this.props.title}
            </div>
            <div className={"pr-2"}>
              <FontAwesomeIcon size={"2x"} icon={faXmark} className={"cursor-pointer"}
                               onClick={this.props.handleMenuClick}/>
            </div>
          </div>
          <div className={"mr-4 ml-4 border-b border-white/50"}/>
          <div className={"flex flex-col gap-2"}>
            {this.state.sections.map((section, index) => {
              return <div className={"pl-4 pr-4"} key={`section_${index}`}>
                <div className={"text-xl font-bold mb-2"}>{section.title}</div>
                <ul className={"list-disc list-inside"}>
                  {section.items.map((item, i_index) => {
                    return <li className={"text-lg mb-2"} key={`item_${index}_${i_index}`}>
                      <Link to={item.link} className={"hover:underline"}>{item.title}</Link>
                    </li>
                  })}
                </ul>
              </div>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default SideMenu;
