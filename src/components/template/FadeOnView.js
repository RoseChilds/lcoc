import {Component, createRef} from "react";

class FadeOnView extends Component {
  constructor(props) {
    super(props);
    this.parentRef = createRef();
    this.state = {
      fade: false
    }
  }

  handleScroll = () => {
    let rect = this.parentRef.current.getBoundingClientRect();
    let progress = 1 - Math.max(0, Math.min(1, (rect.top) / (window.innerHeight - (this.props.thresh || 100))));
    if(typeof this.props.scrollProgress === "function") this.props.scrollProgress(progress);
    if (rect.top < window.innerHeight - (this.props.thresh || 100)) {
      this.setState({fade: true});
      if(!this.props.unscroll) window.removeEventListener("scroll", this.handleScroll);
      if (typeof this.props.onFade === "function") this.props.onFade();
    }else{
      this.setState({fade: false});
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    setTimeout(this.handleScroll, 100);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.thresh !== this.props.thresh) this.handleScroll();
  }

  render() {
    return <div
      className={`${this.state.fade ? "opacity-100" : "opacity-0"} ${this.props?.className || ""}`}
      style={{
        transitionDuration: `${this.props.transition || 300}ms`,
      }}
      ref={this.parentRef}>
      {this.props.children}
    </div>
  }
}

export default FadeOnView;
