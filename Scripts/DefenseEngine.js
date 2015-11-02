var DefenseEngine = function (game){
    var that = {};
    
    var background;
    var topBaseCollision;
    
    var enemyManager;
    var player;
    
    var unitGroup;
    var enemypGroup;
    var gold;
    var goldText;
    var shopbutton;
    var pausebutton;
    var friendBaseData;
    var pausetext;
    var shopmenu;
    var topBaseBackground;
    
    function loadPlayerBase(base){
        for(var i = 0; i < base.list.length; ++i){
            var temp = game.add.sprite(base.list[i].position.x/2 + game.world.centerX/2, base.list[i].position.y/2, base.list[i].image);
            temp.anchor.setTo(0.5, 0.5);
            temp.scale.setTo(0.5, 0.5);
        }
    }
    function loadFriendBase(base){
        for(var i = 0; i < base.list.length; ++i){
            var temp = game.add.sprite(base.list[i].position.x/2, base.list[i].position.y/2 + game.world.centerY, base.list[i].image);
            temp.anchor.setTo(0.5, 0.5);
            temp.scale.setTo(0.5, 0.5);
        }
    }
    
    function Preload(){
        //loading background image
        console.log("Preload for defense engine");
        game.load.image('background', 'Assets/BackgroundKidGabTemplate.png');
        game.load.image('topBaseCollision', 'Assets/TopBaseImage.png');
        game.load.image('topBaseBackground', 'Assets/TopBaseImage.png');

        enemyManager = EnemyManager(game);
        enemyManager.Preload();
        
        player = Player(game);
        player.Preload();
        
        game.load.image('unit', "Assets/Placeholder1.png");

        game.load.text('JSONfriendBaseData', 'Scripts/json.txt');
        game.load.text('JSONplayerBaseData', 'Scripts/json.txt');
        
        game.load.image('image1', 'Assets/Placeholder1.png');
        game.load.image('image2', 'Assets/Placeholder2.png');
        game.load.image('image3', 'Assets/Placeholder3.png');
        game.load.image('image4', 'Assets/Placeholder4.png');

    }
    
    function OnCreate(){
        gold = 500;
        //drawing background
        background = game.add.sprite(game.world.centerX, game.world.centerY + game.world.centerY/2, 'background');
        background.anchor.setTo(0.5, 0.5);
        background.crop(new Phaser.Rectangle(0, 540, 1920, 1080));
        //create a sprite to act as the area for the user's base
        //this 'windows' the base from other elements in the game 
        
        topBaseBackground = game.add.sprite(0,0,'topBaseBackground');
        topBaseBackground.scale.setTo(2,1.0555);
        
       // topBase = game.add.sprite(game.world.centerX/2, 10, 'topBase');
       topBaseCollision = game.add.sprite(0,0,'topBaseCollision');
        topBaseCollision.isActive = true;
        topBaseCollision.visible = false;
        game.physics.enable(topBaseCollision, Phaser.Physics.ARCADE);
        topBaseCollision.body.immovable = true;
        topBaseCollision.scale.setTo(2,1.0555);
        
        //friend base building
        friendBaseData = JSON.parse(game.cache.getText('JSONfriendBaseData'));
        console.log(friendBaseData);
        loadFriendBase(friendBaseData);
        playerBaseData = JSON.parse(game.cache.getText('JSONplayerBaseData'));
        console.log(playerBaseData);
        loadPlayerBase(playerBaseData);
        
        pausebutton = game.add.text(0, 50, 'Pause', {font: "65px Arial", fill: "#ff0044"});
        pausebutton.inputEnabled = true;
        
        pausebutton.events.onInputUp.add(function(){
           game.paused = true; 
           pausetext = game.add.text(game.world.centerX, game.world.centerY, "PAUSED", { font: "65px Arial", fill: "#ff0044", align: "center" });
            pausetext.anchor.setTo(0.5,0.5);
            
        });
        game.input.onDown.add(unpause, self);
        function unpause(event){
            if(game.paused){
                game.paused = false;
                pausetext.destroy();
            }
        }
        
        shopbutton = game.add.text(0, 100, 'Shop', {font: "65px Arial", fill: "#ff0044"});
        shopbutton.inputEnabled = true;
        
        
        shopbutton.events.onInputUp.add(function(){
           game.paused = true; 
           pausetext = game.add.text(game.world.width - 300, 0, "PAUSED", { font: "65px Arial", fill: "#ff0044", align: "center" });
            //pausetext.anchor.setTo(0.5,0.5);
            shopmenu = game.add.sprite(game.world.centerX, game.world.centerY, 'image3');
            shopmenu.anchor.setTo(0.5,0.5);
            shopmenu.scale.setTo(10,10);
            
            
        });
        game.input.onDown.add(unpause, self);
        function unpause(event){
            if(game.paused){
                game.paused = false;
                pausetext.destroy();
                shopmenu.destroy();
            }
        }
        
        goldText = game.add.text(0, 0, "Gold: " + gold, { font: "65px Arial", fill: "#ff0044", align: "center" });
        
        unitGroup = game.add.group();
        enemypGroup = game.add.group();

        player.OnCreate(unitGroup, enemypGroup);
        enemyManager.OnCreate(unitGroup, enemypGroup);
    }
    
    function Update(){
        //check for collision with enemies with base window
        var enemyGroup = getEnemyManager().getEgroup();
        game.physics.arcade.collide(topBaseCollision, enemyGroup);
            enemyManager.Update();
            player.Update();
            updateGold();
    }
    
    function getEnemyManager(){
        return enemyManager;
    }
    
    function getPlayer(){
        return player;
    }
    function getTopBaseCollision(){
        return topBaseCollision;
    }
    function updateGold(){
        goldText.setText("Gold: " + gold);
    }
    function addGold(amount){
        gold = gold + amount;
    }
    function getGold(){
        return gold;
    }
    function spendGold(amount){
        gold = gold - amount;
    }
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getEnemyManager = getEnemyManager;
    that.getPlayer = getPlayer;
    that.getTopBaseCollision = getTopBaseCollision;
    that.updateGold = updateGold;
    that.addGold = addGold;
    that.getGold = getGold;
    that.spendGold = spendGold;
    
    return that;
}