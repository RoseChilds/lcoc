import {Component} from "react";
import IntlContent from "./IntlContent";
import {Helmet} from "react-helmet";
import config from "../../../ext/config";

class International extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    }
    this.loaded = false;
  }
  componentDidMount = async () => {
    if(this.mounted) return;
    this.mounted = true;
  }

  render() {
    return (
      <>
        <Helmet>
          <title>International - {config.title}</title>
        </Helmet>
        <IntlContent/>
      </>
    );
  }
}

export default International;
