//Game Code
 WebFontConfig = {

        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        //active: function() { game.time.events.add(Phaser.Timer.SECOND, , this); },
    
        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
          families: ['Revalia']
        }

    };
    
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

//global game variable
var game = {};

var defEngine;
var baseManager;
var shopManager;
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
        shopManager = ShopManager(game);
        
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

        game.stage.backgroundColor = '#FFFFFF';

        console.log("Defense started");
        game.physics.startSystem(Phaser.Physics.ARCADE);
        defEngine.Preload();
        shopManager.Preload();
    },
    
    create : function(){
        defEngine.OnCreate();
        shopManager.OnCreate();

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
    game.state.add('Preload', Preload);
    game.state.add('Defense', Defense);
    game.state.add('Customize', Customize);
    game.state.add('Shop', Shop);

    game.state.start('Boot');
}

