var BaseShopManager = function (game, parent){
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
    var grd, grd2, grd3, grd4, grdred, grdp; // Gradient for text
    var test_name;
    var owned;
    var label1, label2, label3;
    var shopLabel;
    var resourceText
    var grdr, line;
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
            parent.updateToolbar();
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
        
        line = game.add.text(50, 190, "_____");
        line.font = 'Revalia';
        line.fontSize = 35;
        grd4 = line.context.createLinearGradient(0, 0, 0, line.canvas.height);
        grd4.addColorStop(0, '#fef5ff');   
        grd4.addColorStop(1, '#fef5ff');
        line.fill = grd4;
        line.align = 'center';
        line.stroke = '#000000';
        line.strokeThickness = 4;
        line.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        shopLabel = game.add.text(50, 160, "Shop");
        shopLabel.font = 'Revalia';
        shopLabel.fontSize = 45;
        shopLabel.fill = grd4;
        shopLabel.align = 'center';
        shopLabel.stroke = '#000000';
        shopLabel.strokeThickness = 4;
        shopLabel.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        label1 = game.add.text(50, 280, "Buy");
        label1.font = 'Revalia';
        label1.fontSize = 40;
        label1.fill = grd4;
        label1.align = 'center';
        label1.stroke = '#000000';
        label1.strokeThickness = 4;
        label1.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        //label2 = game.add.text(game.world.centerX * (8/5), 50, "Description");
        label3 = game.add.text(300, 280, "Cost");
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
        nextButton = game.add.text(300, game.world.centerY + 150, "Next");
        nextButton.font = 'Revalia';
        nextButton.fontSize = 35;
        grdp = nextButton.context.createLinearGradient(0, 0, 0, nextButton.canvas.height);
        grdp.addColorStop(0, '#e544ff');   
        grdp.addColorStop(1, '#e544ff');
        grd3 = nextButton.context.createLinearGradient(0, 0, 0, nextButton.canvas.height);
        grd3.addColorStop(0, '#5cff42');   
        grd3.addColorStop(1, '#4db300');
        nextButton.fill = grdp;
        nextButton.align = 'center';
        nextButton.stroke = '#000000';
        nextButton.strokeThickness = 4;
        nextButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        nextButton.inputEnabled = true;
        
        nextButton.events.onInputOver.add(function(){
            nextButton.fill = '#44ffe5';
        }, this);
        nextButton.events.onInputOut.add(function(){
            nextButton.fill = grdp;
        }, this);
        nextButton.events.onInputDown.add(function(){
            defEngine.click_sound();
            clickNext();
        });
        
        // Back Button
        backButton = game.add.text(50, game.world.centerY + 150, "Back");
        backButton.font = 'Revalia';
        backButton.fontSize = 35;
        backButton.fill = grdp;
        backButton.align = 'center';
        backButton.stroke = '#000000';
        backButton.strokeThickness = 4;
        backButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        backButton.inputEnabled = true;
        
        backButton.events.onInputOver.add(function(){
            backButton.fill = '#44ffe5';
        }, this);
        backButton.events.onInputOut.add(function(){
            backButton.fill = grdp;
        }, this);
        backButton.events.onInputDown.add(function(){
            defEngine.click_sound();
            clickBack();
        });
        
        // Sitcker Button
        stickerButton = game.add.text(50, 240, "+1 Sticker Slot");
        stickerButton.font = 'Revalia';
        stickerButton.fontSize = 35;
        stickerButton.fill = grdp;
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
            stickerButton.fill = grdp;
            toolTips.visible = false;
        }, this);
        
        stickerButton.events.onInputDown.add(function(){
           if(playerState.base.totalSlots < 30 && playerState.gold >= 100){
               console.log("buy stickers")
               playerState.gold -= 100;
               buyStickerSlot();
           }
        });
        
        resourceText = game.add.text(50, 100, "Cash: " + playerState.gold);
        resourceText.font = 'Revalia';
        resourceText.fontSize = 45;
        grd = resourceText.context.createLinearGradient(0, 0, 0, resourceText.canvas.height);
        grd.addColorStop(0, '#016dff');   
        grd.addColorStop(1, '#016dff');
        grdr = resourceText.context.createLinearGradient(0, 0, 0, resourceText.canvas.height);
        grdr.addColorStop(0, '#fff08e');   
        grdr.addColorStop(1, '#f0d431');
        resourceText.fill = grdr;
        resourceText.align = 'center';
        resourceText.stroke = '#000000';
        resourceText.strokeThickness = 4;
        resourceText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        
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
                        addEventtoSlot(i, slots[n].slot);
                        slots[n].slot.visible = true;
                        slots[n].cost = shopMenuItems.list[i].cost;
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
                        resourceText.text =  "Cash: " + playerState.gold;
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

            temp = game.add.sprite(100, 340 + 70*slots.length, stickers[i]);
            text = game.add.text(300, 350 + 70*slots.length, shopMenuItems.list[i].text);

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
            temp.scale.set(.4, .4);
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
    
    //add stickerslot to playerstate
    function buyStickerSlot(){
        playerState.base.totalSlots += 1;
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
