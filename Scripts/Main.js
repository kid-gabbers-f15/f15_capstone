//Game Code

//global game variable
var game = {};

var defEngine;
var baseManager;
//
var _baseJSONstring = "";

//Runs at start of game
var Boot = {
    //preload, create, update
    preload : function (){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too
        game.scale.setMinMax(800, 450, 1920, 1080);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
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
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too
        game.scale.setMinMax(800, 450, 1920, 1080);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;        
        
        console.log("Menu");
        game.load.image('logo', 'Assets/phaser.png');
        game.load.image('background', 'Assets/BackgroundKidGabTemplate.png');
        game.load.image('image1', 'Assets/Placeholder1.png');
        game.load.image('image2', 'Assets/Placeholder2.png');

    },
    
    create : function(){
        var bg = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        bg.anchor.setTo(0.5, 0.5);
        
        var button1 = game.add.sprite(game.world.centerX, game.world.centerY + 100, 'image1');
        game.add.text(game.world.centerX + 50, game.world.centerY + 100, "Start Defense");
        button1.inputEnabled = true;
        button1.events.onInputDown.add(function(){
            game.state.start('PreloadDefense');
        });
        
        var button2 = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'image1');
        game.add.text(game.world.centerX + 50, game.world.centerY - 100, "Start Customize");
        button2.inputEnabled = true;
        button2.events.onInputDown.add(function(){
            game.state.start('PreloadCustomize');
        });
        
        game.state.start("Preload");
        
    }
    
};


//Loads all assets
var PreloadDefense = {
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

var PreloadCustomize = {
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
        
        game.state.start("Customize");
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
    game.state.add('Menu', Menu);
    game.state.add('PreloadDefense', PreloadDefense);
    game.state.add('PreloadCustomize', PreloadCustomize);
    game.state.add('Defense', Defense);
    game.state.add('Customize', Customize);
    game.state.add('Shop', Shop);

    game.state.start('Boot');
}

