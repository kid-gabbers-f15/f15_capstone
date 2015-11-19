//Game Code
 WebFontConfig = {

        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        //active: function() { game.time.events.add(Phaser.Timer.SECOND, Boot, this); },
    
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


var LoadingText;
var gradientText;

var defEngine;
var baseManager;
var shopManager;
//
var _friendBaseJSONstring = "";
var PlayerStateJSONString = "";
var playerState = {};

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
        
        var cookie = getCookie("PlayerState");
        if(cookie === ""){
            playerState = {};
            playerState.gold = 500;
            playerState.points = 0;
            playerState.unitSlots = 8;
            playerState.base = {};
                playerState.base.background = "BaseBackground1";
                playerState.base.totalSlots = 5;
                playerState.base.list = [];
            playerState.purchases = [];
        }else{
            playerState = JSON.parse(cookie);
        }
        
        LoadingText = game.add.text(game.world.width/2, game.world.height/2, "Loading...");
                    LoadingText.font = 'Revalia';
                    LoadingText.fontSize = 80;
                    gradientText = LoadingText.context.createLinearGradient(0, 0, 0, LoadingText.canvas.height);
                    gradientText.addColorStop(0, '#8ED6FF');   
                    gradientText.addColorStop(1, '#004CB3');
                    LoadingText.fill = gradientText;
                    LoadingText.align = 'center';
                    LoadingText.stroke = '#000000';
                    LoadingText.strokeThickness = 2;
                    LoadingText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        LoadingText.anchor.setTo(0.5,0.5); //set the point of reference for the sprite
        
        
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

function saveGame(){
    var PlayerStateJSONString = JSON.stringify(playerState);
    console.log(PlayerStateJSONString);

    document.cookie = "PlayerState=" + PlayerStateJSONString;
}