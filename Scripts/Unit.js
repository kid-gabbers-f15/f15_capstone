var Unit = function (parent, game){
    var that = {};
    
    var position = {};
    var unitSprite;
    var max_size = 10;
    var curr_children = 0; //number of units within the unit slot
    var old_curr_children = 0;
    var clicks = 0;
    var shoot = true;
    var identity; //identity of the slot. (slot index)

    var bulletSprite;
    var bulletSprite2;
    var bulletSprite3;
    
    var HealthBarSprite; //picture for the health bar of units
    var initial_Health_Bar_Sprite_Width; //inital width of the health bar image (before crops)
    var isHealthDisplayed = false;
    var CurrentUnitHealth; //current health of the displayed Unit;
    var initialunithealth;
    
    var focusedEnemy;
    var focusedEnemyDistance = 1000;
    var focusedEnemyX;
    var focusedEnemyY;
    var bulletSpriteGroup;
    var damage_from_enemy = 5; //damage from enemy;

    var collision_group;
    var text;
    var topBaseCollision;
    
    var bulletType = 'none';
    var cost = 5;
    var pistolSprite;
    var shotgunSprite;
    var rifleSprite;
    var pistolCostText;
    var shotgunCostText;
    var rifleCostText;
    var thisIsBase; //bool to see if this unit is a base, or just a single unit
    var showWeapons = false;
    var pew_sfx; // Sound effect for shooting
    var grd2, grdw;

    var dmgAmount;

    function Preload(){

    }
    
    function OnCreate(x, y, unitGroup, id){
        identity = id;
        
//======= old
  //  function OnCreate(x, y, unitGroup, enemypGroup){
//>>>>>>> master
        thisIsBase = false;
        topBaseCollision = defEngine.getTopBaseCollision();
        position.x = x;
        position.y = y;
        isHealthDisplayed = false;
        
        bulletSpriteGroup = game.add.group();
        
        unitSprite = game.add.sprite(position.x, position.y, 'unit0' );
        unitSprite.scale.setTo(0.75, 0.75);
        unitSprite.alpha=0;
        game.physics.enable(unitSprite, Phaser.Physics.ARCADE);
        unitSprite.body.collideWorldBounds = true;
        unitSprite.anchor.setTo(0.5, 0.5);
        unitSprite.body.immovable = true;
        unitSprite.inputEnabled = true;
        unitSprite.input.useHandCursor = true;
        
        
        
        
        
        text = game.add.text(position.x + 15, position.y + 5, curr_children);
        text.anchor.set(0.25);
        text.font = 'Revalia';
        text.fontSize = 45;
        grdw = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grdw.addColorStop(0, '#fef5ff');   
        grdw.addColorStop(1, '#fef5ff');
        grd2 = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grd2.addColorStop(0, '#fff08e');   
        grd2.addColorStop(1, '#a6b300');
        text.fill = grdw;
        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 4;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        //set up the health sprite for each unit.
        HealthBarSprite = game.add.sprite(position.x - 50, position.y - 75, 'unit_health');
        HealthBarSprite.visible = isHealthDisplayed;
        HealthBarSprite.crop(new Phaser.Rectangle(0,0,HealthBarSprite.width, 20));
        isHealthDisplayed = false;
        CurrentUnitHealth = 50;
        initial_Health_Bar_Sprite_Width = HealthBarSprite.width;
        
        unitSprite.events.onInputDown.add(function(){
            defEngine.click_sound();
            if(bulletType=='none'){
                defEngine.showToolbar(that);
                tempState.unit_slot_count[identity]++; //increase the slot count
            }
            else{
                
                add_unit(1);
            
                tempState.unit_slot_count[identity]++; //increase the slot count
                update_text();
            }
        });
        
        pew_sfx = game.add.audio('pew');
        
        unitGroup.add(unitSprite);
        collision_group = unitGroup;
        
        
        
        if(tempState.unit_slot_count[identity] > 0){ //came back from base editing, need to initialize the units slots to how they were before
            
            console.log(tempState.unit_slot_count[identity]);
            
            initialize_old_slots(); //after comign back from editing the base, put the units back into the slots.
            
            
        }
    }
    
    function resetShoot(){
        shoot = true;
    }
    
    function Update(){
        update_text();
        if(curr_children == 0){ //there are no units in this slot. 
            set_health_invisible();
            unitSprite.loadTexture('unit0');
            unitSprite.alpha=0;
            bulletType = 'none';
        }
        else unitSprite.alpha = 1; //display a unit
        
        var enemyGroup = defEngine.getEnemyManager().getEnemyGroup();
        
        if(shoot==true && curr_children>0){ //do damage to an enemy
            focusedEnemyDistance = 1000;
            focusedEnemy = undefined;
            for(var i=0;i<enemyGroup.length;i++){
                var enemyPos = enemyGroup[i].getPos();
                var xd = enemyPos.x - position.x;
                var yd = enemyPos.y - position.y;
                var distance = Math.sqrt((xd*xd)+(yd*yd));
                if(distance<=1000 && enemyGroup[i].getIsActive()==true && curr_children>0 && distance<focusedEnemyDistance && enemyGroup[i].getHealth()>0){
                    focusedEnemy = enemyGroup[i];
                    focusedEnemyDistance = distance;
                    focusedEnemyX = enemyPos.x;
                    focusedEnemyY = enemyPos.y;
                    //console.log("x: " + focusedEnemyX);
                    //console.log("y: " + focusedEnemyY);
                }
            }
            
            if(focusedEnemy!=undefined){
                if(bulletType=='pistol'){
                    pew_sfx.play();
                    bulletSprite = game.add.sprite(position.x, position.y, 'bullet' );
                    bulletSprite.scale.setTo(2,2);
                    game.physics.enable(bulletSprite, Phaser.Physics.ARCADE);
                    bulletSprite.checkWorldBounds = true;
                    bulletSprite.outOfBoundsKill = true;
                    game.physics.arcade.moveToXY(
                        bulletSprite,
                        focusedEnemyX,
                        focusedEnemyY,
                        1000
                    );
                    shoot=false;
                    setTimeout(resetShoot, 1000-(curr_children*50));
                    bulletSpriteGroup.add(bulletSprite);
                }
                else if(bulletType=='shotgun'){
                    pew_sfx.play();
                    bulletSprite = game.add.sprite(position.x, position.y, 'bullet' );
                    bulletSprite2 = game.add.sprite(position.x, position.y, 'bullet' );
                    bulletSprite3 = game.add.sprite(position.x, position.y, 'bullet' );
                    bulletSprite.scale.setTo(2,2);
                    bulletSprite2.scale.setTo(2,2);
                    bulletSprite3.scale.setTo(2,2);

                    game.physics.enable(bulletSprite, Phaser.Physics.ARCADE);
                    game.physics.enable(bulletSprite2, Phaser.Physics.ARCADE);
                    game.physics.enable(bulletSprite3, Phaser.Physics.ARCADE);
                    
                    bulletSprite.checkWorldBounds = true;
                    bulletSprite2.checkWorldBounds = true;
                    bulletSprite3.checkWorldBounds = true;
                    
                    bulletSprite.outOfBoundsKill = true;
                    bulletSprite2.outOfBoundsKill = true;
                    bulletSprite3.outOfBoundsKill = true;
                    
                    game.physics.arcade.moveToXY(
                        bulletSprite,
                        focusedEnemyX + 20,
                        focusedEnemyY + 20,
                        500
                    );
                    game.physics.arcade.moveToXY(
                        bulletSprite2,
                        focusedEnemyX - 50,
                        focusedEnemyY - 50,
                        500
                    );
                    game.physics.arcade.moveToXY(
                        bulletSprite3,
                        focusedEnemyX - 20,
                        focusedEnemyY - 20,
                        500
                    );
                        
                    shoot=false;
                    setTimeout(resetShoot, 2000-(curr_children*50));
                    bulletSpriteGroup.add(bulletSprite);
                    bulletSpriteGroup.add(bulletSprite2);
                    bulletSpriteGroup.add(bulletSprite3);
                }
                else if(bulletType=='rifle'){
                    pew_sfx.play();
                    bulletSprite = game.add.sprite(position.x, position.y, 'bullet' );
                    bulletSprite.scale.setTo(2,2);
                    game.physics.enable(bulletSprite, Phaser.Physics.ARCADE);
                    bulletSprite.checkWorldBounds = true;
                    bulletSprite.outOfBoundsKill = true;
                    game.physics.arcade.moveToXY(
                        bulletSprite,
                        focusedEnemyX,
                        focusedEnemyY,
                        1000);
                    shoot=false;
                    setTimeout(resetShoot, 3000-(curr_children*50));
                    bulletSpriteGroup.add(bulletSprite);
                }
            }
        }
        
        if(focusedEnemy!=undefined){
            for(var i = 0; i<enemyGroup.length; i++){
                if(enemyGroup[i]!=undefined && enemyGroup[i].getIsActive()==true){
                    var currentBullet;
                    var hitEnemy;
                    var overlap = game.physics.arcade.overlap(enemyGroup[i].getEnemySprite(), bulletSpriteGroup, function(obj1, obj2){
                        hitEnemy = obj1;
                        currentBullet = obj2;
                    }, null, null, this);
                    if(overlap == true)
                    {
                        removeBullet(currentBullet, enemyGroup[i]);
                    }
                }
            }
        }
    }
    
    function damage(healthRemoved){
        CurrentUnitHealth = CurrentUnitHealth - healthRemoved;
        HealthBarSprite.crop(new Phaser.Rectangle(0,0, initial_Health_Bar_Sprite_Width * CurrentUnitHealth/initialunithealth, 20));
        HealthBarSprite.updateCrop();
        
        if(CurrentUnitHealth <= 0){ //if a unit has been destroyed
            curr_children = curr_children - 1;
            tempState.unit_slot_count[identity] = curr_children; //save the decrement amount;
            if(curr_children > 0){ //if there are more units underneath the one that has been defeated, renew the healthbar
                CurrentUnitHealth = initialunithealth;
                HealthBarSprite.crop(new Phaser.Rectangle(0,0, initial_Health_Bar_Sprite_Width, 20));
                HealthBarSprite.updateCrop();
            }
        }
    }
    
    function damage_units(damage_from_enemy){
        damage(damage_from_enemy);
    }
    
    function add_unit(num_unit){
        if(curr_children != max_size && defEngine.canAfford(cost)){
           curr_children = curr_children + num_unit;
           console.log("Current Children 1 : " + curr_children);
           defEngine.spendGold(cost);
           set_health_visible();
           CurrentUnitHealth = 10 * cost;
           initialunithealth = CurrentUnitHealth;
        }
        
    }
        
    function set_health_visible(){
        isHealthDisplayed = true;
        HealthBarSprite.visible = isHealthDisplayed;
        HealthBarSprite.crop(new Phaser.Rectangle(0,0, 100, 20)); //crop it back to normal
        HealthBarSprite.updateCrop();
    }
    
    function set_health_invisible(){
        isHealthDisplayed = false;
        HealthBarSprite.visible = isHealthDisplayed;
    }
        
    function getUnitSprite(){
        return unitSprite;
    }
    
    function get_children(){
        return curr_children;
    }
    
    function update_text(){
        text.setText(curr_children);
    }

    function removeBullet(bSprite, enemy){
        bSprite.destroy();
        enemy.damage(dmgAmount);
    }
    
    function isAttack(){
        return can_attack;
    }
    
    function setUnit(spriteName){
        console.log("SETTING UNIT");
        if(spriteName != undefined){
            unitSprite.loadTexture(spriteName);
            for(var i = 0; i < shopMenuItems.list.length; ++i){
                if(shopMenuItems.list[i].key === spriteName){
                    bulletType = shopMenuItems.list[i].type;
                    cost = shopMenuItems.list[i].cost/20;
                    dmgAmount = Math.floor(shopMenuItems.list[i].cost/10);
                    initialunithealth = Math.ceil(shopMenuItems.list[i].cost*.75);
                    //console.log("cost: " + cost);
                    //console.log("shopMenuItems.list[i].cost: " + shopMenuItems.list[i].cost);
                    //dmgAmount = 10;
                    break;
                }
            }
            //console.log(bulletType);
            console.log("getting the key");
            tempState.unit_slotSprite[identity] = unitSprite.key;
            console.log("This is the key: " + unitSprite.key + tempState.unit_slotSprite[identity]);
            unitSprite.alpha=1;
            add_unit(1);
        }
        
    }
    
    function initialize_old_slots(){ //starting function to add the units back to the slot after returning back from base edits
    
        init_setUnit(tempState.unit_slotSprite[identity]); //set the sprite
        for(var unitCount = 0; unitCount < tempState.unit_slot_count[identity]; ++unitCount){ //starts at one because setUnit sets up one already
        
            console.log("another: " + unitCount);
            init_add_unit(1); //add unit wthout cost since coming back from edit base
        }
        
    }
    
    function init_setUnit(spriteName){ //this functin will initialize the unit when the game comes back from base edits
        
        if(spriteName != undefined){
            unitSprite.loadTexture(spriteName);
            for(var i = 0; i < shopMenuItems.list.length; ++i){
                if(shopMenuItems.list[i].key === spriteName){
                    bulletType = shopMenuItems.list[i].type;
                    dmgAmount = Math.floor(shopMenuItems.list[i].cost/10);
                    initialunithealth = Math.ceil(shopMenuItems.list[i].cost*.75);
                    break;
                }
            }
            unitSprite.alpha=1;
        }
    }
    
    function init_add_unit(num_unit){ //this function will be to add the units back to the slot after returning from base edits.
         if(curr_children != max_size && defEngine.canAfford(cost)){
           curr_children = curr_children + num_unit; //increase the tracker for 
           set_health_visible();
           CurrentUnitHealth = 10 * cost;
           initialunithealth = CurrentUnitHealth;
        }
    }
    
    that.setUnitSprite = function(newSprite){ unitSprite = newSprite;}
    that.setText = function(newText){ text = newText;}
    that.setAsBase = function(){thisIsBase = true;}
    that.thisIsBase = function(){return thisIsBase;}
    that.getPosition = function(){return position;}
    that.setUnit = setUnit;
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getUnitSprite = getUnitSprite;
    that.get_children = get_children;
    that.damage_units = damage_units;
    that.isAttack = isAttack;
    return that;
}
