import {Helmet} from "react-helmet";
import config from "../../ext/config";

function Terms(props){
  return (
    <div className={"flex flex-col items-center grow h-full m-20"}>
      <Helmet>
        <title>Terms and Conditions - {config.title}</title>
      </Helmet>
      <div className={"w-full md:w-[80%] xl:w-1/2"}>
        <h1 className={"text-6xl font-black mb-4"}>Terms and Conditions</h1>
        <div className={"mb-2"}>
          <h2 className={"text-2xl font-bold mb-2"}>{config.title}</h2>
          <p>The {config.title} is a fictional college created by <a className={"underline"}
                                                                     href={"https://rosechilds.gay"} target={"_blank"}
                                                                     rel={"noreferrer"}>Rose Childs</a> as <a
            className={"underline"}
            href={"https://www.southessex.ac.uk/t-levels"} target={"_blank"}
            rel={"noreferrer"}>T-Level</a> coursework. As such, none of the courses offered on the Site are actually
            real, nor do any of the pictured students attend {config.abr}. The address in the footer of the Site is not
            an address linked to {config.abr}. Please do not send mail to this address.</p>
        </div>
        <div className={"mb-2"}>
          <h2 className={"text-2xl font-bold mb-2"}>Privacy Policy</h2>
          <p>{config.abr} uses Google Analytics to track usage statistics, unless you opt out by pressing "I hate
            cookies". If you wish to opt out of Google Analytics after pressing "I love cookies", simply clear your
            cookies and the opt out pop up will appear once you refresh the page.</p>
        </div>
        <div className={"mb-2"}>
          <h2 className={"text-2xl font-bold mb-2"}>Copyright</h2>
          <p>{config.abr}'s website is protected under copyright. Do not copy, modify or pass the Site off as your own
            without
            authorization. The Site also uses images from different colleges and websites. If you'd like these images
            taken down, please contact me <a
              href={`mailto:me@rosechilds.gay?subject=${config.abr}%20image%20takedown%20request`} className={"underline"}
              target={"_blank"} rel={"noreferrer"}>here</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
