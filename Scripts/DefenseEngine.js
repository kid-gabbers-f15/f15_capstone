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
    var baseButton;
    var basetext;
    var friendBaseData;
    var pausetext;
    var shopmenu;
    var topBaseBackground;
    var unpauseButton;
    var showShop = false;

    var text = null;
    var grd;
    
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
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.image('background', 'Assets/BackgroundKidGabTemplate.png');
        game.load.image('topBaseCollision', 'Assets/TopBaseImage.png');
        game.load.image('topBaseBackground', 'Assets/TopBaseImage.png');

        enemyManager = EnemyManager(game);
        enemyManager.Preload();
        
        player = Player(game);
        player.Preload();
        
        game.load.text('JSONfriendBaseData', 'Scripts/json.txt');
        game.load.text('JSONplayerBaseData', 'Scripts/json.txt');

    }
    
    function OnCreate(){
        gold = 500;
        //drawing background
        background = game.add.sprite(game.world.centerX, game.world.centerY + game.world.centerY/2, 'background');
        background.anchor.setTo(0.5, 0.5);
        background.crop(new Phaser.Rectangle(0, 540, 1920, 1080));
        //create a sprite to act as the area for the user's base
        //this 'windows' the base from other elements in the game 
        
        topBaseBackground = game.add.sprite(game.world.centerX/2, 10,'topBaseBackground');
        
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
        
        pausebutton = game.add.text(0, 65, "Pause");
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
        
        pausebutton.events.onInputDown.add(function(){
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
           // unpauseButton = game.add.text(game.world.width - 300, 20, "Resume", { font: "65px Arial", fill: "#ff0044", align: "center" });
            //unpauseButton.inputEnabled = true;
            
        });
        
        shopbutton = game.add.text(0, 130, "Shop");
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
        
        
        shopbutton.events.onInputDown.add(function(){
           game.paused = true; 
           pausetext = game.add.text(game.world.width - 200, 30, "PAUSED");
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
            pausetext.anchor.setTo(0.5,0.5);
            shopmenu = game.add.sprite(game.world.centerX, game.world.centerY, 'image3');
            shopmenu.anchor.setTo(0.5,0.5);
            shopmenu.scale.setTo(10,10);
            unpauseButton = game.add.text(game.world.centerX - 150, game.world.height - 150, "Resume");
                    unpauseButton.font = 'Revalia';
                    unpauseButton.fontSize = 60;
                    grd = unpauseButton.context.createLinearGradient(0, 0, 0, unpauseButton.canvas.height);
                    grd.addColorStop(0, '#8ED6FF');   
                    grd.addColorStop(1, '#004CB3');
                    unpauseButton.fill = grd;
                    unpauseButton.align = 'center';
                    unpauseButton.stroke = '#000000';
                    unpauseButton.strokeThickness = 2;
                    unpauseButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
            unpauseButton.inputEnabled = true;
            showShop = true;
            
        });
        
        game.input.onDown.add(unpause, self);
        function unpause(event){
            if(game.paused){
                if(showShop == true)
                {
                    var x1 = game.world.centerX - 150, x2 = game.world.centerX + 90, y1 = game.world.height - 140, y2 = game.world.height - 90;
                    if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2)
                    {
                        game.paused = false;
                        pausetext.destroy();
                        shopmenu.destroy();
                        unpauseButton.destroy();   
                        showShop = false;
                    }
                }
                else{
                    game.paused = false;
                    pausetext.destroy();
                    //unpauseButton.destroy();
                }
                //determine if click was inside area and such
                //game.paused = false;
                //pausetext.destroy();
            }
        }
        
        /*
        if(game.paused){
            unpauseButton.events.onInputDown.add(function(){
            if(game.paused){
                game.paused = false;
                pausetext.destroy();
                shopmenu.destroy();
                unpauseButton.destroy();
                }
            });
        }
        */
            
            
        goldText = game.add.text(0, 0, "Gold: " + gold);
            goldText.font = 'Revalia';
            goldText.fontSize = 60;
            grd = goldText.context.createLinearGradient(0, 0, 0, goldText.canvas.height);
            grd.addColorStop(0, '#8ED6FF');   
            grd.addColorStop(1, '#004CB3');
            goldText.fill = grd;
            goldText.align = 'center';
            goldText.stroke = '#000000';
            goldText.strokeThickness = 2;
            goldText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        
         baseButton = game.add.text(0, 200, "Base");
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
        
        baseButton.events.onInputDown.add(function(){
            game.state.start("Customize");
        });
        
        unitGroup = game.add.group();
        enemypGroup = game.add.group();

        player.OnCreate(unitGroup, enemypGroup);
        enemyManager.OnCreate(unitGroup, enemypGroup);
    }
/*
    //Example code for text with fonts and gradient
    
    function createText(text) {

    text = game.add.text(game.world.centerX, game.world.centerY, "- phaser -\nrocking with\ngoogle web fonts");
    text.anchor.setTo(0.5);

    text.font = 'Revalia';
    text.fontSize = 60;

    //  x0, y0 - x1, y1
    grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');
    text.fill = grd;

    text.align = 'center';
    text.stroke = '#000000';
    text.strokeThickness = 2;
    text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    text.inputEnabled = true;
    text.input.enableDrag();

    text.events.onInputOver.add(over, this);
    text.events.onInputOut.add(out, this);

}
*/
    
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
    function canAfford(amount)
    {
        if(gold - amount >= 0)
        {
            return true;   
        }
        else
            return false;
    }


function out() {

    text.fill = grd;

}

function over() {

    text.fill = '#ff00ff';

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
    that.canAfford = canAfford;
    
    return that;
}