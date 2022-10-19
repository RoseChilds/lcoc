import {Component, createRef} from "react";

function randn_bm(min, max, skew){
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5;
  if(num > 1 || num < 0)
    num = randn_bm(min, max, skew);
  else{
    num = Math.pow(num, skew);
    num *= max - min;
    num += min;
  }
  return num;
}

class Star{
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.calculateCoords();
    this.initialDraw();
    this.speed = (Math.random() * 0.02 + 0.02) * (Math.random() > 0.5 ? 1 : -1);
    this.max = Math.random() * 0.5 + 0.5;
    this.min = Math.random() * 0.2;
    this.opacity = 0;
  }

  initialDraw(){
    this.ctx.fillStyle = `rgba(${this.color.join(", ")}, ${this.opacity})`;
    this.ctx.fillRect(this.x, this.y, 1, 1);
    requestAnimationFrame(() => {
      this.drawFrame();
    });
  }

  calculateCoords = () => {
    this.x = Math.random() * this.canvas.width;
    let ymulti = randn_bm(0, 1, 5) * 5.5 - 0.01;
    this.y = ymulti * this.canvas.height;
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.color = [255, 255, 255];
  }

  drawFrame = (ms) => {
    if(this.dead) return;
    this.opacity += this.speed;
    if(this.opacity >= this.max){
      this.speed = Math.abs(this.speed) * -1;
    }else if(this.opacity <= this.min){
      this.speed = Math.abs(this.speed);
    }
    this.ctx.clearRect(this.x, this.y, 1,1);
    this.ctx.fillStyle = `rgba(${this.color.join(", ")}, ${this.opacity})`;
    this.ctx.fillRect(this.x, this.y, 1, 1);
    this.frameTimeout = setTimeout(() => {
      if(this.dead) return;
      requestAnimationFrame(this.drawFrame);
    }, 1000 / 30);
  }

  reset(){
    clearTimeout(this.frameTimeout);
    this.calculateCoords();
    this.initialDraw();
  }

  kill(clear = false){
    clearTimeout(this.frameTimeout);
    this.dead = true;
    if(clear){
      requestAnimationFrame(() => {
        this.ctx.clearRect(this.x-1, this.y-1, 3, 3);
      });
    }
  }
}

class StarBackground extends Component{
  constructor(props){
    super(props);
    this.state = {}
    this.canvasRef = createRef();
    this.mounted = false;
    this.starCount = this.props.starCount;
  }

  componentDidMount = async() => {
    if(this.mounted) return;
    this.mounted = true;
    this.ctx = this.canvasRef.current.getContext("2d");
    this.canvas = this.canvasRef.current;
    this.handleResize();
    this.newStars();
    this.clearOnResize = true;
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = (e) => {
    this.canvasRef.current.style.top = (window.scrollY / 1.5) + "px";
  }

  newStars = () => {
    let amt = this.starCount;
    this.stars = new Array(amt).fill(0).map(() => new Star(this.canvasRef.current));
  }

  updateStarCount = (amt) => {
    let diff = amt - this.stars.length;
    if(diff > 0){
      for(let i = 0; i < diff; i++){
        this.stars.push(new Star(this.canvasRef.current));
      }
    }else{
      for(let i = 0; i < Math.abs(diff); i++){
        this.stars.pop().kill(true);
      }
    }
    this.starCount = amt;
  }

  clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
    this.stars.map(star => star.kill());
  }

  handleResize = () => {
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;
    clearTimeout(this.redrawtimeout);
    if(this.clearOnResize){
      this.stars.map(star => star.kill());
      this.clearCanvas();
      this.redrawtimeout = setTimeout(() => {
        this.newStars();
      }, 250);
    }
  }

  render(){
    return (
      <canvas ref={this.canvasRef} className={"absolute top-0 left-0 -z-10"}/>
    );
  }
}

export default StarBackground;
