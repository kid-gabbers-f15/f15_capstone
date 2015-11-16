var ShopManager = function (game){
    var that = {};

    var shopmenu;
    var topBaseBackground;
    var exitButton;
    var showShop = false;
    var shopPage = 0;
    var nextButton;
    var backButton;
    var shopMenuItems;
    var numOfSlots = 5;
    var pageNum = 0;
    var stickers = [];
    var slots = [];
    var grd;

    function loadShopItems(items){
        for(var i = 0; i < items.list.length; i++){
            var temp = game.add.sprite(items.list[i].position.x + game.world.centerX, items.list[i].position.y + game.world.centerY, items.list[i].image);
            temp.anchor.setTo(0.5,0.5);
            temp.scale.setTo(0.5,0.5);
        }
    }
    
    function addEventtoSlot(index, slot){
        slot.events.onInputDown.add(function(){
            clickSlot(index);
        });
    }
    
    function Preload(){
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.text('JSONshopMenuItems', 'Scripts/shopItems.txt');
    }
    
    
    function OnCreate(){
        shopMenuItems = JSON.parse(game.cache.getText('JSONshopMenuItems'));
        loadShopItems(shopMenuItems);
        
        
        for(var i = 0; i < game.cache.getKeys().length; ++i){
            if(game.cache.getKeys()[i].indexOf('Item') >= 0){
                stickers.push(game.cache.getKeys()[i]);
            }
        }
        
        initializeShopMenu();
        initializeShopItems();
        
    }
    
    function Update(){
        
       
    }
    
     function initializeShopMenu(){
            shopPage = 0;
            //shopbutton.fill = grd;
            
            //game.paused = true; 
            //game is no longer pausing
            /*
            pausetext = game.add.text(game.world.width - 200, 30, "PAUSED");
                    pausetext.font = 'Revalia';
                    pausetext.fontSize = 60;
                    grd = pausetext.context.createLinearGradient(0, 0, 0, pausetext.canvas.height);
                    grd.addColorStop(0, '#8ED6FF');   
                    grd.addColorStop(1, '#004CB3');
                    pausetext.fill = grd;
                    pausetext.align = 'center';
                    pausetext.stroke = '#000000';
                    pausetext.strokeThickness = 2;
                    pausetext.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            pausetext.anchor.setTo(0.5,0.5);
            */
            shopmenu = game.add.sprite(game.world.centerX, game.world.centerY, 'shopMenu');
                shopmenu.anchor.setTo(0.5,0.5);
                shopmenu.scale.setTo(10,10);
                shopmenu.inputEnabled = false;
                shopmenu.visible = false;
            exitButton = game.add.text(game.world.centerX - 75, game.world.height - 150, "Exit");
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
                
                
            nextButton = game.add.text(game.world.centerX + 200, game.world.height - 150, "Next");
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
                
            backButton = game.add.text(game.world.centerX - 400, game.world.height - 150, "Back");
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
                }
            }
        }
    }
    
    function clickSlot(slotClicked){
         for(var i = 0; i < slots.length; ++i){
            if(slotClicked === slots[i].keyIndex){
                console.log(slots[i].key);
                //parent.setCurrentImage(slots[i].key);
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
        showShop = false;
        removeShopItems();
    }
    function removeShopItems(){
        for(var i = 0; i < numOfSlots; ++i){
            slots[i].slot.visible = false;
            slots[i].slot.inputEnabled = false;
            //temp.inputEnabled = true;
            //addEventtoSlot(i, temp);
            //slots.push({slot:temp, key:stickers[i], keyIndex:i});
        }
    }
    function showShopItems(){
        for(var i = 0; i < numOfSlots; i++){
            slots[i].slot.visible = true;
            slots[i].slot.inputEnabled = true;
        }
    }
    function initializeShopItems(){
                for(var i = 0; i < numOfSlots; ++i){
                    var temp = {};
                    var text;
                    temp = game.add.sprite(game.world.centerX - 300, 150 + 150*slots.length, stickers[i]);
                    //temp = game.add.sprite(50 + 100*slots.length, 900, stickers[i]);
                    temp.scale.set(.75, .75);
                    temp.anchor.set(.5,.5);
                    //temp.inputEnabled = true;
                    temp.visible = false;
                    addEventtoSlot(i, temp);
                    text = temp.key;
                    slots.push({slot:temp, key:stickers[i], keyIndex:i, name:text});
        }
    }
    function getShowShop(){
        return showShop;
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