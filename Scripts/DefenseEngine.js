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
    var shopmenu;
    var topBaseBackground;
    var exitButton;
    var showShop = false;
    var shopPage = 0;
    var nextButton;
    var backButton;

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
            var temp = game.add.sprite(base.list[i].position.x/2 - 120, base.list[i].position.y/2 + game.world.centerY, base.list[i].image);
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
        
        game.load.text('JSONfriendBaseData', 'Scripts/json2.txt');
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
        
        createButtons();
        
        
        
        game.input.onDown.add(unpause, self);
        function unpause(event){
            if(game.paused){
                    game.paused = false;
                    pausetext.destroy();
                    //exitButton.destroy();
                //determine if click was inside area and such
                //game.paused = false;
                //pausetext.destroy();
            }
        }
        
        /*
        if(game.paused){
            exitButton.events.onInputDown.add(function(){
            if(game.paused){
                game.paused = false;
                pausetext.destroy();
                shopmenu.destroy();
                exitButton.destroy();
                }
            });
        }
        */
            
            
        resourceText = game.add.text(0, 0, "Gold: " + gold);
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
        
        shopbutton = game.add.text(0, 130, "Open Shop");
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
        
        shopbutton.events.onInputDown.add(showShopMenu);
        
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
    
    function showShopMenu(){
            shopPage = 0;
           shopbutton.fill = grd;
           //game.paused = true; 
           //game is no longer pausing
           /*
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
            */
            shopmenu = game.add.sprite(game.world.centerX, game.world.centerY, 'shopMenu');
            shopmenu.anchor.setTo(0.5,0.5);
            shopmenu.scale.setTo(10,10);
            exitButton = game.add.text(game.world.centerX - 75, game.world.height - 150, "Exit");
                    exitButton.font = 'Revalia';
                    exitButton.fontSize = 60;
                    grd = exitButton.context.createLinearGradient(0, 0, 0, exitButton.canvas.height);
                    grd.addColorStop(0, '#8ED6FF');   
                    grd.addColorStop(1, '#004CB3');
                    exitButton.fill = grd;
                    exitButton.align = 'center';
                    exitButton.stroke = '#000000';
                    exitButton.strokeThickness = 2;
                    exitButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
                exitButton.inputEnabled = true;
                exitButton.events.onInputOver.add(function(){
                    exitButton.fill = '#ff00ff';
                }, this);
                exitButton.events.onInputOut.add(function(){
                    exitButton.fill = grd;
                }, this);
                exitButton.events.onInputDown.add(function(){
                        shopmenu.destroy();
                        exitButton.destroy();  
                        nextButton.destroy();
                        backButton.destroy();
                        showShop = false;
                })
                
            nextButton = game.add.text(game.world.centerX + 200, game.world.height - 150, "Next");
                    nextButton.font = 'Revalia';
                    nextButton.fontSize = 60;
                    grd = nextButton.context.createLinearGradient(0, 0, 0, nextButton.canvas.height);
                    grd.addColorStop(0, '#8ED6FF');   
                    grd.addColorStop(1, '#004CB3');
                    nextButton.fill = grd;
                    nextButton.align = 'center';
                    nextButton.stroke = '#000000';
                    nextButton.strokeThickness = 2;
                    nextButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
                nextButton.inputEnabled = true;
                nextButton.events.onInputOver.add(function(){
                    nextButton.fill = '#ff00ff';
                }, this);
                nextButton.events.onInputOut.add(function(){
                    nextButton.fill = grd;
                }, this);
                nextButton.events.onInputDown.add(function(){
                        
                })
                
            backButton = game.add.text(game.world.centerX - 400, game.world.height - 150, "Back");
                    backButton.font = 'Revalia';
                    backButton.fontSize = 60;
                    grd = backButton.context.createLinearGradient(0, 0, 0, backButton.canvas.height);
                    grd.addColorStop(0, '#8ED6FF');   
                    grd.addColorStop(1, '#004CB3');
                    backButton.fill = grd;
                    backButton.align = 'center';
                    backButton.stroke = '#000000';
                    backButton.strokeThickness = 2;
                    backButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
                backButton.inputEnabled = true;
                backButton.events.onInputOver.add(function(){
                    backButton.fill = '#ff00ff';
                }, this);
                backButton.events.onInputOut.add(function(){
                    backButton.fill = grd;
                }, this);
                backButton.events.onInputDown.add(function(){
                        
                })
            
            showShop = true;
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