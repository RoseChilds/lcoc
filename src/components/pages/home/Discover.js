import {Component} from "react";
import config from '../../../ext/config.js';
import smiling from '../../../assets/img/people/smiling.png';
import Title from "../../template/Title";

class Discover extends Component{
  render(){
    return (
      <div className={"p-4"}>
        <Title>
          Discover yourself
        </Title>
        <div className={"flex justify-center"}>
          <div className={"grid grid-cols-2 gap-2 w-full md:w-[66.6%] lg:w-1/2"}>
            <div className={"flex items-center text-lg"}>
              The {config.title} is a place where you can discover yourself. We have a diverse range of students from all over the world, and we have a number of courses that you can take to help you discover yourself.
            </div>
            <div>
              <img src={smiling} className={"w-full rounded-lg shadow"} alt=""/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Discover;
