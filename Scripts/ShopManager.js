var ShopManager = function (game){
    var that = {};

    var shopmenu;
    var topBaseBackground;
    var exitButton;
    var showShop = false;
    var shopPage = 0;
    var nextButton;
    var backButton;
    
    var healthButton;
    var slotButton;
    var stickerButton;
    
    
    var shopMenuItems;
    var numOfSlots = 5;
    var pageNum = 0;
    var stickers = [];
    var slots = [];
    var grd;

    var test_name;
    var owned;

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
  
    function addEventtoSlot(index, slot){
        slot.events.onInputDown.add(function(){
            clickSlot(index);
        });
    }
    
    function Preload(){
        game.load.text('JSONshopMenuItems', KCG_SCRIPT_PATH+'shopItems.txt');
    }
    
    
    function OnCreate(){
        shopMenuItems = JSON.parse(game.cache.getText('JSONshopMenuItems'));
        
        for(var i = 0; i < game.cache.getKeys().length; ++i){
            if(game.cache.getKeys()[i].indexOf('Item') >= 0){
                stickers.push(game.cache.getKeys()[i]);
            }
           /* if(game.cache.getKeys()[i].indexOf('BaseBackground') >= 0){
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
        
    }
    
    function Update(){
       
    }
    
     function initializeShopMenu(){
            shopPage = 0;
            nextButton = game.add.text(game.world.centerX * (9/5), game.world.centerY - 100, "Next");
            nextButton.font = 'Revalia';
            nextButton.fontSize = 25;
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
            })
                
            backButton = game.add.text(game.world.centerX * (7/5) + 50, game.world.centerY - 100, "Back");
            backButton.font = 'Revalia';
            backButton.fontSize = 25;
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
            })
            
            healthButton = game.add.text(game.world.centerX * (6/5) - 50, 100, "Buy Health");
            healthButton.font = 'Revalia';
            healthButton.fontSize = 25;
            grd = healthButton.context.createLinearGradient(0, 0, 0, healthButton.canvas.height);
            grd.addColorStop(0, '#8ED6FF');   
            grd.addColorStop(1, '#004CB3');
            healthButton.fill = grd;
            healthButton.align = 'center';
            healthButton.stroke = '#000000';
            healthButton.strokeThickness = 2;
            healthButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            healthButton.inputEnabled = true;

            healthButton.events.onInputOver.add(function(){
                healthButton.fill = '#ff00ff';
            }, this);
            healthButton.events.onInputOut.add(function(){
                healthButton.fill = grd;
            }, this);
            healthButton.events.onInputDown.add(function(){
                   if(defEngine.globalHealth < 100 && playerState.gold >= ((100-defEngine.globalHealth) * 5)){
                      playerState.gold -= (100 - defEngine.globalHealth) * 5;   //costs 5 gold for every global health healed.
                      buyHealthPotion();
                   }
            })
            
            slotButton = game.add.text(game.world.centerX * (6/5) - 50, 150, "Buy Unit Slot");
            slotButton.font = 'Revalia';
            slotButton.fontSize = 25;
            grd = slotButton.context.createLinearGradient(0, 0, 0, slotButton.canvas.height);
            grd.addColorStop(0, '#8ED6FF');   
            grd.addColorStop(1, '#004CB3');
            slotButton.fill = grd;
            slotButton.align = 'center';
            slotButton.stroke = '#000000';
            slotButton.strokeThickness = 2;
            slotButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
            slotButton.inputEnabled = true;
            slotButton.events.onInputOver.add(function(){
                slotButton.fill = '#ff00ff';
            }, this);
            slotButton.events.onInputOut.add(function(){
                slotButton.fill = grd;
            }, this);
            slotButton.events.onInputDown.add(function(){
                   if(playerState.unitSlots < 8 && playerState.gold >= 250){
                       playerState.gold -= 250;
                       buyUnitSlot();
                   }
            })
            
            stickerButton = game.add.text(game.world.centerX * (6/5) - 50, 200, "Buy Sticker Slot");
            stickerButton.font = 'Revalia';
            stickerButton.fontSize = 25;
            grd = stickerButton.context.createLinearGradient(0, 0, 0, stickerButton.canvas.height);
            grd.addColorStop(0, '#8ED6FF');   
            grd.addColorStop(1, '#004CB3');
            stickerButton.fill = grd;
            stickerButton.align = 'center';
            stickerButton.stroke = '#000000';
            stickerButton.strokeThickness = 2;
            stickerButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
            stickerButton.inputEnabled = true;
            stickerButton.events.onInputOver.add(function(){
                stickerButton.fill = '#ff00ff';
            }, this);
            stickerButton.events.onInputOut.add(function(){
                stickerButton.fill = grd;
            }, this);
            stickerButton.events.onInputDown.add(function(){
                   if(playerState.base.stickers < 30 && playerState.gold >= 100){
                       playerState.gold -= 100;
                       buyStickerSlot();
                   }
            })
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
                            slots[n].name.setText(shopMenuItems.list[i].name);
                            slots[n].name.visible = true;
                            slots[n].cost.setText(shopMenuItems.list[i].cost);
                            slots[n].cost.visible = true;
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
                        slots[n].slot.loadTexture(stickers[i]);
                        slots[n].keyIndex = i;
                        slots[n].key = stickers[i];
                        slots[n].slot.events.onInputDown.removeAll();
                        slots[n].name.setText(shopMenuItems.list[i].name);
                        slots[n].cost.setText(shopMenuItems.list[i].cost);
                        slots[n].cost.setText(shopMenuItems.list[i].cost);
                        addEventtoSlot(i, slots[n].slot);
                        ++n;
                    }else{
                        break;
                    }
                ++i;
                }
                if(n < slots.length){
                    slots[n].slot.visible = false;
                    slots[n].slot.inputEnabled = false;
                    slots[n].name.visible = false;
                    slots[n].cost.visible = false;
                }
            }
        }
    }
    
    function clickSlot(slotClicked){
         for(var i = 0; i < slots.length; ++i){
             owned = false;
            if(slotClicked === slots[i].keyIndex)
            {
                for(var q = 0; q < playerState.purchases.length; q++)
                {
                    if(playerState.purchases[q] == slots[i].key)
                    {
                        owned = true;
                    }
                }
                if(!owned) 
                {
                    if(defEngine.canAfford(slots[i].cost._text))
                    {
                        defEngine.spendGold(slots[i].cost._text);
                        slots[i].cost.setText("Owned");
                    }
                    playerState.purchases.push(slots[i].key);
                    updatePurchases();
                }
                console.log(playerState.purchases);
                console.log(slots[i].cost._text);
            }
        }
    }
    function openShop(){
        shopmenu.visible = true;
        shopmenu.inputEnabled = true;
        exitButton.visible = true;
        exitButton.inputEnabled = true;
        backButton.visible = true;
        backButton.inputEnabled = true;
        nextButton.visible = true;
        nextButton.inputEnabled = true;
        
        healthButton.visible = true;
        healthButton.inputEnabled = true;
        slotButton.visible = true;
        slotButton.inputEnabled = true;
        stickerButton.visible = true;
        stickerButton.inputEnabled = true;
        
        showShop = true;
        showShopItems();
    }
    function closeShop(){
        shopmenu.visible = false;
        shopmenu.inputEnabled = false;
        exitButton.visible = false;
        exitButton.inputEnabled = false;
        backButton.visible = false;
        backButton.inputEnabled = false;
        nextButton.visible = false;
        nextButton.inputEnabled = false;
        
        healthButton.visible = false;
        healthButton.inputEnabled = false;
        slotButton.visible = false;
        slotButton.inputEnabled = false;
        stickerButton.visible = false;
        stickerButton.inputEnabled = false;
        
        showShop = false;
        removeShopItems();
    }
    function removeShopItems(){
        for(var i = 0; i < numOfSlots; ++i){
            slots[i].slot.visible = false;
            slots[i].slot.inputEnabled = false;
            slots[i].name.visible = false;
            slots[i].cost.visible = false;
            slots[i].slot.events.onInputDown.removeAll();
        }
    }
    function showShopItems(){
        pageNum = 0;
        for(var i = 0; i < numOfSlots; i++){
            slots[i].slot.visible = true;
            slots[i].slot.inputEnabled = true;
            slots[i].name.visible = true;
            slots[i].cost.visible = true;
            
            slots[i].slot.loadTexture(stickers[i]);
            slots[i].keyIndex = i;
            slots[i].key = stickers[i];
            slots[i].name.setText(shopMenuItems.list[i].name);
            slots[i].cost.setText(shopMenuItems.list[i].cost);
            addEventtoSlot(i, slots[i].slot);
        }
    }
    function initializeShopItems(){
                for(var i = 0; i < numOfSlots; ++i){
                    var temp = {};
                    var name;
                    var cost;
                    temp = game.add.sprite(game.world.centerX * (7/5) + 50, 100 + 50*slots.length, stickers[i]);
                    name = game.add.text(game.world.centerX * (8/5), 100 + 50*slots.length, shopMenuItems.list[i].name);
                    cost = game.add.text(game.world.centerX * (9/5), 100 + 50*slots.length, shopMenuItems.list[i].cost);
                    temp.scale.set(.35, .35);
                    slots.push({slot:temp, key:stickers[i], keyIndex:i, name:name, cost:cost});
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
                            shopMenuItems.list[j].cost = "Owned";
                        }
                    }
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
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.clickBack = clickBack;
    that.clickNext = clickNext;
    that.clickSlot = clickSlot;
    that.removeShopItems = removeShopItems;
    that.closeShop = closeShop;
    that.showShopItems = showShopItems;
    that.openShop = openShop;
    that.getShowShop = getShowShop;

    return that;
}