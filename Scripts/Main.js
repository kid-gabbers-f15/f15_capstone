//Game Code

//global game variable
var game = {};

var defEngine;
var baseManager;
//
var _friendBaseJSONstring = "";
var _playerBaseJSONstring = "";

//Runs at start of game
var Boot = {
    //preload, create, update
    preload : function (){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too
        game.scale.setMinMax(800, 450, 1920, 1080);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        var assetLoader = AssetLoader(game);
        assetLoader.Preload();
        
        console.log("Boot");
    },
    
    create : function(){
        game.state.start("Preload");        
    }
    
};

//Loads all assets
var Preload = {
    //preload, create, update
    preload : function (){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too
        game.scale.setMinMax(800, 450, 1920, 1080);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        console.log("Preload");
    },
    
    create : function(){
        defEngine = DefenseEngine(game);
        baseManager = BaseManager(game);
        
        game.state.start("Defense");
    }
    
};

//Main gameplay
var Defense = {
    //preload, create, update
    preload : function (){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too
        game.scale.setMinMax(800, 450, 1920, 1080);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.stage.backgroundColor = '#098AC3';

        console.log("Defense started");
        game.physics.startSystem(Phaser.Physics.ARCADE);
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
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too
        game.scale.setMinMax(800, 450, 1920, 1080);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        console.log("Customize started");
        baseManager.Preload();
    },
    
    create : function(){
        baseManager.OnCreate();
    },
    
    update : function(){
        baseManager.Update();
    }
    
};

var Shop = {
    //preload, create, update
    preload : function (){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too
        game.scale.setMinMax(800, 450, 1920, 1080);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
    },
    
    create : function(){

    }
    
};

//runs at start of game, begins game loop
function startGame() {
    game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'gameContainer')
    
    game.state.add('Boot', Boot);
    game.state.add('PreloadDefense', Preload);
    game.state.add('Defense', Defense);
    game.state.add('Customize', Customize);
    game.state.add('Shop', Shop);

    game.state.start('Boot');
}

