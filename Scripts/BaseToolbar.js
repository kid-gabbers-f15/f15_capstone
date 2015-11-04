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
    
    var slots = [];
    
    function Preload(){
        
    }
    
    function addEventtoSlot(index, slot){
        slot.events.onInputDown.add(function(){
            clickSlot(index);
        });
    }
    
    function OnCreate(){

        for(var i = 0; i < game.cache.getKeys().length; ++i){
            console.log(game.cache.getKeys()[i].indexOf('BaseSticker'));
            if(game.cache.getKeys()[i].indexOf('BaseSticker') >= 0){
                if((0 + 200*slots.length) < 1920){
                    var temp = {};
                    temp = game.add.sprite(0 + 200*slots.length, 900, game.cache.getKeys()[i]);
                    temp.inputEnabled = true;
                    addEventtoSlot(i, temp);
                    slots.push({slot:temp, key:game.cache.getKeys()[i], keyIndex:i});
                    console.log(slots[slots.length-1].keyIndex);
                }
            }
        }
        
    }
    
    function clickSlot(slotClicked){
        console.log("Clicked slot #" + slotClicked);
         for(var i = 0; i < slots.length; ++i){
            console.log(slots[i].key);
            console.log(slots[i].keyIndex);
            if(slotClicked === slots[i].keyIndex){
                console.log(slots[i].key);
                parent.setCurrentImage(slots[i].key);
            }
        }
    }
    
    function Update(){
        
        
    }
    
    that.Preload = Preload;
    that.OnCreate = OnCreate;
    that.Update = Update;
    
    return that;    
}