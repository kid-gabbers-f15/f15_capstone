var ShopManager = function (game){
    var that = {};

    var shopmenu;
    var topBaseBackground;
    var exitButton; // Button to exit the shop
    var showShop = false;
    var shopPage = 0;
    var nextButton; // Button to go ahead in the list
    var backButton; // Button to go back in the list
    var healthButton; // Button to buy more health
    var slotButton; // Button to buy more unit slots
    var stickerButton; // Button to buy more sticker slots
    var upgradeClickButton; // Button to increase strength of click
    var numOfSlots = 5; // Slots to display per page
    var pageNum = 0; // Page number the player is on in the shop
    var stickers = []; // List of stickers
    var slots = []; // List of shop slots
    var grd, grd2, grd3, grd4, grdred; // Gradient for text
    var test_name;
    var owned;
    var label1, label2, label3;
    var shopLabel, line;

    //Example Code for reference------
    /*
    function loadShopItems(items){
        for(var i = 0; i < items.list.length; i++){
            //var temp = game.add.sprite(items.list[i].position.x + game.world.centerX, items.list[i].position.y + game.world.centerY, items.list[i].image);
            //temp.anchor.setTo(0.5,0.5);
            //temp.scale.setTo(0.5,0.5);
        }
    }
    */  
    
    /*
    index - int, position of slot
    slot - object, slot object itself
    */
    function addEventtoSlot(index, slot){
        slot.events.onInputDown.add(function(){
            clickSlot(index);
            defEngine.updateUnitToolbar();
        });
    }
    
    function Preload(){
    }
    
    
    function OnCreate(){
        
        for(var i = 0; i < game.cache.getKeys().length; ++i){
            /*if(game.cache.getKeys()[i].indexOf('Unit') >= 0){
                stickers.push(game.cache.getKeys()[i]);
            }
            */
            if(game.cache.getKeys()[i].indexOf('BaseSticker') >= 0){
                stickers.push(game.cache.getKeys()[i]);
            }
            
        }
        //define the shop menu and the items that go within it
        initializeShopMenu();
        initializeShopItems();
        
        
        line = game.add.text(game.world.centerX + 250, 55, "_____");
        line.font = 'Revalia';
        line.fontSize = 50;
        grd4 = line.context.createLinearGradient(0, 0, 0, line.canvas.height);
        grd4.addColorStop(0, '#fef5ff');   
        grd4.addColorStop(1, '#fef5ff');
        line.fill = grd4;
        line.align = 'center';
        line.stroke = '#000000';
        line.strokeThickness = 4;
        line.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        shopLabel = game.add.text(game.world.centerX + 250, 20, "Shop");
        shopLabel.font = 'Revalia';
        shopLabel.fontSize = 60;
        shopLabel.fill = grd4;
        shopLabel.align = 'center';
        shopLabel.stroke = '#000000';
        shopLabel.strokeThickness = 4;
        shopLabel.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        
        label1 = game.add.text(game.world.centerX + 600, 30, "Buy");
        label1.font = 'Revalia';
        label1.fontSize = 40;
        label1.fill = grd4;
        label1.align = 'center';
        label1.stroke = '#000000';
        label1.strokeThickness = 4;
        label1.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        //label2 = game.add.text(game.world.centerX * (8/5), 50, "Description");
        label3 = game.add.text(game.world.centerX + 760, 30, "Cost");
        label3.font = 'Revalia';
        label3.fontSize = 40;
        label3.fill = grd4;
        label3.align = 'center';
        label3.stroke = '#000000';
        label3.strokeThickness = 4;
        label3.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        grdred = label1.context.createLinearGradient(0, 0, 0, label1.canvas.height);
        grdred.addColorStop(0, '#ff1a1a');   
        grdred.addColorStop(1, '#ff1a1a');
        
    }
    
    function Update(){
    }
    
    function initializeShopMenu(){
        shopPage = 0;
        
        // Next Button
        nextButton = game.add.text(game.world.centerX + 760, game.world.centerY - 90, "Next");
        nextButton.font = 'Revalia';
        nextButton.fontSize = 35;
        grd = nextButton.context.createLinearGradient(0, 0, 0, nextButton.canvas.height);
        grd.addColorStop(0, '#e544ff');   
        grd.addColorStop(1, '#e544ff');
        grd3 = nextButton.context.createLinearGradient(0, 0, 0, nextButton.canvas.height);
        grd3.addColorStop(0, '#5cff42');   
        grd3.addColorStop(1, '#4db300');
        nextButton.fill = grd;
        nextButton.align = 'center';
        nextButton.stroke = '#000000';
        nextButton.strokeThickness = 4;
        nextButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        nextButton.inputEnabled = true;
        
        nextButton.events.onInputOver.add(function(){
            nextButton.fill = '#44ffe5';
        }, this);
        nextButton.events.onInputOut.add(function(){
            nextButton.fill = grd;
        }, this);
        nextButton.events.onInputDown.add(function(){
            defEngine.click_sound();
            clickNext();
        });
        
        // Back Button
        backButton = game.add.text(game.world.centerX + 600, game.world.centerY - 90, "Back");
        backButton.font = 'Revalia';
        backButton.fontSize = 35;
        backButton.fill = grd;
        backButton.align = 'center';
        backButton.stroke = '#000000';
        backButton.strokeThickness = 4;
        backButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        backButton.inputEnabled = true;
        
        backButton.events.onInputOver.add(function(){
            backButton.fill = '#44ffe5';
        }, this);
        backButton.events.onInputOut.add(function(){
            backButton.fill = grd;
        }, this);
        backButton.events.onInputDown.add(function(){
            defEngine.click_sound();
            clickBack();
        });
        
        // Health Button
        healthButton = game.add.text(game.world.centerX * (6.2/5) - 50, 120, "Heal");
        healthButton.font = 'Revalia';
        healthButton.fontSize = 35;
        healthButton.fill = grd;
        healthButton.align = 'center';
        healthButton.stroke = '#000000';
        healthButton.strokeThickness = 4;
        healthButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        healthButton.inputEnabled = true;

        healthButton.events.onInputOver.add(function(){
            if(defEngine.getGlobalHealth() == defEngine.getMaxGlobalHealth()){
               toolTips.fill = grdred;
            }
            else toolTips.fill = grd2;
            healthButton.fill = '#44ffe5';
            toolTips.text = "Cost: " + ((100 - defEngine.globalHealth()) * 5);
            toolTips.visible = true;
            game.world.bringToTop(toolTips);
        }, this);
        healthButton.events.onInputOut.add(function(){
            healthButton.fill = grd;
            toolTips.visible = false;
        }, this);
        healthButton.events.onInputDown.add(function(){
            if(defEngine.globalHealth() < 100 && playerState.gold >= ((100-defEngine.globalHealth()) * 5)){
               playerState.gold -= (100 - defEngine.globalHealth()) * 5;   //costs 5 gold for every global health healed.
               buyHealthPotion();
           }
        });
        
        // Slot Button
        slotButton = game.add.text(game.world.centerX * (6.2/5) - 50, 170, "+1 Warrior Slot");
        slotButton.font = 'Revalia';
        slotButton.fontSize = 35;
        slotButton.fill = grd;
        slotButton.align = 'center';
        slotButton.stroke = '#000000';
        slotButton.strokeThickness = 4;
        slotButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        slotButton.inputEnabled = true;
        slotButton.events.onInputOver.add(function(){
           if(playerState.unitSlots == 8 || playerState.gold < (250 * (playerState.unitSlots - 2))){
               toolTips.fill = grdred;
            }
            else toolTips.fill = grd2;
            slotButton.fill = '#44ffe5';
            toolTips.text = "Cost: " + (250 * (playerState.unitSlots - 2) + " [" + playerState.unitSlots + "/" + 8 + "]");
            toolTips.visible = true;
        }, this);
        slotButton.events.onInputOut.add(function(){
            slotButton.fill = grd;
            toolTips.visible = false;
        }, this);
        slotButton.events.onInputDown.add(function(){
           tempState.unit_slot_count.push(0); //new slot was added, keep count of the units in it
           if(playerState.unitSlots < 8 && playerState.gold >= (250 * (playerState.unitSlots - 2))){
               playerState.gold -= (250 * (playerState.unitSlots - 2));
               buyUnitSlot();
           }
        });
        
        // Sitcker Button
        stickerButton = game.add.text(game.world.centerX * (6.2/5) - 50, 220, "+1 Sticker Slot");
        stickerButton.font = 'Revalia';
        stickerButton.fontSize = 35;
        stickerButton.fill = grd;
        stickerButton.align = 'center';
        stickerButton.stroke = '#000000';
        stickerButton.strokeThickness = 4;
        stickerButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        stickerButton.inputEnabled = true;
        stickerButton.events.onInputOver.add(function(){
            if(playerState.base.stickers >= 30 || playerState.gold < 100){
               toolTips.fill = grdred;
            }
            else toolTips.fill = grd2;
            stickerButton.fill = '#44ffe5';
            toolTips.text = "Cost: " + 100 + " [" + playerState.base.totalSlots + "/" + 30 + "]";
            toolTips.visible = true;
            game.world.bringToTop(toolTips);
        }, this);
        stickerButton.events.onInputOut.add(function(){
            stickerButton.fill = grd;
            toolTips.visible = false;
        }, this);
        
        stickerButton.events.onInputDown.add(function(){
           if(playerState.base.totalSlots < 30 && playerState.gold >= 100){
               console.log("buy stickers")
               playerState.gold -= 100;
               buyStickerSlot();
           }
        });
        
        upgradeClickButton = game.add.text(game.world.centerX * (6.2/5) - 50, 270, "+1 Strength Potion");
        upgradeClickButton.font = 'Revalia';
        upgradeClickButton.fontSize = 35;
        upgradeClickButton.fill = grd;
        upgradeClickButton.align = 'center';
        upgradeClickButton.stroke = '#000000';
        upgradeClickButton.strokeThickness = 4;
        upgradeClickButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        upgradeClickButton.inputEnabled = true;
        upgradeClickButton.events.onInputOver.add(function(){
            if(playerState.clickDamage >= 100 || playerState.gold < (playerState.clickDamage * 50)){
               toolTips.fill = grdred;
            }
            else toolTips.fill = grd2;
            upgradeClickButton.fill = '#44ffe5';
            toolTips.text = "Cost: " + (playerState.clickDamage * 50);
            toolTips.visible = true;
            game.world.bringToTop(toolTips);
        }, this);
        upgradeClickButton.events.onInputOut.add(function(){
            upgradeClickButton.fill = grd;
            toolTips.visible = false;
        }, this);
        upgradeClickButton.events.onInputDown.add(function(){
           if(playerState.clickDamage < 100 && playerState.gold >= (playerState.clickDamage * 50)){
               playerState.gold -= playerState.clickDamage * 50;
               buyStrongerClick();
           }
        });
    }
    
    function clickBack(){
        if(pageNum > 0){
            pageNum -= 1;
            var i = pageNum * numOfSlots;
            for(var n = 0; n < slots.length; ++n){
                while(i <= stickers.length){
                    if(n < slots.length){
                        slots[n].slot.loadTexture(stickers[i]);
                        slots[n].keyIndex = i;
                        slots[n].key = stickers[i];
                        slots[n].slot.events.onInputDown.removeAll();
                        slots[n].text.setText(shopMenuItems.list[i].text);
                        slots[n].cost = shopMenuItems.list[i].cost;
                        slots[n].text.visible = true;
                        slots[n].cost = shopMenuItems.list[i].cost;
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
    updateCostText();
    }
    
    function clickNext(){
        if((pageNum + 1) * numOfSlots < stickers.length){
            pageNum += 1;
            var i = pageNum * numOfSlots;
            for(var n = 0; n < slots.length; ++n){
                while(i < stickers.length){
                    if(n < slots.length){
                        slots[n].slot.loadTexture(stickers[i]);
                        slots[n].keyIndex = i;
                        slots[n].key = stickers[i];
                        slots[n].slot.events.onInputDown.removeAll();
                        slots[n].text.setText(shopMenuItems.list[i].text);
                        slots[n].cost = shopMenuItems.list[i].cost;
                        addEventtoSlot(i, slots[n].slot);
                        ++n;
                    }
                    else{
                        break;
                    }
                    ++i;
                }
                if(n < slots.length){
                    slots[n].slot.visible = false;
                    slots[n].slot.inputEnabled = false;
                    slots[n].text.visible = false;
                }
            }
        }
        updateCostText();
    }
    
    /*
    clickSlot - int, number of slot clicked
    */
    function clickSlot(slotClicked){
         for(var i = 0; i < slots.length; ++i){
            owned = false;
            if(slotClicked === slots[i].keyIndex){
                for(var q = 0; q < playerState.purchases.length; q++){
                    if(playerState.purchases[q] == slots[i].key){
                        owned = true;
                    }
                }
                if(!owned) {
                    if(defEngine.canAfford(slots[i].cost)){
                        defEngine.spendGold(slots[i].cost);
                        slots[i].text.setText("Owned");
                        slots[i].text.fill = grd3;
                        playerState.purchases.push(slots[i].key);
                    }
                }
                console.log(playerState.purchases);
                console.log(slots[i].text._text);
            }
        }
        updatePurchases();
    }
    
    function showShopItems(){
        pageNum = 0;
        for(var i = 0; i < numOfSlots; i++){
            slots[i].slot.visible = true;
            slots[i].slot.inputEnabled = true;
            slots[i].text.visible = true;
            slots[i].slot.loadTexture(stickers[i]);
            slots[i].cost = shopMenuItems.list[i].cost;
            slots[i].keyIndex = i;
            slots[i].key = stickers[i];
            slots[i].text.setText(shopMenuItems.list[i].text);
            addEventtoSlot(i, slots[i].slot);
        }
        updateCostText();
    }
    
    function initializeShopItems(){
        for(var i = 0; i < numOfSlots; ++i){
            var temp = {};
            var cost;
            var text;
            
            cost = shopMenuItems.list[i].cost;

            temp = game.add.sprite(game.world.centerX * (8/5) + 50, 90 + 70*slots.length, stickers[i]);
            text = game.add.text(game.world.centerX * (9/5), 100 + 70*slots.length, shopMenuItems.list[i].text);

            text.font = 'Revalia';
            text.fontSize = 30;
            grd2 = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
            grd2.addColorStop(0, '#fff08e');   
            grd2.addColorStop(1, '#a6b300');
            text.fill = grd2;
            text.align = 'center';
            text.stroke = '#000000';
            text.strokeThickness = 4;
            text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            text.inputEnabled = false;
            temp.scale.set(.45, .45);
            slots.push({slot:temp, key:stickers[i], keyIndex:i, cost:cost, text:text});
        }
        updatePurchases();
        showShopItems();
    }
    function updatePurchases(){
        for(var k = 0; k < playerState.purchases.length; k++)
        {
            for(var j = 0; j < shopMenuItems.list.length; j++)
            {
                if(shopMenuItems.list[j].key == playerState.purchases[k])
                {
                    shopMenuItems.list[j].text = "Owned";
                }
            }
        }
        updateCostText();
    }
    
    function updateCostText(){
        for(var q = 0; q < numOfSlots; q++)
        {
            if(slots[q].text._text == "Owned")
            {
                slots[q].text.fill = grd3;
            }
            else slots[q].text.fill = grd2;
        }
    }
    
    function getShowShop(){
        return showShop;
    }
    
    //add unit slot to player state (max of 8)
    function buyUnitSlot(){
        playerState.unitSlots += 1;
        defEngine.addUnit();
    }
    
    //add stickerslot to playerstate
    function buyStickerSlot(){
        playerState.base.totalSlots += 1;
        
    }
    
    //replenish global health
    function buyHealthPotion(){
        defEngine.setGlobalHealth(100);
        console.log("healing");
    }
    
    function buyStrongerClick(){
        playerState.clickDamage += 10;
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.clickBack = clickBack;
    that.clickNext = clickNext;
    that.clickSlot = clickSlot;
    that.showShopItems = showShopItems;
    that.getShowShop = getShowShop;

    return that;
}
