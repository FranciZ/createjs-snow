

var app = {

    NUM_PARTICLES   : 50,

    particleArray   : [],
    stage           : null,

    init: function(){

        app.setupStage();
        app.setupTicker();
        app.createParticles();

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

            var snow = new Snow(app.stage);

            snow.particle.x = Math.random()*1000;
            snow.particle.y = Math.random()*1000;

            app.particleArray.push(snow);

        }

    }

};

app.init();