

var app = {

    NUM_PARTICLES   : 200,

    particleArray   : [],
    stage           : null,
    wind            :{
        max:1,
        min:0,
        direction:'both',
        force:Math.random()-0.5
    },

    init: function(){

        app.setupStage();
        app.setupTicker();
        app.createParticles();
        app.randomWind();

        setInterval(function(){

            //console.log(app.wind.force);

        },100);

    },

    randomWind:function(){

        var nWind = Math.random()-0.5;

        TweenLite.to(app.wind, Math.random()*3+2,
            {
                force:nWind,
                delay:Math.random()+1,
                onComplete:app.randomWind
            });

    },

    setupStage: function(){

        var $canvas = $('#snow-canvas');
        app.stage = new createjs.Stage($canvas[0]);

    },

    setupTicker: function(){

        if(!app.stage) throw new Error('Stage is not defined');

        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener('tick', app.stage);

    },
    createParticles: function(){

        while(app.NUM_PARTICLES--){

            var snow = new Snow(app.stage, app.wind);

            snow.particle.x = Math.random()*1000;
            snow.particle.y = Math.random()*500;

            app.particleArray.push(snow);

        }

    }

};

app.init();