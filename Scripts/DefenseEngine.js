var DefenseEngine = function (game){
    var that = {};
    
    var background;
    var topBaseCollision;
    
    var enemyManager;
    var player;
    
    var unitGroup;
    var enemypGroup;
    var gold;
    var resourceText;
    var shopbutton;
    var pausebutton;
    var baseButton;
    var basetext;
    var friendBaseData;
    var pausetext;
    var grd;
    var playerBaseData;
    
    
    
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
    }
    
    
    function Preload(){
        //loading background image
        console.log("Preload for defense engine");
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.image('background', 'Assets/MainPageBG.png');
        game.load.image('topBaseCollision', 'Assets/TopBaseImage.png');
        game.load.image('topBaseBackground', 'Assets/TopBaseImage.png');
        game.load.image('whiteBox', 'Assets/whiteBox.png');
        
        enemyManager = EnemyManager(game);
        enemyManager.Preload();
        
        player = Player(game);
        player.Preload();
        
        game.load.text('JSONfriendBaseData', 'Scripts/json2.txt');
        game.load.text('JSONplayerBaseData', 'Scripts/json.txt');

        //shopManager.Preload();

    }
    
    function OnCreate(){
        gold = 500;
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
        
        //create a sprite to act as the area for the user's base
        //this 'windows' the base from other elements in the game 
        
        //topBaseBackground = game.add.sprite(game.world.centerX/2, 10,'topBaseBackground');
        
       // topBase = game.add.sprite(game.world.centerX/2, 10, 'topBase');
        topBaseCollision = game.add.sprite(0,0,'topBaseCollision');
        topBaseCollision.isActive = true;
        topBaseCollision.alpha = 0;
        game.physics.enable(topBaseCollision, Phaser.Physics.ARCADE);
        topBaseCollision.body.immovable = true;
        topBaseCollision.scale.setTo(2,1.0555);
        
        //friend base building
        friendBaseData = JSON.parse(game.cache.getText('JSONfriendBaseData'));
        loadFriendBase(friendBaseData);

        loadPlayerBase(playerState.base);
        //create menu buttons - pause, open menu, base
        createButtons();
        
        game.input.onDown.add(unpause, self);
        function unpause(event){
            if(game.paused){
                    game.paused = false;
                    pausetext.destroy();

            }
        }

        resourceText = game.add.text(50, 10, "Gold: " + gold);
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
        
    }
    
    function Update(){
        //check for collision with enemies with base window
        var enemyGroup = getEnemyManager().getEgroup();
        game.physics.arcade.collide(topBaseCollision, enemyGroup);
        enemyManager.Update();
        player.Update();
        updateResource();
        
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
        resourceText.setText("Gold: " + gold);
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
    function canAfford(amount)
    {
        if(gold - amount >= 0)
        {
            return true;   
        }
        else
            return false;
    }
    
    function createButtons(){
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
           // exitButton = game.add.text(game.world.width - 300, 20, "Resume", { font: "65px Arial", fill: "#ff0044", align: "center" });
            //exitButton.inputEnabled = true;
            
        });
        
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
    }
    
   
    


/*
function out(text) {

    text.fill = grd;

}

function over(text) {

    text.fill = '#ff00ff';

}
*/
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
    
    return that;
}