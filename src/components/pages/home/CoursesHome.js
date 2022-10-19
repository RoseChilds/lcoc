import {Component} from "react";
import config from '../../../ext/config.js'
import {faBookOpen, faCloud, faEarthEurope, faUserGraduate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import colors from "tailwindcss/colors";
import {Link} from "react-router-dom";
import Title from "../../template/Title";

class CoursesHome extends Component {
  render() {
    return (<div className={"bg-slate-200 p-4"}>
        <Title>
          Study at the best comedy school in the world
        </Title>
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"}>
          {[{
            title: "Undergraduate",
            description: "Our undergraduate courses are the best in the world, and are the only courses that are endorsed by the British Comedy Council.",
            icon: faBookOpen,
            color: colors.blue[500],
          }, {
            title: "Postgraduate",
            description: "Our postgraduate courses offer a level of comedy education that is unparalleled in the world. We have a 100% success rate in getting our students to make at least 3 people laugh.",
            icon: faUserGraduate,
            color: colors.orange[500],
          }, {
            title: "International",
            description: `We have a number of international students from all over the world, including the United States, Canada, Australia, and New Zealand. No matter where you're from, you can study at ${config.abr}!`,
            icon: faEarthEurope,
            color: colors.green[500],
            link: "/international"
          }, {
            title: "Online Courses",
            description: "Aren't able to study at our campus? No problem! We offer a number of online courses that you can take from the comfort of your own home.",
            icon: faCloud,
            color: colors.purple[500],
            link: "/online"
          }].map((c, i) => {
            return <div className={"flex flex-col items-center"} key={`home_course_${i}`}>
              <div
                className={"text-white text-6xl p-8 rounded-full aspect-square w-28 overflow-hidden flex justify-center items-center mb-2 shadow"}
                style={{
                  background: c.color
                }}>
                <FontAwesomeIcon icon={c.icon}/>
              </div>
              <div className={"text-center"}>
                <div className={"font-black text-3xl"}>
                  {c.link ? <Link to={c.link} className={"hover:underline"}>
                    <h1>{c.title}</h1>
                  </Link> : <h1>{c.title}</h1>}
                </div>
                <span>
                  {c.description}
                </span>
              </div>
            </div>
          })}
        </div>
      </div>);
  }
}

export default CoursesHome;
