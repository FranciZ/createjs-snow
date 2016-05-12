/**
 * Snow
 * @param container
 * @constructor
 */
var Snow = function(container, wind){

    this.container = container;
    this.wind = wind;
    this.distance = Math.random()+0.3;

    this.microWind = {
        force:Math.random()-0.5
    };

    this._draw();
    this._randomWind();

    createjs.Ticker.addEventListener('tick', this._onAnimation.bind(this));

};


Snow.prototype._draw = function(){

    this.particle = new createjs.Container();
    this.particleContainer = new createjs.Container();


    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill('#000000');
    this.shape.graphics.drawCircle(0,0,5,20);
    this.shape.graphics.endFill();

    this.particle.regX = 7;
    this.particle.rotation = Math.random()*20;

    this.particle.scaleX = this.particle.scaleY = this.distance+0.3;

    this.particleContainer.addChild(this.particle);

    this.particle.addChild(this.shape);

    this.container.addChild(this.particle);

};

Snow.prototype._randomWind = function(){

    var nWind = Math.random()-0.5;

    TweenLite.to(this.microWind, Math.random()*2+1,
        {
            force:nWind,
            delay:Math.random()+1,
            onComplete:this._randomWind.bind(this)
        });

};

Snow.prototype.destroy = function(){



};

Snow.prototype._positionCheck = function(){

    if(this.particle.y > this.container.canvas.clientHeight+10){

        this._reset();

    }

    if(this.particle.x > this.container.canvas.clientWidth+10){

        this.particle.x = -10;

    }

    if(this.particle.x < -10){

        this.particle.x = this.container.canvas.clientWidth+10;

    }

};

Snow.prototype._reset = function(){

    this.distance = Math.random()+0.3;
    this.particle.y = -50;
    this.particle.scaleX = this.particle.scaleY = this.distance+0.3;

};

Snow.prototype._onAnimation = function(){

    this.particle.y += (1+this.distance)-this.wind.force/2;
    this.particle.x += (this.wind.force*10)*this.distance+this.microWind.force;

    this.particle.rotation += this.wind.force*Math.random()*20;

    this._positionCheck();

};






