import {Component, createRef} from "react";
import sad from '../../../assets/img/student_intl/sad.png';
import happy from '../../../assets/img/student_intl/happy.png';
import award from '../../../assets/img/student_intl/award.png';
import awardtext from '../../../assets/img/student_intl/awardtext.png';
import FadeOnView from "../../template/FadeOnView";
import config from "../../../ext/config";

function Text(props) {
  return <FadeOnView thresh={window.innerHeight / 2} unscroll={true}>
    <div
      className={`fixed font-bold text-3xl bottom-0 w-screen h-[33.33vh] flex items-center justify-center duration-300 ${props.hideText && "opacity-0"}`}>
      <div className={"text-center w-full p-2 bg-black"}>{props.children}</div>
    </div>
    {!props.noHeight && <div className={"h-[50vh]"}/>}
  </FadeOnView>
}

class IntlContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sadSizing: 1,
      sadCaption: 1,
      hideText: false
    }
    this.backgroundRef = createRef();
    this.parentRef = createRef();
    this.mounted = false;
  }

  componentDidMount() {
    if (this.mounted) return;
    this.mounted = true;
  }

  render() {
    return <div className={"bg-black text-white"}>
      <div className={"h-screen flex items-center justify-center text-5xl font-black"}>
        <h1>Scroll down to learn about David's journey!</h1>
      </div>
      <FadeOnView className={"sticky top-1/2 -translate-y-1/2 flex items-center justify-center grayscale intl-image"}
                  scrollProgress={(e) => {
                    this.setState({
                      sadSizing: 1 + (e * 2)
                    });
                  }} thresh={window.innerHeight / 3} unscroll={true}>
        <img src={sad} alt="A sad foreign exchange student" className={"w-60 rounded shadow"} style={{
          transform: `scale(${this.state.sadSizing})`
        }}/>
      </FadeOnView>
      <Text hideText={this.state.hideText}>David was sad..</Text>
      <Text hideText={this.state.hideText} noHeight={true}>Until he learnt about the {config.title}!</Text>
      <FadeOnView className={"intl-image"} transition={500} thresh={window.innerHeight / 2} unscroll={true}>
        <img src={happy} alt="A happy foreign exchange student" className={"w-60 rounded shadow fixed top-1/2 left-1/2"}
             style={{
               transform: `translate(-50%, -50%) scale(${this.state.sadSizing}) `
             }}/>
        <div className={"h-screen"}/>
      </FadeOnView>
      <Text hideText={this.state.hideText}>David took one of our renowned international courses..</Text>
      <div className={"h-[25vh]"}/>
      <Text hideText={this.state.hideText2} noHeight={true}>And graduated with flying colours!</Text>
      <FadeOnView className={"intl-image"} transition={500} thresh={window.innerHeight / 2} unscroll={true}>
        <img src={award} alt="A happy foreign exchange student with his diploma"
             className={"w-60 rounded shadow fixed top-1/2 left-1/2"}
             style={{
               transform: `translate(-50%, -50%) scale(${this.state.sadSizing}) `
             }}/>
        <div className={"h-[75vh]"}/>
      </FadeOnView>
      <FadeOnView className={"intl-image"} transition={500} thresh={window.innerHeight / 2} unscroll={true}
                  scrollProgress={(e) => {
                    this.setState({
                      hideText: e > 0.5,
                      hideText2: e >= 1
                    });
                  }}>
        <img src={award} alt="A happy foreign exchange student with his diploma"
             className={"w-60 rounded shadow fixed top-1/2 left-1/2"}
             style={{
               transform: `translate(-50%, -50%) scale(${this.state.sadSizing}) `
             }}/>
        <div className={"h-screen"}/>
      </FadeOnView>
      <FadeOnView className={"intl-image"} transition={500} thresh={window.innerHeight / 2} unscroll={true}>
        <img src={awardtext} alt="A happy foreign exchange student with his diploma"
             className={"w-60 rounded shadow fixed top-1/2 left-1/2"}
             style={{
               transform: `translate(-50%, -50%) scale(${this.state.sadSizing}) `
             }}/>
        <div className={"h-screen"}/>
      </FadeOnView>
      <FadeOnView scrollProgress={(e)=>{
        if(e > 0){
          document.querySelectorAll(".intl-image").forEach((e)=>{
            e.style.opacity = 0;
          });
        }else{
          document.querySelectorAll(".intl-image").forEach((e)=>{
            e.style.opacity = "";
          });
        }
      }} unscroll={true} />
      <div className={"h-[50vh]"}/>
    </div>;
  }
}

export default IntlContent;