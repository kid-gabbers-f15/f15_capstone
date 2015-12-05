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
    var grd, grd2, grd3, grd5, grd6, grdr, grds; // phaser color gradient, used for a color gradient on text
    var playerBaseData; // JSON string, JSON representing the player's base
    var unitSlots; // phaser sprite, changes based on how many unit slots player has unlocked.
    var globalHealth = 100; // int, overall game health value, lose when zero
    var globalHealthBar; // sprite, visual representation of globalHealth
    var friendBaseTarget = {};
    var gameOverText; // phaser text, displays when the game is over
    var gameOver = false; // whether the game is over or not
    var resume_sfx, pling_sfx, mclick_sfx; // sound effects
    var toolbar;
    var baseHealthText;
    var maxGlobalHealth;
    var stats, line, scoreText;
    var score = 0;
    
    var unitSprite;
    
    /*
    base - object, player's base
    */
    function loadPlayerBase(base){
        var bg = game.add.sprite(game.world.centerX - 150, game.world.centerY/2, base.background);
        bg.anchor.setTo(.5, .5);
        bg.crop(new Phaser.Rectangle(0, 0, 800, 600));
        bg.scale.setTo(.75, .75);
        for(var i = 0; i < base.list.length; ++i){
            var temp = game.add.sprite((base.list[i].position.x - 130)/2 + game.world.centerX/2 - 150,  (base.list[i].position.y + 110)/2, base.list[i].image);
            temp.anchor.setTo(0.5, 0.5);
            temp.scale.setTo(0.5, 0.5);
        }
    }
    
    /*
    base - object, friend's base
    */
    function loadFriendBase(base){
        var bg = game.add.sprite(game.world.centerX/2 - 150, game.world.centerY + game.world.centerY/2 + 25, base.background);
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
        
        player = Player(game);
        player.Preload();
        
        enemyManager = EnemyManager(game);
        enemyManager.Preload();
        
        toolbar = UnitToolbar(game, this);
        toolbar.Preload();
        
        game.load.text('JSONfriendBaseData', KCG_SCRIPT_PATH+'json2.txt');
        //game.load.text('JSONplayerBaseData', 'Scripts/json.txt');
        
        //shopManager.Preload();
    }
    
    function OnCreate(){
        maxGlobalHealth = 100;
        shopMenuItems = JSON.parse(game.cache.getText('JSONshopMenuItems'));

        //drawing background
        background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        background.anchor.setTo(0.5, 0.5);
        background.crop(new Phaser.Rectangle(0, 540, 1920, 1080));
        background.inputEnabled = true;
        background.events.onInputDown.add(function(){
            toolbar.hideToolbar();
        })
        
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
            if(game.paused && gameOver==false){
                    game.paused = false;
                    pausetext.destroy();
                    resume_sfx.play();
            }
        }
        //text displaying the current amount of resource
        resourceText = game.add.text(60, 335, "Cash: " + playerState.gold);
        resourceText.font = 'Revalia';
        resourceText.fontSize = 45;
        grd = resourceText.context.createLinearGradient(0, 0, 0, resourceText.canvas.height);
        grd.addColorStop(0, '#016dff');   
        grd.addColorStop(1, '#016dff');
        grdr = resourceText.context.createLinearGradient(0, 0, 0, resourceText.canvas.height);
        grdr.addColorStop(0, '#fff08e');   
        grdr.addColorStop(1, '#f0d431');
        grd2 = resourceText.context.createLinearGradient(0, 0, 0, resourceText.canvas.height);
        grd2.addColorStop(0, '#fff08e');   
        grd2.addColorStop(1, '#a6b300');
        resourceText.fill = grdr;
        resourceText.align = 'center';
        resourceText.stroke = '#000000';
        resourceText.strokeThickness = 4;
        resourceText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        stats = game.add.text(60, 255, "Stats");
        stats.font = 'Revalia';
        stats.fontSize = 55;
        stats.fill = grd;
        stats.align = 'center';
        stats.stroke = '#000000';
        stats.strokeThickness = 4;
        stats.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        line = game.add.text(60, 275, "_____");
        line.font = 'Revalia';
        line.fontSize = 50;
        line.fill = grd;
        line.align = 'center';
        line.stroke = '#000000';
        line.strokeThickness = 4;
        line.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        scoreText = game.add.text(60, 435, "Score: " + score);
        scoreText.font = 'Revalia';
        scoreText.fontSize = 45;
        grds = scoreText.context.createLinearGradient(0, 0, 0, scoreText.canvas.height);
        grds.addColorStop(0, '#e544ff');   
        grds.addColorStop(1, '#a800c3');
        scoreText.fill = grds;
        scoreText.align = 'center';
        scoreText.stroke = '#000000';
        scoreText.strokeThickness = 4;
        scoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        unitGroup = game.add.group();
        enemypGroup = game.add.group();

        player.OnCreate(unitGroup, enemypGroup);
        enemyManager.OnCreate(unitGroup, enemypGroup);
        
        //friend base building
        friendBaseData = JSON.parse(game.cache.getText('JSONfriendBaseData'));
        loadFriendBase(friendBaseData);
        
        //player base building
        loadPlayerBase(playerState.base);
        

        // Health for friends base
        globalHealthBar = game.add.sprite(75, 605, 'baseHealthBar');
        globalHealthBar.crop(new Phaser.Rectangle(0, 0, 1000, 20));
        baseHealthText = game.add.text(275, 567, globalHealth + " / " + maxGlobalHealth);
        baseHealthText.fill = '#10de14';
        baseHealthText.stroke = '#000000';
        baseHealthText.strokeThickness = 10;
        
        resume_sfx = game.add.audio('rsound');
        pling_sfx = game.add.audio('pling');
        mclick_sfx = game.add.audio('button_click');
        
        //game.sound.setDecodedCallback([pause_sfx], start, this);
        
        toolTips = game.add.text(game.input.mousePointer.x + 25, game.input.mousePointer.y - 25, "");
        toolTips.font = 'Revalia';
        toolTips.fontSize = 30;
        toolTips.fill = grd2;
        toolTips.align = 'center';
        toolTips.stroke = '#000000';
        toolTips.strokeThickness = 4;
        toolTips.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        toolTips.visible = false;
        toolbar.OnCreate();
        toolbar.hideToolbar();
    }
    
    function Update(){
        toolTips.position.x = game.input.mousePointer.x + 25;
        toolTips.position.y = game.input.mousePointer.y - 25;
        
        //check for collision with enemies with base window
        var enemyGroup = getEnemyManager().getEgroup();
        game.physics.arcade.collide(topBaseCollision, enemyGroup);

        player.Update();
        enemyManager.Update();
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
        resourceText.setText("Cash: " + playerState.gold);
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
    function updateScore(points)
    {
        score = score + points;
        scoreText.setText("Score: " + score);
    }
    function getGlobalHealth()
    {
        return globalHealth;
    }
    function getMaxGlobalHealth()
    {
        return maxGlobalHealth;
    }
    // damage - int, damage to deal to globalHealth
    function damageGlobalHealth(damage){
        globalHealth -= damage;
        baseHealthText.setText(globalHealth + " / " + maxGlobalHealth);
        
        if(globalHealth <= 0){
            globalHealth = 0;
            gameOver = true;
            //enemyManager.endGame();
            
            game.paused = true;
            
            //game over text
            gameOverText = game.add.text(game.world.centerX, game.world.centerY, "Game Over");
            gameOverText.font = 'Revalia';
            gameOverText.fontSize = 100;
            grd = gameOverText.context.createLinearGradient(0, 0, 0, gameOverText.canvas.height);
            grd.addColorStop(0, '#016dff');   
            grd.addColorStop(1, '#016dff');
            gameOverText.fill = grd;
            gameOverText.align = 'center';
            gameOverText.stroke = '#000000';
            gameOverText.strokeThickness = 4;
            gameOverText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            gameOverText.inputEnabled = false;
        }
        else
        {
            if(globalHealth < (3/4) * maxGlobalHealth && globalHealth > (1/2) * maxGlobalHealth)
            {
                baseHealthText.fill = '#dade10';
            }
            else if(globalHealth < (1/2) * maxGlobalHealth && globalHealth > (1/4) * maxGlobalHealth)
            {
                baseHealthText.fill = '#de7b10';
            }
            else if(globalHealth < (1/4) * maxGlobalHealth)
            {
                baseHealthText.fill = '#de1410';
            }
        }
    }
    
    function createButtons(){
        //pause button creation
        pausebutton = game.add.text(60, 75, "Pause");
        pausebutton.font = 'Revalia';
        pausebutton.fontSize = 60;
        grd = pausebutton.context.createLinearGradient(0, 0, 0, pausebutton.canvas.height);
        grd.addColorStop(0, '#016dff');   
        grd.addColorStop(1, '#016dff');
        pausebutton.fill = grd;
        pausebutton.align = 'center';
        pausebutton.stroke = '#000000';
        pausebutton.strokeThickness = 4;
        pausebutton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        pausebutton.inputEnabled = true;
        pausebutton.events.onInputOver.add(function(){
            pausebutton.fill = '#ffb44e';
        }, this);
        pausebutton.events.onInputOut.add(function(){
            pausebutton.fill = grd;
        }, this);
        
        pausebutton.events.onInputDown.add(function(){
            pausebutton.fill = grd;
            pling_sfx.play();
            pausetext = game.add.text(game.world.centerX, game.world.centerY, "GAME PAUSED!");
            pausetext.anchor.setTo(0.5,0.5);
            pausetext.font = 'Revalia';
            pausetext.fontSize = 60;
            grd6 = pausetext.context.createLinearGradient(0, 0, 0, pausetext.canvas.height);
            grd6.addColorStop(0, '#000000');   
            grd6.addColorStop(1, '#ffffff');
            pausetext.fill = grd6;
            pausetext.align = 'center';
            pausetext.stroke = '#000000';
            pausetext.strokeThickness = 4;
            pausetext.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            pling_sfx.onStop.add(function(){
                game.paused = true;
                pausebutton.fill = grd;
            });
        });
        
        //base button creation
        baseButton = game.add.text(60, 15, "Edit Base");
        baseButton.font = 'Revalia';
        baseButton.fontSize = 60;
        grd = baseButton.context.createLinearGradient(0, 0, 0, baseButton.canvas.height);
        grd.addColorStop(0, '#016dff');   
        grd.addColorStop(1, '#016dff');
        baseButton.fill = grd;
        baseButton.align = 'center';
        baseButton.stroke = '#000000';
        baseButton.strokeThickness = 4;
        baseButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        baseButton.inputEnabled = true;
        baseButton.events.onInputOver.add(function(){
            baseButton.fill = '#ffb44e';
        }, this);
        baseButton.events.onInputOut.add(function(){
            baseButton.fill = grd;
        }, this);
        
        baseButton.events.onInputDown.add(function(){
            mclick_sfx.play();
            tempState.came_from_base = true;
            game.state.start("Customize");
        });
                
        // Start button creation
        startButton = game.add.text(1300, 800, "Start!");
        startButton.font = 'Fontdiner Swanky';
        startButton.fontSize = 60;
        grd3 = startButton.context.createLinearGradient(0, 0, 1, startButton.canvas.height);
        grd3.addColorStop(0, '#cd0000');   
        grd3.addColorStop(1, '#ff1a1a');
        grd5 = startButton.context.createLinearGradient(0, 0, 1, startButton.canvas.height);
        grd5.addColorStop(0, '#008100');
        grd5.addColorStop(1, '#1aff1a');
        startButton.fill = grd3;
        startButton.align = 'center';
        startButton.stroke = '#000000';
        startButton.strokeThickness = 4;
        startButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        startButton.inputEnabled = true;
        startButton.events.onInputOver.add(function(){
            startButton.fill = grd5;
        }, this);
        startButton.events.onInputOut.add(function(){
            startButton.fill = grd3;
        }, this);
        
        startButton.events.onInputDown.add(function(){
            defEngine.click_sound();
            enemyManager.startGame();
            startButton.visible = false;
        });
    }
    
    function click_sound(){
        mclick_sfx.play();
    }

    that.setUnitSprite = function setUnitSprite(spriteName){unitSprite = spriteName;}
    that.getUnitSprite = function getUnitSprite(){return unitSprite;}
    that.setGlobalHealth = function(h){globalHealth = h;}
    that.globalHealth = function(){return globalHealth;}
    
    that.updateUnitToolbar = function updateUnitToolbar(){
        toolbar.updateToolbar();
    }
    that.showToolbar = function showToolbar(unit){
        toolbar.showToolbar(unit);
    }
    that.hideToolbar = function hideToolbar(){
        toolbar.hideToolbar();
    }
    
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
    that.click_sound = click_sound;
    that.updateScore = updateScore;
    that.getGlobalHealth = getGlobalHealth;
    that.getMaxGlobalHealth = getMaxGlobalHealth;
    
    return that;
}
