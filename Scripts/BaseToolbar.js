var BaseToolbar = function(game, parent){
    var that = {};
    
    var backButton; // Button to go back in the list
    var nextButton; // Button to advace in the list
    var stickersButton; // Button to show the list of stickers
    var backgroundButton; // Button to show the list of backgrounds
    var grd; // Gradient for buttons
    var numOfSlots = 10; // Slots per page of the list
    var pageNum = 0; // Page of the list you're on
    var stickers = []; // List of stickers
    var backgrounds = []; // List of backgrounds
    var slots = []; // List of sticker slots
    var backgroundSlots = []; // List of background slots
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
    
    /*
    index - int, position in list
    slot - object, slot object itself
    */
    function addEventtoBGSlot(index, slot){
        slot.events.onInputDown.add(function(){
            clickBackground(index);
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
            temp.scale.set(.75, .75);
            temp.anchor.set(.5,.5);
            temp.inputEnabled = true;
            addEventtoSlot(i, temp);
            slots.push({slot:temp, key:stickers[i], keyIndex:i});
        }
        
        for(var i = 0; i < playerState.purchases.length; ++i){
            for(var j = 0; j < game.cache.getKeys().length; ++j){
                if(game.cache.getKeys()[j].indexOf('BaseBackground') >= 0){
                    backgrounds.push(game.cache.getKeys()[j]);
                }
            }
        }
        
        for(var i = 0; i < numOfSlots; ++i){
            var temp = {};
            temp = game.add.sprite(150 + 175*backgroundSlots.length, 950, backgrounds[i]);
            console.log(backgrounds[i]);
            temp.scale.set(.25, .25);
            temp.anchor.set(.5,.5);
            temp.crop(new Phaser.Rectangle(0,0,600,600));
            temp.inputEnabled = true;
            addEventtoBGSlot(i, temp);
            backgroundSlots.push({slot:temp, key:backgrounds[i], keyIndex:i});
        }
        
        for(var i = 0; i < numOfSlots; ++i){
            backgroundSlots[i].slot.visible = false;
            backgroundSlots[i].slot.inputEnabled = false;
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
        
        // Background Button
        backgroundButton = game.add.text(300, 850, "Backgrounds");
        backgroundButton.font = 'Revalia';
        backgroundButton.fontSize = 30;
        backgroundButton.fill = grd;
        backgroundButton.align = 'center';
        backgroundButton.stroke = '#000000';
        backgroundButton.strokeThickness = 4;
        backgroundButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        backgroundButton.inputEnabled = true;
        
        backgroundButton.events.onInputOver.add(function(){
            backgroundButton.fill = '#ffb44e';
        }, this);
        backgroundButton.events.onInputOut.add(function(){
            backgroundButton.fill = grd;
        }, this);
        backgroundButton.events.onInputDown.add(function(){
            defEngine.click_sound();
            toolbar = 'backgrounds';
            updateToolbar();
        });
        
        // Sticker Button
        stickersButton = game.add.text(50, 850, "Stickers");
        stickersButton.font = 'Revalia';
        stickersButton.fontSize = 30;
        stickersButton.fill = grd;
        stickersButton.align = 'center';
        stickersButton.stroke = '#000000';
        stickersButton.strokeThickness = 4;
        stickersButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        stickersButton.inputEnabled = true;
        
        stickersButton.events.onInputOver.add(function(){
            stickersButton.fill = '#ffb44e';
        }, this);
        stickersButton.events.onInputOut.add(function(){
            stickersButton.fill = grd;
        }, this);
        stickersButton.events.onInputDown.add(function(){
            defEngine.click_sound();
            toolbar = 'stickers';
            updateToolbar();
        });
    }
    
    function updateToolbar(){
        if(toolbar === 'stickers'){
            for(var i = 0; i < numOfSlots; ++i){
                backgroundSlots[i].slot.visible = false;
                backgroundSlots[i].slot.inputEnabled = false;
                slots[i].slot.visible = true;
                slots[i].slot.inputEnabled = true;
            }
        }
        else if(toolbar === 'backgrounds'){
             for(var i = 0; i < numOfSlots; ++i){
                backgroundSlots[i].slot.visible = true;
                backgroundSlots[i].slot.inputEnabled = true;
                slots[i].slot.visible = false;
                slots[i].slot.inputEnabled = false;
            }
        }
    }
    
    function updatePurchases(){
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
        if(toolbar === 'stickers'){
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
        else if(toolbar ==='backgrounds'){
            if(pageNum > 0){
                pageNum -= 1;
                console.log("click");
                var i = pageNum * numOfSlots;
                for(var n = 0; n < backgroundSlots.length; ++n){
                    while(i <= backgrounds.length){
                        if(n < backgroundSlots.length){
                            console.log(backgrounds[i]);
                            backgroundSlots[n].slot.loadTexture(backgrounds[i]);
                            backgroundSlots[n].keyIndex = i;
                            backgroundSlots[n].key = backgrounds[i];
                            backgroundSlots[n].slot.events.onInputDown.removeAll();
                            addEventtoBGSlot(i, backgroundSlots[n].slot);
                            backgroundSlots[n].slot.visible = true;
                            backgroundSlots[n].slot.inputEnabled = true;
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
    }
    
    function clickNext(){
        if(toolbar === 'stickers'){
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
        else if(toolbar === 'backgrounds'){
            if((pageNum + 1) * numOfSlots < backgrounds.length){
                pageNum += 1;
                var i = pageNum * numOfSlots;
                for(var n = 0; n < backgroundSlots.length; ++n){
                    while(i < backgrounds.length){
                        if(n < backgroundSlots.length){
                            console.log(backgrounds[i]);
                            backgroundSlots[n].slot.loadTexture(backgrounds[i]);
                            backgroundSlots[n].keyIndex = i;
                            backgroundSlots[n].key = backgrounds[i];
                            backgroundSlots[n].slot.events.onInputDown.removeAll();
                            addEventtoBGSlot(i, backgroundSlots[n].slot);
                            ++n;
                        }
                        else{
                            break;
                        }
                    ++i;
                    }
                    if(n < backgroundSlots.length){
                        console.log("click");
                        backgroundSlots[n].slot.visible = false;
                        backgroundSlots[n].slot.inputEnabled = false;
                    }
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
                parent.setCurrentImage(slots[i].key);
            }
        }
    }
    
    /*
    slotClicked - int, number of slot clicked
    */
    function clickBackground(slotClicked){
        console.log("Clicked slot #" + slotClicked);
        for(var i = 0; i < backgroundSlots.length; ++i){
            console.log(backgroundSlots[i].key);
            console.log(backgroundSlots[i].keyIndex);
            if(slotClicked === backgroundSlots[i].keyIndex){
                console.log(backgroundSlots[i].key);
                parent.setBackground(backgroundSlots[i].key);
            }
        }
    }
    
    function Update(){
        
    }
    
    that.updateToolbar = updatePurchases;
    that.Preload = Preload;
    that.OnCreate = OnCreate;
    that.Update = Update;
    that.clickBack = clickBack;
    that.clickNext = clickNext;
    that.clickSlot = clickSlot;
    
    return that;    
}
