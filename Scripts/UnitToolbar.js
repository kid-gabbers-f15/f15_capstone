var UnitToolbar = function(game, parent){
    var that = {};
    
    var backButton; // Button to go back in the list
    var nextButton; // Button to advace in the list
    var stickersButton; // Button to show the list of stickers
    var backgroundButton; // Button to show the list of backgrounds
    var grd, grd2; // Gradient for buttons
    var numOfSlots = 5; // Slots per page of the list
    var pageNum = 0; // Page of the list you're on
    var stickers = []; // List of stickers
    var slots = []; // List of sticker slots
    
    var currentUnit;
    
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
        slot.events.onInputOver.add(function(){
            
        })
    }
    
    function OnCreate(){
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
            var costText;
            temp = game.add.sprite(600 + 75*slots.length, 950, stickers[i]);
            costText = game.add.text(600 + 75*slots.length, 950, "?");
            grd2 = costText.context.createLinearGradient(0, 0, 0, costText.canvas.height);
            grd2.addColorStop(0, '#fff08e');   
            grd2.addColorStop(1, '#a6b300');
            costText.font = 'Revalia';
            costText.fontSize = 25;
            costText.fill = grd2;
            costText.align = 'center';
            costText.stroke = '#000000';
            costText.strokeThickness = 4;
            costText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
            
            //console.log(stickers[i]);
            temp.scale.set(.65, .65);
            temp.anchor.set(.5,.5);
            temp.inputEnabled = true;
            addEventtoSlot(i, temp);
            costText.visible = false;
            slots.push({slot:temp, key:stickers[i], keyIndex:i, cost:costText});
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
        grd.addColorStop(0, '#016dff');   
        grd.addColorStop(1, '#016dff');
        backButton.fill = grd;
        backButton.align = 'center';
        backButton.stroke = '#000000';
        backButton.strokeThickness = 4;
        backButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        backButton.inputEnabled = true;
 
        backButton.events.onInputOver.add(function(){
            backButton.fill = '#ffb44e';
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
        grd.addColorStop(0, '#016dff');   
        grd.addColorStop(1, '#016dff');
        nextButton.fill = grd;
        nextButton.align = 'center';
        nextButton.stroke = '#000000';
        nextButton.strokeThickness = 4;
        nextButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        nextButton.inputEnabled = true;
        
        nextButton.events.onInputOver.add(function(){
            nextButton.fill = '#ffb44e';
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
        stickers = [];
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
        
        for(var n = 0; n < slots.length; ++n){
            while(i <= stickers.length){
                if(n < slots.length){
                    console.log(stickers[i]);
                    slots[n].slot.loadTexture(stickers[i]);
                    slots[n].keyIndex = i;
                    slots[n].key = stickers[i];
                    slots[n].slot.events.onInputDown.removeAll();
                    addEventtoSlot(i, slots[n].slot);
                    slots[n].slot.visible = false;
                    slots[n].cost.visible = false;
                    ++n;
                }
                else{
                    break;
                }
            ++i;
            }
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
                        updateCosts();
                        slots[n].slot.visible = true;
                        slots[n].slot.inputEnabled = true;
                        slots[n].cost.visible = true;
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
                        updateCosts();
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
                    slots[n].cost.visible = false;
                }
            }
        }
    }
    
    /*
    slotClicked - int, number of slot clicked
    */
    function clickSlot(slotClicked){
        //console.log("Clicked slot #" + slotClicked);
        for(var i = 0; i < slots.length; ++i){
            //console.log(slots[i].key);
            //console.log(slots[i].keyIndex);
            if(slotClicked === slots[i].keyIndex){
                //console.log(slots[i].key);
                //set unit slot to = this
                currentUnit.setUnit(slots[i].key);
            }
        }
        hideToolbar();
    }
    
    function hideToolbar(){
        for(var i = 0; i < slots.length; ++i){
            slots[i].slot.visible = false;
            slots[i].slot.inputEnabled = false;
            slots[i].cost.visible = false;
            slots[i].slot.loadTexture(stickers[i]);
            slots[i].keyIndex = i;
            slots[i].key = stickers[i];
            slots[i].slot.events.onInputDown.removeAll();
            addEventtoSlot(i, slots[i].slot);
            updateCosts();
        }
        backButton.visible = false;
        nextButton.visible = false;
    }
    
    function showToolbar(unit){
        //console.log(unit);
        pageNum = 0;
        for(var n = 0; n < slots.length; ++n){
            slots[n].slot.position.x = unit.getPosition().x + 45 + n * 120;
            slots[n].slot.position.y = unit.getPosition().y - 50;
            slots[n].cost.position.x = unit.getPosition().x + 75 + n * 120;
            slots[n].cost.position.y = unit.getPosition().y - 40;
            slots[n].slot.visible = true;
            slots[n].slot.inputEnabled = true;
            slots[n].cost.visible = true;
            currentUnit = unit;
        }
        updateCosts();
        nextButton.visible = true;
        nextButton.position.x =  unit.getPosition().x + 450;
        nextButton.position.y =  unit.getPosition().y;
        backButton.visible = true;
        backButton.position.x =  unit.getPosition().x + 50;
        backButton.position.y =  unit.getPosition().y;
    }
    
    function updateCosts(){
        for(var q = 0; q < slots.length; q++){
            for(var i = 0; i < shopMenuItems.list.length; i++){
                if(slots[q].key == shopMenuItems.list[i].key)
                {
                    slots[q].cost.setText(shopMenuItems.list[i].cost/20);
                }
            }
        }
    }
    
    function Update(){
    }
    
    that.showToolbar = showToolbar;
    that.hideToolbar = hideToolbar;
    that.Preload = Preload;
    that.OnCreate = OnCreate;
    that.Update = Update;
    that.clickBack = clickBack;
    that.clickNext = clickNext;
    that.clickSlot = clickSlot;
    that.updateToolbar = updateToolbar;
    return that;    
}
