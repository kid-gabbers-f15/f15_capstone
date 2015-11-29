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
        }
        //define the shop menu and the items that go within it
        initializeShopMenu();
        initializeShopItems();
        
    }
    
    function Update(){
        
       
    }
    
     function initializeShopMenu(){
            shopPage = 0;
            shopmenu = game.add.sprite(game.world.centerX, game.world.centerY, 'shopMenu');
            shopmenu.anchor.setTo(0.5,0.5);
            shopmenu.scale.setTo(15,10);
            shopmenu.inputEnabled = false;
            shopmenu.visible = false;
            exitButton = game.add.text(game.world.centerX + 250, game.world.height - 150, "Exit");
            exitButton.font = 'Revalia';
            exitButton.fontSize = 60;
            grd = exitButton.context.createLinearGradient(0, 0, 0, exitButton.canvas.height);
            grd.addColorStop(0, '#8ED6FF');   
            grd.addColorStop(1, '#004CB3');
            exitButton.fill = grd;
            exitButton.align = 'center';
            exitButton.stroke = '#000000';
            exitButton.strokeThickness = 2;
            exitButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
            exitButton.inputEnabled = false;
            exitButton.visible = false;
            exitButton.events.onInputOver.add(function(){
                exitButton.fill = '#ff00ff';
            }, this);
            exitButton.events.onInputOut.add(function(){
                exitButton.fill = grd;
            }, this);
            exitButton.events.onInputDown.add(function(){
                    closeShop();
            })
                
                
            nextButton = game.add.text(game.world.centerX + 500, game.world.height - 150, "Next");
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
        
            nextButton.inputEnabled = false;
            nextButton.visible = false;
            nextButton.events.onInputOver.add(function(){
                nextButton.fill = '#ff00ff';
            }, this);
            nextButton.events.onInputOut.add(function(){
                nextButton.fill = grd;
            }, this);
            nextButton.events.onInputDown.add(function(){
                    clickNext();
            })
                
            backButton = game.add.text(game.world.centerX, game.world.height - 150, "Back");
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
            
            backButton.inputEnabled = false;
            backButton.visible = false;
            backButton.events.onInputOver.add(function(){
                backButton.fill = '#ff00ff';
            }, this);
            backButton.events.onInputOut.add(function(){
                backButton.fill = grd;
            }, this);
            backButton.events.onInputDown.add(function(){
                    clickBack();
            })
            
            
            healthButton = game.add.text(game.world.centerX - 700, 150, "Buy Health");
            healthButton.font = 'Revalia';
            healthButton.fontSize = 60;
            grd = healthButton.context.createLinearGradient(0, 0, 0, healthButton.canvas.height);
            grd.addColorStop(0, '#8ED6FF');   
            grd.addColorStop(1, '#004CB3');
            healthButton.fill = grd;
            healthButton.align = 'center';
            healthButton.stroke = '#000000';
            healthButton.strokeThickness = 2;
            healthButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
            healthButton.inputEnabled = false;
            healthButton.visible = false;
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
            
            slotButton = game.add.text(game.world.centerX - 700, 250, "Buy Unit Slot");
            slotButton.font = 'Revalia';
            slotButton.fontSize = 60;
            grd = slotButton.context.createLinearGradient(0, 0, 0, slotButton.canvas.height);
            grd.addColorStop(0, '#8ED6FF');   
            grd.addColorStop(1, '#004CB3');
            slotButton.fill = grd;
            slotButton.align = 'center';
            slotButton.stroke = '#000000';
            slotButton.strokeThickness = 2;
            slotButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
            slotButton.inputEnabled = false;
            slotButton.visible = false;
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
            
            stickerButton = game.add.text(game.world.centerX - 700, 350, "Buy Sticker Slot");
            stickerButton.font = 'Revalia';
            stickerButton.fontSize = 60;
            grd = stickerButton.context.createLinearGradient(0, 0, 0, stickerButton.canvas.height);
            grd.addColorStop(0, '#8ED6FF');   
            grd.addColorStop(1, '#004CB3');
            stickerButton.fill = grd;
            stickerButton.align = 'center';
            stickerButton.stroke = '#000000';
            stickerButton.strokeThickness = 2;
            stickerButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
            stickerButton.inputEnabled = false;
            stickerButton.visible = false;
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
            if(slotClicked === slots[i].keyIndex)
            {
                if(defEngine.canAfford(slots[i].cost._text))
                {
                    defEngine.spendGold(slots[i].cost._text);
                }
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
                    temp = game.add.sprite(game.world.centerX, 150 + 150*slots.length, stickers[i]);
                    name = game.add.text(game.world.centerX + 250, 150+ 150*slots.length, shopMenuItems.list[i].name);
                    name.visible = false;
                    cost = game.add.text(game.world.centerX + 500, 150 + 150*slots.length, shopMenuItems.list[i].cost);
                    cost.visible = false;
                    temp.scale.set(.75, .75);
                    temp.anchor.set(.5,.5);
                    temp.visible = false;
                    slots.push({slot:temp, key:stickers[i], keyIndex:i, name:name, cost:cost});
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