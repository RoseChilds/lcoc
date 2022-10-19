import {Helmet} from "react-helmet";
import config from "../../ext/config";
import {HeroButton} from '../pages/home/Hero';
import TileBackground from "../template/TileBackground";

function NotFound(props){
  return (
    <>
      <TileBackground/>
      <div className={"justify-center items-center flex flex-col grow h-full mt-20 mb-20 text-center"}>
        <Helmet>
          <title>404 - {config.title}</title>
        </Helmet>
        <h1 className={"text-6xl font-black"}>404</h1>
        <h2 className={"text-2xl font-bold"}>The page you requested couldn't be found.</h2>
        <HeroButton to={"/"} className={"w-fit m-auto mt-2"}><span className={"pr-8 pl-8"}>Home</span></HeroButton>
      </div>
    </>
  );
}

export default NotFound;
