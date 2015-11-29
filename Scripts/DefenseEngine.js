var DefenseEngine = function (game){
    var that = {};
    
    var background; // string, name of background picture
    var topBaseCollision; // object, sprite for things to hit at the bottom of the base
    var enemyManager; // object, instance of EnemyManager
    var player; // object, instance of Player
    var unitGroup; // phaser group, group of unit sprites? Objects?
    var enemypGroup; // phaser group, group of enemy sprites
    var resourceText; // phaser text, displays amount of gold
    var shopbutton; // phaser text, button to go to shop
    var pausebutton; // phaser text, button to pause the game
    var baseButton; // phaser text, button to go to the base builder
    var startButton; // phaser text, button to start the game
    var friendBaseData; // JSON string, JSON representing the friend's base you are defending
    var pausetext; // phaser text, 'PAUSED' that pops up when the game is paused
    var grd; // phaser color gradient, used for a color gradient on text
    var playerBaseData; // JSON string, JSON representing the player's base
    var unitSlots; // phaser sprite, changes based on how many unit slots player has unlocked.
    var globalHealth = 100; // int, overall game health value, lose when zero
    var globalHealthBar; // sprite, visual representation of globalHealth
    var friendBaseTarget = {};
    
    /*
    base - object, player's base
    */
    function loadPlayerBase(base){
        var bg = game.add.sprite(game.world.centerX, game.world.centerY/2, base.background);
        bg.anchor.setTo(.5, .5);
        bg.crop(new Phaser.Rectangle(0, 0, 800, 600));
        bg.scale.setTo(.75, .75);
        for(var i = 0; i < base.list.length; ++i){
            var temp = game.add.sprite((base.list[i].position.x - 130)/2 + game.world.centerX/2,  (base.list[i].position.y + 110)/2, base.list[i].image);
            temp.anchor.setTo(0.5, 0.5);
            temp.scale.setTo(0.5, 0.5);
        }
    }
    
    /*
    base - object, friend's base
    */
    function loadFriendBase(base){
        var bg = game.add.sprite(game.world.centerX/2 - 150, game.world.centerY + game.world.centerY/2, base.background);
        bg.anchor.setTo(.5, .5);
        bg.crop(new Phaser.Rectangle(0, 0, 800, 600));
        bg.scale.setTo(.75, .75);
        for(var i = 0; i < base.list.length; ++i){
            var temp = game.add.sprite((base.list[i].position.x-130)/2 - 150, (base.list[i].position.y + 110)/2 + game.world.centerY, base.list[i].image);
            temp.anchor.setTo(0.5, 0.5);
            temp.scale.setTo(0.5, 0.5);
        }
        
        game.physics.enable(bg, Phaser.Physics.ARCADE);
        bg.body.immovable = true;
        
        friendBaseTarget = Unit(null, game);
        friendBaseTarget.setUnitSprite(bg);
        friendBaseTarget.setAsBase();
        var txt = game.add.text(50, 10, "");
        txt.alpha = 0;
        friendBaseTarget.setText(txt);
        player.getUnitPGroup().push(friendBaseTarget);
    }
    
    function Preload(){
        //loading background image
        console.log("Preload for defense engine");
        game.load.image('background', KCG_ASSET_PATH+'MainPageBG.png');
        game.load.image('topBaseCollision', KCG_ASSET_PATH+'TopBaseImage.png');
        game.load.image('topBaseBackground', KCG_ASSET_PATH+'TopBaseImage.png');
        game.load.image('whiteBox', KCG_ASSET_PATH+'whiteBox.png');
        
        enemyManager = EnemyManager(game);
        enemyManager.Preload();
        
        player = Player(game);
        player.Preload();
        
        game.load.text('JSONfriendBaseData', KCG_SCRIPT_PATH+'json2.txt');
        //game.load.text('JSONplayerBaseData', 'Scripts/json.txt');
        
        //shopManager.Preload();
    }
    
    function OnCreate(){
        //drawing background
        background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        background.anchor.setTo(0.5, 0.5);
        background.crop(new Phaser.Rectangle(0, 540, 1920, 1080));
        
        var whiteBox1 = game.add.sprite(game.world.centerX, game.world.centerY + game.world.centerY/2, 'whiteBox');
        whiteBox1.anchor.setTo(0.5, 0.5);
        whiteBox1.crop(new Phaser.Rectangle(0, 0, 1820, 480));
        whiteBox1.alpha = .8;
        
        var whiteBox2 = game.add.sprite(game.world.centerX, game.world.centerY/2, 'whiteBox');
        whiteBox2.anchor.setTo(0.5, 0.5);
        whiteBox2.crop(new Phaser.Rectangle(0, 0, 1820, 480));
        whiteBox2.alpha = .8;
        
        unitSlots = game.add.sprite(1100, 860, 'unitSlot' + playerState.unitSlots);
        unitSlots.anchor.setTo(.5, .5);
        unitSlots.scale.setTo(1.2,1.2);
         
        //create a sprite to act as the area for the user's base
        //this 'windows' the base from other elements in the game 
        topBaseCollision = game.add.sprite(0,0,'topBaseCollision');
        topBaseCollision.isActive = true;
        topBaseCollision.alpha = 0;
        game.physics.enable(topBaseCollision, Phaser.Physics.ARCADE);
        topBaseCollision.body.immovable = true;
        topBaseCollision.scale.setTo(2,1.0555);
        
        //create menu buttons - pause, open menu, base
        createButtons();
        //should the game be paused, listen for a click on the game to unpause
        game.input.onDown.add(unpause, self);
        function unpause(event){
            if(game.paused){
                    game.paused = false;
                    pausetext.destroy();
            }
        }
        //text displaying the current amount of resource
        resourceText = game.add.text(50, 10, "Gold: " + playerState.gold);
        resourceText.font = 'Revalia';
        resourceText.fontSize = 60;
        grd = resourceText.context.createLinearGradient(0, 0, 0, resourceText.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        resourceText.fill = grd;
        resourceText.align = 'center';
        resourceText.stroke = '#000000';
        resourceText.strokeThickness = 2;
        resourceText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        unitGroup = game.add.group();
        enemypGroup = game.add.group();

        player.OnCreate(unitGroup, enemypGroup);
        enemyManager.OnCreate(unitGroup, enemypGroup);
        
        //friend base building
        friendBaseData = JSON.parse(game.cache.getText('JSONfriendBaseData'));
        loadFriendBase(friendBaseData);
        
        //player base building
        loadPlayerBase(playerState.base);
        
        // Health bar for friends base
        globalHealthBar = game.add.sprite(75, 580, 'baseHealthBar');
        globalHealthBar.crop(new Phaser.Rectangle(0, 0, 1000, 20));
    }
    
    function Update(){
        //check for collision with enemies with base window
        var enemyGroup = getEnemyManager().getEgroup();
        game.physics.arcade.collide(topBaseCollision, enemyGroup);

        enemyManager.Update();
        player.Update();
        updateResource();
        
        globalHealthBar.crop(new Phaser.Rectangle(0, 0, 500 * globalHealth/100, 20));
    }
    
    function addUnit(){
        unitSlots.loadTexture('unitSlot' + playerState.unitSlots);
        player.addSlot(unitGroup);
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
    function updateResource(){
        resourceText.setText("Gold: " + playerState.gold);
    }
    function addGold(amount){
        playerState.gold = playerState.gold + amount;
    }
    function getGold(){
        return playerState.gold;
    }
    function spendGold(amount){
        playerState.gold = playerState.gold - amount;
    }
    
    // amount - int, how much something costs
    function canAfford(amount){
        if(playerState.gold - amount >= 0)
        {
            return true;   
        }
        else
            return false;
    }
    
    // damage - int, damage to deal to globalHealth
    function damageGlobalHealth(damage){
        globalHealth -= damage;
        console.log(globalHealth);
    }
    
    function createButtons(){
        //pause button creation
        pausebutton = game.add.text(50, 65, "Pause");
        pausebutton.font = 'Revalia';
        pausebutton.fontSize = 60;
        grd = pausebutton.context.createLinearGradient(0, 0, 0, pausebutton.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        pausebutton.fill = grd;
        pausebutton.align = 'center';
        pausebutton.stroke = '#000000';
        pausebutton.strokeThickness = 2;
        pausebutton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        pausebutton.inputEnabled = true;
        pausebutton.events.onInputOver.add(function(){
            pausebutton.fill = '#ff00ff';
        }, this);
        pausebutton.events.onInputOut.add(function(){
            pausebutton.fill = grd;
        }, this);
        
        pausebutton.events.onInputDown.add(function(){
            pausebutton.fill = grd;
            game.paused = true; 
            pausetext = game.add.text(game.world.centerX, game.world.centerY, "PAUSED");
            pausetext.anchor.setTo(0.5,0.5);
            pausetext.font = 'Revalia';
            pausetext.fontSize = 60;
            grd = pausetext.context.createLinearGradient(0, 0, 0, pausetext.canvas.height);
            grd.addColorStop(0, '#8ED6FF');   
            grd.addColorStop(1, '#004CB3');
            pausetext.fill = grd;
            pausetext.align = 'center';
            pausetext.stroke = '#000000';
            pausetext.strokeThickness = 2;
            pausetext.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        });
        
        //shop button creation
        shopbutton = game.add.text(50, 130, "Open Shop");
        shopbutton.font = 'Revalia';
        shopbutton.fontSize = 60;
        grd = shopbutton.context.createLinearGradient(0, 0, 0, shopbutton.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        shopbutton.fill = grd;
        shopbutton.align = 'center';
        shopbutton.stroke = '#000000';
        shopbutton.strokeThickness = 2;
        shopbutton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        shopbutton.inputEnabled = true;
        shopbutton.events.onInputOver.add(function(){
            shopbutton.fill = '#ff00ff';
        }, this);
        shopbutton.events.onInputOut.add(function(){
            shopbutton.fill = grd;
        }, this);
        
        shopbutton.events.onInputDown.add(function(){
            if(shopManager.getShowShop() == false){
                shopManager.openShop();
            }
        });
        
        //base button creation
        baseButton = game.add.text(50, 200, "Base");
        baseButton.font = 'Revalia';
        baseButton.fontSize = 60;
        grd = baseButton.context.createLinearGradient(0, 0, 0, baseButton.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        baseButton.fill = grd;
        baseButton.align = 'center';
        baseButton.stroke = '#000000';
        baseButton.strokeThickness = 2;
        baseButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        baseButton.inputEnabled = true;
        baseButton.events.onInputOver.add(function(){
            baseButton.fill = '#ff00ff';
        }, this);
        baseButton.events.onInputOut.add(function(){
            baseButton.fill = grd;
        }, this);
        
        baseButton.events.onInputDown.add(function(){
            game.state.start("Customize");
        });
        
        // Start button creation
        startButton = game.add.text(1300, 800, "Start");
        startButton.font = 'Revalia';
        startButton.fontSize = 60;
        grd = startButton.context.createLinearGradient(0, 0, 0, startButton.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        startButton.fill = grd;
        startButton.align = 'center';
        startButton.stroke = '#000000';
        startButton.strokeThickness = 2;
        startButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        startButton.inputEnabled = true;
        startButton.events.onInputOver.add(function(){
            startButton.fill = '#ff00ff';
        }, this);
        startButton.events.onInputOut.add(function(){
            startButton.fill = grd;
        }, this);
        
        startButton.events.onInputDown.add(function(){
            enemyManager.startGame();
            startButton.visible = false;
        });
    }
    
    
    that.setGlobalHealth = function(h){globalHealth = h;}
    that.addUnit = addUnit;
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getEnemyManager = getEnemyManager;
    that.getPlayer = getPlayer;
    that.getTopBaseCollision = getTopBaseCollision;
    that.updateResource = updateResource;
    that.addGold = addGold;
    that.getGold = getGold;
    that.spendGold = spendGold;
    that.canAfford = canAfford;
    that.damageGlobalHealth = damageGlobalHealth;
    that.friendBaseTarget = function(){return friendBaseTarget;}
    
    return that;
}
