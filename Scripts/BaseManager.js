var BaseManager = function(game){
    var that = {};
    
    var background;
    
    var baseToolbar;
    var mainButton;
    var grd;
    
    var currentImage;
    
    var stickers;
    
    var maxStickers = 20;
    
    var baseoffsetX = 130;
    var baseoffsetY = 110;
    
    function Preload(){
        game.load.image('background', 'Assets/BackgroundKidGabTemplate.png');
        game.load.image('image1', 'Assets/Placeholder1.png');
        
        baseToolbar = BaseToolbar(game, this);
        baseToolbar.Preload();
    }
    
    function OnCreate(){
        background = game.add.sprite(game.world.centerX + baseoffsetX, game.world.centerY - baseoffsetY, 'BaseBackground23');
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(1.5, 1.5);
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
        
        mainButton.events.onInputDown.add(function(){
            game.state.start("Defense");
        });
        
    }
    
    function Update(){
        
    }
    
    function SaveBase(){
        _playerBaseJSONstring += '{ "list" : [';
        for(var i = 0; i < stickers.length - 1; ++i){
            var object = {};
            object.image = stickers.getChildAt(i).key;
            object.position = { x: stickers.getChildAt(i).position.x , y: stickers.getChildAt(i).y};

            _playerBaseJSONstring += JSON.stringify(object) + ', ';
        }
        var object = {};
            object.image = stickers.getChildAt(stickers.length - 1).key;
            object.position = { x: stickers.getChildAt(stickers.length - 1).position.x , y: stickers.getChildAt(stickers.length - 1).y};

            _playerBaseJSONstring += JSON.stringify(object) + ']}';
        console.log(_playerBaseJSONstring);

    }
    
    that.setCurrentImage = function(newImage){
        currentImage = newImage;
        console.log("Current image is " + newImage);
    }
    
    that.Preload = Preload;
    that.OnCreate = OnCreate;
    that.Update = Update;
    that.SaveBase = SaveBase;
    
    return that;    
}