//Game Code

//global game variable
var game = {};

var defEngine;

//Runs at start of game
var Boot = {
    //preload, create, update
    preload : function (){
        console.log("Boot");
    },
    
    create : function(){
        game.state.start("Menu");        
    }
    
};

//Menu
var Menu = {
    //preload, create, update
    preload : function (){
        console.log("Menu");
        game.load.image('logo', 'Assets/phaser.png');

    },
    
    create : function(){
        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        
        game.state.start("Preload");

    }
    
};


//Loads all assets
var Preload = {
    //preload, create, update
    preload : function (){

    },
    
    create : function(){
        defEngine = DefenseEngine();

        game.state.start("Defense");
    }
    
};


//Main gameplay
var Defense = {
    //preload, create, update
    preload : function (){
        defEngine.Preload();
    },
    
    create : function(){
        defEngine.OnCreate();
    },
    
    update : function (){
        defEngine.Update();
    }
    
};

//customization of area
var Customize = {
    //preload, create, update
    preload : function (){
        console.log("Boot");
    },
    
    create : function(){
        //game.state.start("Menu");        
    }
    
};

var Shop = {
    //preload, create, update
    preload : function (){

    },
    
    create : function(){

    }
    
};

//runs at start of game, begins game loop
function startGame() {
    game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'gameContainer')
    
    game.state.add('Boot', Boot);
    game.state.add('Menu', Menu);
    game.state.add('Preload', Preload);
    game.state.add('Defense', Defense);
    game.state.add('Customize', Customize);
    game.state.add('Shop', Shop);

    game.state.start('Boot');
}

