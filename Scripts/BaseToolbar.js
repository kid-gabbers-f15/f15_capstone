var BaseToolbar = function(game, parent){
    var that = {};
    
    var backButton;
    var nextButton;
    var grd;
    
    var numOfSlots = 8;
    var pageNum = 0;
    var stickers = [];
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
        for(var i = 0; i < game.cache.getKeys().length; ++i){
            console.log(game.cache.getKeys()[i].indexOf('BaseSticker'));
            if(game.cache.getKeys()[i].indexOf('BaseSticker') >= 0){
                stickers.push(game.cache.getKeys()[i]);
            }
        }
        
        for(var i = 0; i < numOfSlots; ++i){
            var temp = {};
            temp = game.add.sprite(50 + 100*slots.length, 900, stickers[i]);
            console.log(stickers[i]);
            temp.scale.set(.75, .75);
            temp.anchor.set(.5,.5);
            temp.inputEnabled = true;
            addEventtoSlot(i, temp);
            slots.push({slot:temp, key:stickers[i], keyIndex:i});
            ++imagesInSlots;
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
        
        nextButton.events.onInputDown.add(function(){
            clickNext();
        });
        
    }
    
    function clickBack(){
        if(pageNum > 0){
            pageNum -= 1;
            console.log("click");
            var i = pageNum * numOfSlots;
                for(var n = 0; n < slots.length; ++n){
                    while(i <= stickers.length){
                        if(n < slots.length){
                            console.log(stickers[i]);
                            slots[n].slot.loadTexture(stickers[i]);
                            slots[n].keyIndex = i;
                            slots[n].key = stickers[i];
                            slots[n].slot.events.onInputDown.removeAll();
                            addEventtoSlot(i, slots[n].slot);
                            slots[n].slot.visible = true;
                            slots[n].slot.inputEnabled = true;
                            ++n;
                        }else{
                            break;
                        }
                    ++i;
                }
            }
        }
    }
    
    function clickNext(){
        if((pageNum + 1) * numOfSlots < stickers.length){
            pageNum += 1;
            var i = pageNum * numOfSlots;
            for(var n = 0; n < slots.length; ++n){
                while(i < stickers.length){
                    if(n < slots.length){
                        console.log(stickers[i]);
                        slots[n].slot.loadTexture(stickers[i]);
                        slots[n].keyIndex = i;
                        slots[n].key = stickers[i];
                        slots[n].slot.events.onInputDown.removeAll();
                        addEventtoSlot(i, slots[n].slot);
                        ++n;
                    }else{
                        break;
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