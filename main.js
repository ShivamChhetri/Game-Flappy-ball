const canvas= document.querySelector('canvas');
let W= window.innerWidth;
let H= window.innerHeight-100;
canvas.width=W;
canvas.height=H;

let c= canvas.getContext('2d');

class Bird{
    constructor(){
        this.x=250;
        this.y=250;
        this.r=25;
        this.dy=4;
        this.jump=80;
    }
    getpos(){
        return{
            bx:this.x,
            by:this.y,
            br:this.r
        }
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,2*Math.PI,false);
        c.fillStyle="yellow";
        c.fill();
    }
    update(){
        this.y+=this.dy;
        this.draw();
    }
    moveup(){
        this.y-=this.jump;
    }
}

class Poles{
    constructor(){
        this.x1=W/2+100;
        this.x2=W+100;
        this.y=0;
        this.w=50;
        this.h1=Math.random()*200+100;
        this.h2=Math.random()*200+100;
        this.space= 165;
        this.dx=5;
        this.score=0;
        this.audio= document.createElement("audio");
    }
    draw(){
        // c.beginPath();
        c.fillStyle="green";
        c.fillRect(this.x1,this.y,this.w,this.h1);
        c.fillRect(this.x1,this.h1+this.space,this.w,H-this.h1-this.space);
        c.fillRect(this.x2,this.y,this.w,this.h2);
        c.fillRect(this.x2,this.h2+this.space,this.w,H-this.h2-this.space);
        c.font= "bold 50px Arial";
        c.fillStyle="black";
        c.fillText(Math.floor(this.score/36+1)-1,120,50);
    }
    check(pos){
        if(pos.by+pos.br>H){
            return true;
        }
        if(pos.bx+pos.br>this.x1 && pos.bx-pos.br<this.x1+this.w){
            if(pos.by<this.h1 || pos.by+pos.br>this.h1+this.space){
                return true;
            }
        }
        if(pos.bx+pos.br>this.x2 && pos.bx-pos.br<this.x2+this.w){
            if(pos.by<this.h2 || pos.by+pos.br>this.h2+this.space){
                return true;
            }
        }
        return false;
    }
    update(pos){
        if(pos.bx>this.x1 || pos.bx-pos.br>this.x2+this.w){
            this.score++;
        }
        if(this.check(pos)){
            let scor=Math.floor(this.score/36+1)-1;
            this.sound();
            cancelAnimationFrame(animation);
            alert("Your score:"+scor+"\ngame over");
            location.reload();
        }
        if(this.x1+this.w<0){
            this.x1=W+100;
            this.h1=Math.random()*250+100;
        }
        if(this.x2+this.w<0){
            this.x2=W+100;
            this.h2=Math.random()*250+100;
        }
        this.x1-=this.dx;
        this.x2-=this.dx;
        this.draw();
    }
    sound(){
        this.audio.src="ding.mp3";
        this.audio.setAttribute("preload","auto");
        this.audio.setAttribute("controls","none");
        this.audio.style.display="none";
        document.body.appendChild(this.audio);
        this.audio.play();
    }
}



let bird= new Bird();
let pole= new Poles();
let animation;

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight);
    animation=requestAnimationFrame(animate);
    let pos= bird.getpos();
    pole.update(pos);
    bird.update();
}


let start= document.getElementById("start");
let welcome= document.getElementById("welcome");
start.addEventListener("click",()=>{
    welcome.style.display="none";
    canvas.style.display="block";
    animate();
});

document.addEventListener('keydown',(event)=>{
    if(event.key===" "){
        bird.moveup();
    }
});