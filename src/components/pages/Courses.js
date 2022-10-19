import {Component} from "react";
import courses from "../../ext/courses";
import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Tag, TagCloseButton, TagLabel
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {useLocation} from "react-router";
import config from "../../ext/config";
import {Helmet} from "react-helmet";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: props.filter || []
    }
  }

  componentDidMount() {

  }

  addFilter = (tag) => {
    let filter = this.state.filter;
    if (filter.includes(tag)) return;
    filter.push(tag);
    this.setState({
      filter
    });
    this.updateURL(filter);
  }

  removeFilter = (tag) => {
    let filter = this.state.filter;
    filter.splice(filter.indexOf(tag), 1);
    this.setState({
      filter
    });
    this.updateURL(filter);
  }

  updateURL = (filter) => {
    if (filter.length === 0) return window.location.hash = "";
    let params = new URLSearchParams();
    params.set("filter", filter.join(","));
    window.location.hash = params.toString();
  }

  render() {
    return (<div className={"h-[calc(100vh-2.5rem)] flex p-4 md:p-16 overflow-hidden"}>
      <Helmet>
        <title>Courses - {config.title}</title>
      </Helmet>
      <Box borderColor={"gray.300"} borderWidth='1px'
           className={"w-full grow grid grid-rows-[auto_2fr] md:grid-rows-1 md:grid-cols-[1fr_auto_3fr]"}
           borderRadius='lg' overflow='hidden'>
        <div>
          <div className={"p-4 text-2xl font-bold text-center"}><h1>{config.title}</h1></div>
          <Accordion defaultIndex={[0]} borderColor={"gray.300"} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    Tags
                  </Box>
                  <AccordionIcon/>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div className={"flex gap-2 flex-wrap"}>
                  {this.state.filter.sort().map((tag, index) => {
                    return <Tag
                      key={`filter_tag_${index}`}
                      borderRadius='full'
                      variant='solid'
                      colorScheme='cyan'
                      fontWeight={"normal"}
                    >
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton
                        className={"cursor-pointer"} onClick={() => {
                        this.removeFilter(tag);
                      }}/>
                    </Tag>
                  })}
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
        <div className={"border-l h-full hidden md:block"} style={{
          borderColor: "var(--chakra-colors-gray-300)"
        }}/>
        <div className={"p-4 overflow-y-auto"}>
          {courses.sort((a, b) => {
            return a.title.localeCompare(b.title);
          }).filter(c => {
            if (this.state.filter.length === 0) return true;
            return this.state.filter.every(f => c.tags.includes(f));
          }).map((course, index) => {
            return <Course course={course} handleTag={(tag) => {
              this.addFilter(tag);
            }} key={`course_${index}`}/>
          })}
        </div>
      </Box>
    </div>);
  }
}

export function Course(props) {
  let {course} = props;
  return <div
    className={`border rounded-lg overflow-hidden ${props.large ? "md:h-60" : "md:h-48"} flex flex-col md:flex-row gap-2 mb-2 bg-white ${props.className || ""}`} style={{
    borderColor: "var(--chakra-colors-gray-300)"
  }}>
    <div className={"md:aspect-square w-full h-18 md:w-auto relative"} style={{
      height: window.innerWidth > 768 ? "-webkit-fill-available" : undefined,
      backgroundImage: `url(${course.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }} alt="">
      {course.level && <div
        className={"bg-black/25 text-white font-black text-5xl absolute top-0 left-0 w-full h-full flex justify-center items-center drop-shadow-xl"}>
        {course.level}
      </div>}
    </div>
    <div className={"flex flex-col gap-2 p-4"}>
      <Link to={`/courses/${course.id}`}><h1
        className={"text-xl font-bold hover:underline"}>{course.title}</h1></Link>
      <div>
        <ReactMarkdown>
          {course.description}
        </ReactMarkdown>
      </div>
      <div className={"mt-auto flex gap-2"}>
        {course.tags.sort().map((tag, t_index) => {
          return <Tag
            onClick={() => {
              if (!props.handleTag) return;
              props.handleTag(tag);
            }}
            key={`tag_${t_index}`}
            borderRadius='full'
            variant='solid'
            colorScheme='cyan'
            fontWeight={"normal"}
            className={"cursor-pointer"}
          >
            <TagLabel>{tag}</TagLabel>
          </Tag>
        })}
      </div>
    </div>
  </div>
}

function CoursesWrapper(props) {
  let loc = useLocation();
  let filter = [];
  if (loc.hash) {
    let params = new URLSearchParams("?" + loc.hash.substring(1));
    filter = params.get("filter");
    if (filter) {
      filter = filter.split(",");
    }
  }
  return <Courses filter={filter}/>
}

export default CoursesWrapper;
