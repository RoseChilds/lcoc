import {Component, createRef} from "react";
import config from '../../../ext/config.js';
import colors from "tailwindcss/colors";
import becca from '../../../assets/img/people/becca.png';
import dream from '../../../assets/img/people/dream.png';
import kanye from '../../../assets/img/people/kanye.png';
import book from '../../../assets/img/people/book.png';
import person1 from '../../../assets/img/people/person1.png';
import person2 from '../../../assets/img/people/person2.png';
import jare from '../../../assets/img/people/jare.png';
import jon from '../../../assets/img/people/jon.png';
import taylor from '../../../assets/img/people/taylor.png';
import harry from '../../../assets/img/people/harry.png';
import will from '../../../assets/img/people/will.png';
import kingsley from '../../../assets/img/people/kingsley.png';
import ReactMarkdown from "react-markdown";
import Title from "../../template/Title";

function Testimonial({data: testimonial}){
  return <div className={"ml-1 mr-1"}>
    <div
      className={"rounded-lg h-full shadow-lg overflow-hidden p-4 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[40vw]"}
      style={{
        background: testimonial.color
      }}>
      <div className={`text-2xl flex ${testimonial.right ? "flex-row-reverse" : "flex-row"} gap-4 h-full`}>
        <div className={"flex flex-col items-center"}>
          <div style={{
            backgroundImage: `url(${testimonial.image})`,
          }} className={"aspect-square bg-cover rounded-full h-20 md:h-32 shadow bg-center"}
               alt={`Picture of ${testimonial.name}`}/>
          <div className={`font-bold md:hidden`}>
            {testimonial.name}
          </div>
        </div>
        <div className={"grid grid-rows-[1fr_auto]"}>
          <div>
            <ReactMarkdown>
              {testimonial.content}
            </ReactMarkdown>
          </div>
          <div className={`font-bold hidden md:block`}>
            {testimonial.name}
          </div>
        </div>
      </div>
    </div>
  </div>
}

class Testimonials extends Component{
  constructor(props){
    super(props);
    this.state = {
      testimonials: [
        {
          name: "Becca",
          content: `I love how the ${config.title} lets me be myself!`,
          color: colors.blue[400],
          image: becca
        },
        {
          name: "Kanye East",
          content: `My ex-wife came back after I went to ${config.abr}. Love you Kam!`,
          color: colors.amber[400],
          image: kanye
        },
        {
          name: "Guy holding a book",
          content: `The ${config.title} had books. I love books.`,
          color: colors.teal[400],
          image: book
        },
        {
          name: "Clay",
          content: `The 3 years I spent at ${config.abr} were the best years of my life, I'm so funny now!`,
          color: colors.emerald[400],
          image: dream
        },
        {
          name: "Joyce",
          content: `${config.abr} is so inclusive, and I loved being able to discover myself through comedy!`,
          color: colors.purple[400],
          image: person1
        },
        {
          name: "Christina",
          content: `${config.abr} helped me discover my passion for improv, I now earn £7.50 a month from doing stand-up improv shows!`,
          color: colors.fuchsia[400],
          image: person2
        },
        {
          name: "Jare",
          content: `${config.abr} got me through my crippling fear of women, now they laugh with me!`,
          color: colors.red[400],
          image: jare
        },
        {
          name: "Jon",
          content: `My sister got pregnant, luckily the ${config.title} taught me dad jokes!`,
          color: colors.orange[400],
          image: jon
        },
        {
          name: "Taylor",
          content: `My life was a mess before ${config.abr}, now I'm a mess with a degree!`,
          color: colors.cyan[400],
          image: taylor
        },
        {
          name: "Harry",
          content: `${config.abr} helped me get so funny, I now have a **REAL** girlfriend!`,
          color: colors.lime[400],
          image: harry
        },
        {
          name: "Willy",
          content: `With ${config.abr} I finally have enough jokes to share through my entire communist nation.`,
          color: colors.pink[400],
          image: will
        },
        {
          name: "Kingsley",
          content: `${config.abr} made me realise I look fine and dandy with hats, now they're all I wear!`,
          color: colors.green[400],
          image: kingsley
        }
      ].shuffle()
    }
    this.state.testimonials = this.state.testimonials.map((t, i) => {
      t.ref = createRef();
      return t;
    });
  }

  componentDidMount(){

  }

  componentWillUnmount(){

  }

  render(){
    return <div className={"pt-2 mb-2"}>
      <div>
        <Title>
          What our students are saying
        </Title>
        <div className={`w-screen hidden md:grid grid-rows-3 gap-2`}>
          {new Array(3).fill(null).map((_, t_index) => {
            let testimonials = this.state.testimonials.filter((t, i) => {
              return i % 3 === t_index;
            });
            return <div className={`flex flex-row testimonial-section-${t_index}`} key={`section_${t_index}`}>
              {new Array(2).fill(null).map((_, t_a_index) => {
                return <div className={"testimonial-a flex flex-row"} style={{
                  animationDuration: `${testimonials.length * 10}s`,
                }} key={`t_a_section_${t_a_index}`}>
                  {testimonials.map((testimonial, index) => {
                    return <Testimonial data={testimonial} key={`t_${t_a_index}_${index}_0`}/>
                  })}
                </div>
              })}
            </div>
          })}
        </div>
        <div className={"flex md:hidden flex-col items-center gap-2"}>
          {this.state.testimonials.slice(0, 3).map((testimonial, index) => {
            return <Testimonial data={testimonial} key={`t_mobile_${index}`}/>
          })}
        </div>
      </div>
    </div>
  }
}

export default Testimonials;
