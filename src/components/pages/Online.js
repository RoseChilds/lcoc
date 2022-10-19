import {Component, createRef} from "react";
import StarBackground from "../template/StarBackground";
import courses from "../../ext/courses";
import {HeroButton, HeroChevron} from "./home/Hero";
import FadeOnView from "../template/FadeOnView";
import Title from "../template/Title";
import config from "../../ext/config";
import {Course} from "./Courses";
import {Redirect} from "react-router";
import {Helmet} from "react-helmet";

class Online extends Component{
  constructor(props){
    super(props);
    this.backgroundRef = createRef();
    this.parentRef = createRef();
    this.mounted = false;
    this.state = {
      mounted: false,
      showGraph: false,
      courses: courses.filter(c => c.tags.includes("online")).shuffle().slice(-6),
      redirect: false
    }
  }

  componentDidMount = async() => {
    if(this.mounted) return;
    this.mounted = true;
    let lastms;
    let progress = 0;
    let mobile = 640;
    let desktop = 1280;
    let mod = Math.min(Math.max((window.innerWidth - mobile) / (desktop - mobile), 0.25), 1);
    const handleSkyFrame = async(ms) => {
      if(!lastms) lastms = ms;
      let diff = ms - lastms;
      progress += (diff / 2500);
      this.backgroundRef.current.updateStarCount(1750 * mod * progress);
      lastms = ms;
      if(progress < 1){
        requestAnimationFrame(handleSkyFrame);
      }
    };
    requestAnimationFrame(handleSkyFrame);
    setTimeout(() => {
      this.setState({
        mounted: true
      });
    }, 100)
  }

  componentWillUnmount(){

  }

  render(){
    let fadeonmount = `${this.state.mounted ? "opacity-100" : "opacity-0 pointer-events-none"} duration-700 `;
    return (
      <>
        <Helmet>
          <title>Online Courses - {config.title}</title>
        </Helmet>
        {this.state.redirect && this.mounted && <Redirect push to={this.state.redirect}/>}
        <div className={`${fadeonmount}`} style={{
          transitionDelay: "1.3s"
        }}>
          <HeroChevron/>
          <HeroButton to={"courses#filter=online"}
                      className={"absolute top-2/3 md:top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2"}>Online
            Courses</HeroButton>
        </div>
        <div className={"flex flex-col bg-black -z-20"} style={{
          backgroundImage: "radial-gradient(circle at top right, rgba(121, 68, 154, 0.13), transparent), radial-gradient(circle at 20% 80%, rgba(41, 196, 255, 0.05), transparent)"
        }}>
          <div ref={this.parentRef} className={"h-[calc(100vh-2.5rem)] relative"}>
            <StarBackground starCount={0} ref={this.backgroundRef}/>
            <div className={"flex h-full justify-center items-center text-white"}>
              <div
                className={"w-full md:w-2/3 xl:w-1/2 p-2 grid grid-rows-2 md:grid-rows-3 gap-2 font-black text-center"}>
                <div className={`text-3xl md:text-6xl drop-shadow-xl`}>
                  <span className={`${fadeonmount} delay-500`}>Participate in </span>
                  <span className={`${fadeonmount} drop-shadow-2xl`} style={{
                    background: "linear-gradient(90deg, #C33764 0%, #1D2671 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>the best</span>
                  <span className={`${fadeonmount} delay-500`}> online comedy courses to date.</span>
                </div>
              </div>
            </div>
          </div>
          <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-col gap-2 items-center p-4 text-white"}>
              <FadeOnView className={"w-full"}>
                <Title borderColor={"border-white/50"}>The highest success rate of any online comedy college</Title>
                <FadeOnView thresh={250} className={"w-full"} onFade={() => {
                  setTimeout(() => {
                    this.setState({
                      showGraph: true
                    });
                  }, 300);
                }}>
                  <div className={"flex justify-center text-black"}>
                    <div
                      className={"grid grid-cols-2 p-4 w-full md:w-96 pb-0 gap-8 bg-slate-200 rounded h-60 scale-150 m-16 md:m-20"}>
                      <div className={"flex flex-col gap-2 items-center"}>
                        <div className={"whitespace-nowrap"}>Competitors<span
                          className={"hidden lg:inline-block whitespace-pre"}> - 34%</span>
                        </div>
                        <div
                          className={"w-8 overflow-hidden items-end flex relative h-full bg-white rounded-t"}>
                          <div
                            className={`${this.state.showGraph ? "h-[34%]" : "h-0"} w-full duration-500 bg-gray-300`}/>
                        </div>
                      </div>
                      <div className={"flex flex-col gap-2 items-center"}>
                        <div className={"whitespace-nowrap"}>{config.abr}<span
                          className={"inline-block whitespace-pre"}> - 98%</span></div>
                        <div
                          className={"w-8 overflow-hidden items-end flex relative h-full bg-white rounded-t"}>
                          <div
                            className={`${this.state.showGraph ? "h-[98%]" : "h-0"} w-full duration-500 bg-primary-brand`}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeOnView>
              </FadeOnView>
            </div>
          </div>
        </div>
        <div className={"bg-slate-200 p-4"}>
          <Title>Here's some of our online courses</Title>
          <div className={"grid lg:grid-cols-3 gap-2"}>
            {this.state.courses.map((c, i) => {
              return <Course className={i >= 2 ? "hidden lg:flex" : ""} large={true} course={c}
                             handleTag={(e) => {
                               this.setState({
                                 redirect: `/courses#filter=${e}`
                               });
                             }}/>
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Online;
