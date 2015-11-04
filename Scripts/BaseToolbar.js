var BaseToolbar = function(game, parent){
    var that = {};
    
    var slot1;
    var slot2;
    var slot3;
    var slot4;
    
    var image1;
    var image2;
    var image3;
    var image4;
    
    function Preload(){
        game.load.image('BG1', 'Assets/BaseBackgrounds/BG1.png');
        game.load.image('BG2', 'Assets/BaseBackgrounds/BG2.png');
        game.load.image('BG3', 'Assets/BaseBackgrounds/BG3.png');

        game.load.image('image1', 'Assets/BaseStickers/Animal1.png');
        game.load.image('image2', 'Assets/BaseStickers/Animal2.png');
        game.load.image('image3', 'Assets/BaseStickers/MusicNote1.png');
        game.load.image('image4', 'Assets/BaseStickers/PaintBrush.png');
    }
    
    function OnCreate(){
        slot1 = game.add.sprite(0, 900, 'image1');
        slot1.inputEnabled = true;
        slot1.events.onInputDown.add(function(){
            clickSlot(1);
        });
        
        slot2 = game.add.sprite(100, 900, 'image2');
        slot2.inputEnabled = true;
        slot2.events.onInputDown.add(function(){
            clickSlot(2);
        });
        
        slot3 = game.add.sprite(200, 900, 'image3');
        slot3.inputEnabled = true;
        slot3.events.onInputDown.add(function(){
            clickSlot(3);
        });
        
        slot4 = game.add.sprite(300, 900, 'image4');
        slot4.inputEnabled = true;
        slot4.events.onInputDown.add(function(){
            clickSlot(4);
        });
        
    }
    
    function clickSlot(slotClicked){
        console.log("Clicked slot #" + slotClicked);
        if(slotClicked === 1){
            parent.setCurrentImage('image1');
        }else if(slotClicked === 2){
            parent.setCurrentImage('image2');
        }else if(slotClicked === 3){
            parent.setCurrentImage('image3');
        }else if(slotClicked === 4){
            parent.setCurrentImage('image4');
        }
    }
    
    function Update(){
        
        
    }
    
    that.Preload = Preload;
    that.OnCreate = OnCreate;
    that.Update = Update;
    
    return that;    
}