import {Component, createRef} from "react";
import {random, easeInCubic} from "../../ext/utils";

let rainbow = [
  "#fdadad",
  "#fdd97c",
  "#fbfdaa",
  "#c1f0b2",
  "#b2e4f0",
  "#e3b2f0"
].map(c=> {
  let hex = c.replace("#", "");
  return [
    parseInt(hex.substring(0, 2), 16),
    parseInt(hex.substring(2, 4), 16),
    parseInt(hex.substring(4, 6), 16)
  ]
});

class Tile {
  constructor(x, y, size, canvas) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.max = random(.925, .975);
    this.min = random(0.85, 0.9);
    this.lum = random(this.min, this.max);
    this.speed = random(0.0005, 0.0008) * (random(0, 1) > 0.5 ? 1 : -1);
    this.canvas = canvas;
    this.pos = x / canvas.width;
    this.color = rainbow[Math.floor(this.pos * rainbow.length)];
    this.dead = false;
    this.clicks = [];
  }

  draw = (ctx, ms, offset = {
    x: 0,
    y: 0
  }) => {
    this.lum += this.speed;
    if(this.lum >= this.max){
      this.speed = Math.abs(this.speed) * -1;
    }else if(this.lum <= this.min){
      this.speed = Math.abs(this.speed);
    }
    let clicklums = this.clicks.map(c=>{
      c.time += ms;
      let time = c.time - c.delay;
      if(time <= 0) return 0;
      c.progress = time / c.duration;
      let prog = (1-c.progress);
      return easeInCubic(prog) * this.lum * 1.25;
    });
    this.clicks = this.clicks.filter(c=>(c.progress || 0) < 1);
    let lum = Math.max(
      this.lum,
      ...clicklums
    );
    ctx.fillStyle = `rgb(${this.color.map(c=>c*lum).join(", ")})`;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  handleClick = (power, distance) => {
    if(this.dead) return;
    this.clicks.push({
      target: power,
      time: 0,
      delay: distance,
      duration: 2000
    });
  }

  kill = () => {
    this.dead = true;
  }
}

class TileBackground extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
    this.tiles = [];
    this.size = 25;
    this.radius = 150;
    this.lastframe = 0;
    this.offset = {
      x: 0,
      y: 0
    }
  }

  componentDidMount = () => {
    this.mounted = true;
    this.ctx = this.canvasRef.current.getContext("2d");
    this.handleResize();
    this.handleScroll();
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("mousemove", this.handleClick);
    requestAnimationFrame(this.handleFrame);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("mousemove", this.handleClick);
  }

  handleScroll = () => {
    this.offset = {
      x: -window.scrollX,
      y: -window.scrollY
    }
  }

  handleResize = () => {
    this.size = window.innerWidth > 768 ? 25 : 15;
    this.canvasRef.current.width = window.innerWidth;
    let docHeight = document.documentElement.scrollHeight;
    this.canvasRef.current.height = docHeight;
    this.tiles.forEach(t => t.kill());
    this.tiles = [];
    for (let i = 0; i < this.canvasRef.current.width / this.size; i++) {
      for (let j = 0; j < docHeight / this.size; j++) {
        this.tiles.push(new Tile(i * this.size, j * this.size, this.size, this.canvasRef.current));
      }
    }
  }

  handleClick = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    this.tiles.forEach(t=>{
      let dx = t.x - x + this.offset.x;
      let dy = t.y - y + this.offset.y;
      let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      if(distance > this.radius) return;
      let power = Math.min(1, (1.5 - (distance / this.radius)));
      t.handleClick(power, distance, this.offset);
    });
  }

  handleFrame = (ms) => {
    if(!this.mounted) return;
    if(Math.random() > 0.99){
      this.handleClick({
        clientX: random(0, window.innerWidth),
        clientY: random(0, window.innerHeight)
      });
    }
    let diff = ms - this.lastframe;
    this.ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    this.tiles.forEach(t => {
      t.draw(this.ctx, diff, this.offset);
    });
    requestAnimationFrame(this.handleFrame);
    this.lastframe = ms;
  }

  render() {
    return <canvas className={"absolute top-0 left-0 -z-10"} ref={this.canvasRef}/>
  }
}

export default TileBackground;
