var BaseToolbar = function(game, parent){
    var that = {};
    
    var backButton;
    var nextButton;
    var grd;
    
    var numOfSlots;
    var cacheIndex;
    var slots = [];
    var imagesInSlots = 0;

    function Preload(){
        
    }
    
    function addEventtoSlot(index, slot){
        slot.events.onInputDown.add(function(){
            clickSlot(index);
        });
    }

    function OnCreate(){
        numOfSlots = 0;
        cacheIndex = 0;
        for(var i = 0; i < game.cache.getKeys().length; ++i){
            console.log(game.cache.getKeys()[i].indexOf('BaseSticker'));
            if(game.cache.getKeys()[i].indexOf('BaseSticker') >= 0){
                if(numOfSlots <= 10){
                    ++numOfSlots;
                    var temp = {};
                    temp = game.add.sprite(50 + 100*slots.length, 900, game.cache.getKeys()[i]);
                    temp.scale.set(.75, .75);
                    temp.anchor.set(.5,.5);
                    temp.inputEnabled = true;
                    addEventtoSlot(i, temp);
                    slots.push({slot:temp, key:game.cache.getKeys()[i], keyIndex:i});
                    console.log(slots[slots.length-1].keyIndex);
                    cacheIndex = i;
                    ++imagesInSlots;
                }
            }
        }
        
         backButton = game.add.text(0, 800, "Back");
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
            clickBack();
        });
        
         nextButton = game.add.text(1720, 800, "Next");
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
            clickNext();
        });
        
    }
    
    function clickBack(){
        
    }
    
    function clickNext(){
        if(imagesInSlots === slots.length){
            var i = cacheIndex + 1;
            imagesInSlots = 0;
            for(var n = 0; n < slots.length; ++n){
                while(i < game.cache.getKeys().length){
                    if(game.cache.getKeys()[i].indexOf('BaseSticker') >= 0){
                        if(n < slots.length){
                            slots[n].slot.loadTexture(game.cache.getKeys()[i]);
                            slots[n].keyIndex = i;
                            slots[n].key = game.cache.getKeys()[i];
                            slots[n].slot.events.onInputDown.removeAll();
                            addEventtoSlot(i, slots[n].slot);
                            ++n;
                            cacheIndex = i;
                            ++imagesInSlots;
                        }else{
                            break;
                        }
                    }
                    ++i;
                }
                if(n < slots.length){
                    console.log("click");
                    slots[n].slot.visible = false;
                    slots[n].slot.inputEnabled = false;
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