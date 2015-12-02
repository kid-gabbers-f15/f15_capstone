var UnitToolbar = function(game, parent){
    var that = {};
    
    var backButton; // Button to go back in the list
    var nextButton; // Button to advace in the list
    var stickersButton; // Button to show the list of stickers
    var backgroundButton; // Button to show the list of backgrounds
    var grd; // Gradient for buttons
    var numOfSlots = 10; // Slots per page of the list
    var pageNum = 0; // Page of the list you're on
    var stickers = []; // List of stickers
    var slots = []; // List of sticker slots
    var toolbar = '';
    
    function Preload(){
        
    }
    
    /*
    index - int, position in list
    slot - object, slot object itself
    */
    function addEventtoSlot(index, slot){
        slot.events.onInputDown.add(function(){
            clickSlot(index);
        });
    }
    

    function OnCreate(){
        toolbar = 'stickers';
        for(var j = 0; j < playerState.purchases.length; ++j){
            for(var i = 0; i < game.cache.getKeys().length; ++i){
                if(game.cache.getKeys()[i].indexOf('BaseSticker') >= 0){
                    if(playerState.purchases[j] === game.cache.getKeys()[i]){
                        stickers.push(game.cache.getKeys()[i]);
                        break;
                    }
                }
            }
        }
        
        for(var i = 0; i < numOfSlots; ++i){
            var temp = {};
            temp = game.add.sprite(150 + 175*slots.length, 950, stickers[i]);
            console.log(stickers[i]);
            temp.scale.set(.5, .5);
            temp.anchor.set(.5,.5);
            temp.inputEnabled = true;
            addEventtoSlot(i, temp);
            slots.push({slot:temp, key:stickers[i], keyIndex:i});
        }
        
        
        for(var i = 0; i < numOfSlots; ++i){
            slots[i].slot.visible = true;
            slots[i].slot.inputEnabled = true;
        }
        
        // Back Button
        backButton = game.add.text(50, 1000, "Back");
        backButton.font = 'Revalia';
        backButton.fontSize = 40;
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
            defEngine.click_sound();
            clickBack();
        });
        
        // Next Button
        nextButton = game.add.text(1770, 1000, "Next");
        nextButton.font = 'Revalia';
        nextButton.fontSize = 40;
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
            defEngine.click_sound();
            clickNext();
        });
    }
    
    function updateToolbar(){
        for(var i = 0; i < numOfSlots; ++i){
            slots[i].slot.visible = false;
            slots[i].slot.inputEnabled = false;
        }
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
                    }
                    else{
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
                    }
                    else{
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
    
    /*
    slotClicked - int, number of slot clicked
    */
    function clickSlot(slotClicked){
        console.log("Clicked slot #" + slotClicked);
        for(var i = 0; i < slots.length; ++i){
            console.log(slots[i].key);
            console.log(slots[i].keyIndex);
            if(slotClicked === slots[i].keyIndex){
                console.log(slots[i].key);
                //set unit slot to = this
            }
        }
    }
    
    function Update(){
        
    }
    
    that.Preload = Preload;
    that.OnCreate = OnCreate;
    that.Update = Update;
    that.clickBack = clickBack;
    that.clickNext = clickNext;
    that.clickSlot = clickSlot;
    
    return that;    
}
