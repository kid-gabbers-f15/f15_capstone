
//Game Code
var game = {};

var gameState = {};

//Runs at start of game
var Boot = function(game){
    //preload, create, update
    var preload = function(){
        
    }
    
    var create = function(){
        game.state.start("Menu");        
    }
    
}

//Menu
var Menu = function(game){
    var block = {};
    
    //preload, create, update
    var preload = function(){
            
    }
    
    var create = function(){
        
    }
    
    var update = function(){
        console.log("Menu");
    }
}


//Loads all assets
var Preload = function (game){
    //preload, create, update
    var preload = function(){
        
    }
    
    var create = function(){
        
    }
    
    var update = function(){
        
    }
    
}


//Main gameplay
var Defense = function(game){
    var preload = function(){
        
    }
    
    var create = function(){
        
    }
    
    var update = function(){
        
    }    
}

//customization of area
var Customize = function(game){
    var preload = function(){
        
    }
    
    var create = function(){
        
    }
    
    var update = function(){
        
    }
}

var Shop = function(game){
    //preload, create, update
    var preload = function(){
        
    }
    
    var create = function(){
        
    }
    
    var update = function(){
        
    }
}

//runs at start of game, begins game loop
function startGame() {
    console.log("adding load event");
    var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'gameContainer')
    
    game.state.add('Boot', Boot);
    game.state.add('Menu', Menu);
    game.state.add('Preload', Preload);
    game.state.add('Defense', Defense);
    game.state.add('Customize', Customize);
    game.state.add('Shop', Shop);

    game.state.start('Boot');
}

startGame();
