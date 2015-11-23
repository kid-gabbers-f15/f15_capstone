//Game Code
 WebFontConfig = {

        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        //active: function() { game.time.events.add(Phaser.Timer.SECOND, window.onload, this); },
    
        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
          families: ['Revalia']
        }

    };
    
function getCookie(cname) {
	if(user_player_state != undefined){
		return user_player_state;
	}
	
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

var maxWidth = 960;
var maxHeight = 540;

var loadingScreen = function(){
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
    LoadingText.anchor.setTo(0.5,0.5);
}

//Runs at start of game
var Boot = {
    //preload, create, update
    preload : function (){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too
        game.scale.setMinMax(800, 450, maxWidth, maxHeight);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        loadingScreen();
        
        var assetLoader = AssetLoader(game);
        assetLoader.Preload();
        
        var cookie = getCookie("PlayerState");
        if(cookie === ""){
            playerState = {};
            playerState.gold = 500;
            playerState.points = 0;
            playerState.unitSlots = 3;
            playerState.base = {};
                playerState.base.background = "BaseBackground1";
                playerState.base.totalSlots = 5;
                playerState.base.list = [];
            playerState.purchases = [];
        }else{
            playerState = JSON.parse(cookie);
        }
        
         //set the point of reference for the sprite
        //loadingScreen();

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
        game.scale.setMinMax(800, 450, maxWidth, maxHeight);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        console.log("Preload");
    },
    
    create : function(){
        defEngine = DefenseEngine(game);
        baseManager = BaseManager(game);
        shopManager = ShopManager(game);
        
    },
    
    update : function(){
        if(game.load.isLoading != true){
            game.state.start("Defense");
        }        
    }
    
};

//Main gameplay
var Defense = {
    //preload, create, update
    preload : function (){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too
        game.scale.setMinMax(800, 450, maxWidth, maxHeight);
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
        game.scale.setMinMax(800, 450, maxWidth, maxHeight);
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
        game.scale.setMinMax(800, 450, maxWidth, maxHeight);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
    },
    
    create : function(){

    }
    
};

//runs at start of game, begins game loop
function startGame() {
	if(KCG_ASSET_PATH === undefined){
		KCG_ASSET_PATH = 'Assets/';
	}
	if(KCG_SCRIPT_PATH === undefined){
		KCG_SCRIPT_PATH = 'Scripts/';
	}
	
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
	
	kcg_save_ajax();
}

function kcg_save_ajax(){
    var PlayerStateJSONString = JSON.stringify(playerState);
	data = {
		'action': 'kidgab_capstone_game_save_game_state',
		'kcg_game_state': PlayerStateJSONString,
		async : false
	};
	// since wp 2.8, ajaxurl is always defined in the admin header and points to admin-ajax.php
	jQueryA.post(ajaxurl, data, function(response) { // response should be a comma-separated list of 0s or 1s. 1s mean the username is taken.
		console.log('response: '+response);
	});
}