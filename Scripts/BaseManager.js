var BaseManager = function(game){
    var that = {};
    
    var background;
    
    var baseToolbar;
    
    var currentImage;
    
    var stickers;
    
    var maxStickers = 20;
    
    function Preload(){
        game.load.image('background', 'Assets/BackgroundKidGabTemplate.png');
        game.load.image('image1', 'Assets/Placeholder1.png');
        
        baseToolbar = BaseToolbar(game, this);
        baseToolbar.Preload();
    }
    
    function OnCreate(){
        background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        background.anchor.setTo(0.5, 0.5);
        background.inputEnabled = true;
        
        stickers = game.add.group();
        
        background.events.onInputDown.add(function(){
            if(currentImage !== undefined && currentImage !== null){
                if(stickers.length < maxStickers){
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
    }
    
    function Update(){
        
    }
    
    
    that.setCurrentImage = function(newImage){
        currentImage = newImage;
        console.log("Current image is " + newImage);
    }
    that.Preload = Preload;
    that.OnCreate = OnCreate;
    that.Update = Update;
    
    return that;    
}