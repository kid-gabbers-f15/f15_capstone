var BaseManager = function(game){
    var that = {};
    
    var background;
    
    var baseToolbar;
    var mainButton;
    var grd;
    
    var currentImage;
    
    var stickers;
    
    var maxStickers = 1;
    
    var baseoffsetX = 130;
    var baseoffsetY = 110;
    
    var backgroundSprite = '';
    
    var playerBaseData;
    
    function Preload(){

        baseToolbar = BaseToolbar(game, this);
        baseToolbar.Preload();
    }
    
    function OnCreate(){
        
        var mainBackground = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        mainBackground.anchor.setTo(0.5, 0.5);
        mainBackground.crop(new Phaser.Rectangle(0, 540, 1920, 1080));
        
        var whiteBox1 = game.add.sprite(50, 50, 'whiteBox');
        whiteBox1.anchor.setTo(0, 0);
        whiteBox1.crop(new Phaser.Rectangle(0, 0, 400, 700));
        whiteBox1.alpha = .8;
        
        var whiteBox2 = game.add.sprite(game.world.centerX, 950, 'whiteBox');
        whiteBox2.anchor.setTo(0.5, 0.5);
        whiteBox2.crop(new Phaser.Rectangle(0, 0, 1820, 200));
        whiteBox2.alpha = .8;
        
        backgroundSprite = playerState.base.background;
        background = game.add.sprite(game.world.centerX + baseoffsetX, game.world.centerY - baseoffsetY, backgroundSprite);
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(1.5, 1.5);
        background.inputEnabled = true;
        background.crop(new Phaser.Rectangle(0, 0, 800, 600));
        stickers = game.add.group();
        
        background.events.onInputDown.add(function(){
            if(currentImage !== undefined && currentImage !== null){
                if(stickers.length < playerState.base.totalSlots){
                    var temp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, currentImage);
                    temp.anchor.setTo(0.5, 0.5);
                    temp.inputEnabled = true;
                    temp.events.onInputDown.add(function(){
                        temp.destroy();
                    })
                    stickers.add(temp);
                }
            }
        });
    
        baseToolbar.OnCreate();
        
        mainButton = game.add.text(0, 0, "Main Menu");
                mainButton.font = 'Revalia';
                mainButton.fontSize = 60;
                grd = mainButton.context.createLinearGradient(0, 0, 0, mainButton.canvas.height);
                grd.addColorStop(0, '#8ED6FF');   
                grd.addColorStop(1, '#004CB3');
                mainButton.fill = grd;
                mainButton.align = 'center';
                mainButton.stroke = '#000000';
                mainButton.strokeThickness = 2;
                mainButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        mainButton.inputEnabled = true;
        mainButton.events.onInputOver.add(function(){
            mainButton.fill = '#ff00ff';
        }, this);
        mainButton.events.onInputOut.add(function(){
            mainButton.fill = grd;
        }, this);
        
        mainButton.events.onInputDown.add(function(){
            SaveBase();
            game.state.start("Preload");
        });
        
        
        for(var i = 0; i < playerState.base.list.length; ++i){
            var temp = game.add.sprite(playerState.base.list[i].position.x,  playerState.base.list[i].position.y, playerState.base.list[i].image);
            temp.anchor.setTo(0.5, 0.5);
            temp.inputEnabled = true;
            addEventtoSprite(temp);
            stickers.add(temp);
        }
        
    }
    
    function addEventtoSprite(sprite){
        sprite.events.onInputDown.add(function(){
            sprite.destroy();
        });
    }
    
    function Update(){
        
    }
    
    function SaveBase(){
        for(var i = 0; i < stickers.length; ++i){
            
            var object = {};
            object.image = stickers.getChildAt(i).key;
            object.position = { x: stickers.getChildAt(i).position.x , y: stickers.getChildAt(i).y};

            playerState.base.list.push(object);
        }
        PlayerStateJSONString = JSON.stringify(playerState);
        console.log(PlayerStateJSONString);

        document.cookie = "playerState=" + PlayerStateJSONString;
    }
    
    that.setCurrentImage = function(newImage){
        currentImage = newImage;
        console.log("Current image is " + newImage);
    }
    
    that.setBackground = function(newBG){
        background.loadTexture(newBG);
        backgroundSprite = newBG;
    }
    
    that.Preload = Preload;
    that.OnCreate = OnCreate;
    that.Update = Update;
    that.SaveBase = SaveBase;
    
    return that;    
}