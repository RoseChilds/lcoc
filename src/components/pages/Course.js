import {Component} from "react";
import {Redirect, useParams} from "react-router";
import courses from "../../ext/courses";
import NotFound from "../errors/NotFound";
import {HeroButton} from "./home/Hero";
import events from "../../ext/events";
import config from "../../ext/config";
import {Tab, TabList, TabPanel, TabPanels, Tabs, Tag, TagLabel} from "@chakra-ui/react";
import {Helmet} from "react-helmet";
import ReactMarkdown from "react-markdown";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course
    }
  }

  componentDidMount = () => {
    console.log(this.state);
  }

  render() {
    let course = this.state.course;
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    return <>
      <Helmet>
        <title>{course.title} - {config.title}</title>
      </Helmet>
      {this.state.redirect && <Redirect push to={this.state.redirect}/>}
      <div className={"flex flex-col-reverse gap-4 lg:grid lg:grid-cols-2 p-8"}>
        <div className={"flex flex-col"}>
          <div className={"mb-4 grow"}>
            <div className={"mb-2"}>
              <h1 className={"text-5xl text-center font-black mb-2"}>{course.title}</h1>
              <div className={"mt-auto flex gap-2 justify-center"}>
                {course.tags.sort().map((tag, t_index) => {
                  return <Tag
                    onClick={() => {
                      this.setState({
                        redirect: `/courses#filter=${tag}`
                      });
                    }}
                    key={`tag_${t_index}`}
                    borderRadius='full'
                    variant='solid'
                    colorScheme='cyan'
                    fontWeight={"normal"}
                    className={"cursor-pointer"}>
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                })}
              </div>
            </div>
            <Tabs colorScheme='cyan' className={"h-full"}>
              <TabList>
                <Tab>Description</Tab>
                <Tab>Pricing</Tab>
                <Tab>Timetable</Tab>
                {course.disclaimer && <Tab>Disclaimer</Tab>}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ReactMarkdown>
                    {course.extendedDesc || course.description}
                  </ReactMarkdown>
                </TabPanel>
                <TabPanel>
                  <p>
                    <span className={"font-semibold text-xl"}>Price: {course.price ? `£${course.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2
                    })}` : "Free!"}</span>
                  </p>
                  <div className={"text-sm"}>
                    <i>Course prices are charged monthly, unless specified otherwise.</i>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className={"grid grid-cols-[auto_1fr] gap-2"}>
                    {new Array(7).fill(0).map((_, i) => {
                      return <>
                        <span>{days[i]}:</span>
                        <span>{(course?.timetable || {})[days[i].toLowerCase().slice(0, 3)] || "-"}</span>
                      </>
                    })}
                  </div>
                </TabPanel>
                {course.disclaimer && <TabPanel>
                  <p>{course.disclaimer}</p>
                </TabPanel>}
                  </TabPanels>
            </Tabs>
          </div>
          <div className={"mt-auto flex flex-col gap-2 text-3xl items-center"}>
            <HeroButton onClick={() => {
              events.emit("toast", config.enrolError);
            }}>
              Enrol with UCAS
            </HeroButton>
          </div>
        </div>
        <div className={"flex justify-center rounded-xl overflow-hidden shadow-lg"}>
          <div className={"lg:aspect-square w-full h-60 lg:h-auto md:w-full relative"} style={{
            backgroundImage: `url(${course.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }} alt="">
            {course.level && <div
              className={"bg-black/25 text-white font-black text-5xl absolute top-0 left-0 w-full h-full flex justify-center items-center drop-shadow-xl"}>
              {course.level}
            </div>}
          </div>
        </div>
      </div>
    </>
  }
}

function CourseParent(props) {
  let {id} = useParams();
  let course = courses.find(c => c.id === id);
  if (!course) return <NotFound/>;
  return <Course course={course}/>
}

export default CourseParent;