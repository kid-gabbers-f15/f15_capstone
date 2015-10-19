var BaseManager = function(game){
    var that = {};
    
    var background;
    
    var baseToolbar;
    
    var currentImage;
    
    var stickers = [];
    
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
        background.events.onInputDown.add(function(){
            if(currentImage !== undefined && currentImage !== null){
                var temp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, currentImage);
                stickers.push(temp);
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