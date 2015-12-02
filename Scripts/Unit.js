var Unit = function (parent, game){
    var that = {};
    
    var position = {};
    var unitSprite;
    var max_size = 10;
    var curr_children = 0; //number of units within the unit slot
    var old_curr_children = 0;
    var clicks = 0;
    var shoot = true;

    var bulletSprite;
    var bulletSprite2;
    var bulletSprite3;
    
    var HealthBarSprite; //picture for the health bar of units
    var initial_Health_Bar_Sprite_Width; //inital width of the health bar image (before crops)
    var isHealthDisplayed = false;
    var CurrentUnitHealth; //current health of the displayed Unit;
    var initalUnitHealth;
    
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

    var dmgAmount;

    function Preload(){

    }
    
    function OnCreate(x, y, unitGroup, enemypGroup){
        thisIsBase = false;
        topBaseCollision = defEngine.getTopBaseCollision();
        position.x = x;
        position.y = y;
        isHealthDisplayed = false;
        
        bulletSpriteGroup = game.add.group();
        
        unitSprite = game.add.sprite(position.x, position.y, 'unit0' );
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
        grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        text.fill = grd;
        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        //set up the health sprite for each unit.
        HealthBarSprite = game.add.sprite(position.x - 50, position.y - 75, 'unit_health');
        HealthBarSprite.visible = isHealthDisplayed;
        HealthBarSprite.crop(new Phaser.Rectangle(0,0,HealthBarSprite.width, 20));
        isHealthDisplayed = false;
        CurrentUnitHealth = 50;
        initial_Health_Bar_Sprite_Width = HealthBarSprite.width;
        
        setUnit('BaseSticker1');
        
        /*pistolSprite = game.add.sprite(position.x-150, position.y, 'Unit3');
        pistolCostText = game.add.text(position.x-150, position.y, '5');
        pistolCostText.anchor.set(0.25);
        pistolCostText.font = 'Revalia';
        pistolCostText.fontSize = 30;
        pistolCostText.fill = grd;
        pistolCostText.align = 'center';
        pistolCostText.stroke = '#000000';
        pistolCostText.strokeThickness = 2;
        pistolCostText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        shotgunSprite = game.add.sprite(position.x-250, position.y, 'Unit1');
        shotgunCostText = game.add.text(position.x-250, position.y, '20');
        shotgunCostText.anchor.set(0.25);
        shotgunCostText.font = 'Revalia';
        shotgunCostText.fontSize = 30;
        shotgunCostText.fill = grd;
        shotgunCostText.align = 'center';
        shotgunCostText.stroke = '#000000';
        shotgunCostText.strokeThickness = 2;
        shotgunCostText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        rifleSprite = game.add.sprite(position.x-150, position.y-100, 'Unit2');
        rifleCostText = game.add.text(position.x-150, position.y-100, '10');
        rifleCostText.anchor.set(0.25);
        rifleCostText.font = 'Revalia';
        rifleCostText.fontSize = 30;
        rifleCostText.fill = grd;
        rifleCostText.align = 'center';
        rifleCostText.stroke = '#000000';
        rifleCostText.strokeThickness = 2;
        rifleCostText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        pistolSprite.inputEnabled = false;
        shotgunSprite.inputEnabled = false;
        rifleSprite.inputEnabled = false;
        pistolSprite.visible = false;
        shotgunSprite.visible = false;
        rifleSprite.visible = false;
        rifleCostText.visible = false;
        pistolCostText.visible = false;
        shotgunCostText.visible = false;*/
        
        /*pistolSprite.events.onInputDown.add(function(){
            defEngine.click_sound();
            bulletType = 'pistol';
            cost = 5;
            pistolSprite.visible = false;
            shotgunSprite.visible = false;
            rifleSprite.visible = false;
            rifleCostText.visible = false;
            pistolCostText.visible = false;
            shotgunCostText.visible = false;
            pistolSprite.inputEnabled = false;
            shotgunSprite.inputEnabled = false;
            rifleSprite.inputEnabled = false;
            showWeapons = false;
            add_unit(1);
            unitSprite.loadTexture('Unit3');
        });
        
        shotgunSprite.events.onInputDown.add(function(){
            defEngine.click_sound();
            bulletType = 'shotgun';
            cost = 20;
            pistolSprite.visible = false;
            shotgunSprite.visible = false;
            rifleSprite.visible = false;
            rifleCostText.visible = false;
            pistolCostText.visible = false;
            shotgunCostText.visible = false;
            pistolSprite.inputEnabled = false;
            shotgunSprite.inputEnabled = false;
            rifleSprite.inputEnabled = false;
            showWeapons = false;
            add_unit(1);
            unitSprite.loadTexture('Unit1');
        });
        
        rifleSprite.events.onInputDown.add(function(){
            defEngine.click_sound();
            bulletType = 'rifle';
            cost = 10;
            pistolSprite.visible = false;
            shotgunSprite.visible = false;
            rifleSprite.visible = false;
            rifleCostText.visible = false;
            pistolCostText.visible = false;
            shotgunCostText.visible = false;
            pistolSprite.inputEnabled = false;
            shotgunSprite.inputEnabled = false;
            rifleSprite.inputEnabled = false;
            showWeapons = false;
            add_unit(1);
            unitSprite.loadTexture('Unit2');
        });*/
        
        unitSprite.events.onInputDown.add(function(){
            defEngine.click_sound();
            if(bulletType=='none'){
                /*if(showWeapons == true){
                    showWeapons = false;
                }
                else {
                    showWeapons = true;
                }
                weaponSelection();*/
            }
            else{
                add_unit(1);
                update_text();
            }
        });
        
        pew_sfx = game.add.audio('pew');
        
        unitGroup.add(unitSprite);
        collision_group = unitGroup;
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
        
        var overlap = game.physics.arcade.overlap(topBaseCollision, bulletSpriteGroup, function(obj1, obj2){
            currentBullet = obj2;
        }, null, null, this);
        
        if(overlap == true)
        {
            removeBulletOnly(currentBullet);
        }
    }
    
    function damage(healthRemoved){
        CurrentUnitHealth = CurrentUnitHealth - healthRemoved;
        HealthBarSprite.crop(new Phaser.Rectangle(0,0, initial_Health_Bar_Sprite_Width * CurrentUnitHealth/initalUnitHealth, 20));
        HealthBarSprite.updateCrop();
        
        if(CurrentUnitHealth <= 0){ //if a unit has been destroyed
            curr_children = curr_children - 1;
            
            if(curr_children > 0){ //if there are more units underneath the one that has been defeated, renew the healthbar
                CurrentUnitHealth = initalUnitHealth;
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
           defEngine.spendGold(cost);
           set_health_visible();
           CurrentUnitHealth = 50;
           initalUnitHealth = CurrentUnitHealth;
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
    
    function removeBulletOnly(bSprite){
        bSprite.destroy();
    }
    
    function isAttack(){
        return can_attack;
    }
    
    /*function weaponSelection(){
        if(showWeapons == true){
            pistolSprite.visible = true;
            shotgunSprite.visible = true;
            rifleSprite.visible = true;
            pistolSprite.inputEnabled = true;
            shotgunSprite.inputEnabled = true;
            rifleSprite.inputEnabled = true;
            rifleCostText.visible = true;
            pistolCostText.visible = true;
            shotgunCostText.visible = true;
        }
        else{
            pistolSprite.visible = false;
            shotgunSprite.visible = false;
            rifleSprite.visible = false;
            pistolSprite.inputEnabled = false;
            shotgunSprite.inputEnabled = false;
            rifleSprite.inputEnabled = false;
            rifleCostText.visible = false;
            pistolCostText.visible = false;
            shotgunCostText.visible = false;
        }
    }*/
    
    function setUnit(spriteName){
        unitSprite.loadTexture(spriteName);
        //console.log(shopMenuItems);
        for(var i = 0; i < shopMenuItems.list.length; ++i){
            //console.log(shopMenuItems[i].key + " = " + spriteName);
            if(shopMenuItems.list[i].key == spriteName){
                bulletType = shopMenuItems.list[i].type;
                dmgAmount = shopMenuItems.list[i].cost/10;
                break;
            }
        }
        console.log(bulletType);
        unitSprite.alpha=1;
        curr_children=1;
    }
    
    that.setUnitSprite = function(newSprite){ unitSprite = newSprite;}
    that.setText = function(newText){ text = newText;}
    that.setAsBase = function(){thisIsBase = true;}
    that.thisIsBase = function(){return thisIsBase;}
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getUnitSprite = getUnitSprite;
    that.get_children = get_children;
    that.damage_units = damage_units;
    that.isAttack = isAttack;
    return that;
}
