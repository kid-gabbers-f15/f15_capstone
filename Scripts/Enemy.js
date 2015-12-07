var Enemy = function (parent, game){
    var that = {};
    
    //-----------identification stuff-------------------
    var enemySprite; // object, phaster sprite
    var boss; // bool, is this enemy a boss or not
    var type; // int, what type of enemy 
    var uGroup; // array, unit group
    var eGroup; // array, enemy group
    var killed = false; // bool, has the enemy been killed this wave
    
    
    //-----------health related stuff for enemy----------
    var healthBar; // object, phaser sprite?
    var health = 50; // int, enemy health
    var maxHealth = 50; // int, most health an enemy can have
    var const_maxHealth = 50; // int, initial health of an enemy if the health ever
    var initialHealth; // int, staring health, uneeded?
    var initHealthBar = 0.0; // float, initial amount og healthbar
    
    //-----------position related stuff for enemy--------
    var position = {}; // object, used to keep enemy x and y position
    var speed; // int, speed of the enemy
    var default_speed = speed; //default speeed of enemy when it spawns
    var timeout_speed_active; //if there is an active timeout for the daamage taken. timeout object
    var timer; //object that contains a timer. Destroyable.
    
    //-----------damage related stuff------------------
    var isActive; // bool, is this enemy active and on screen
    var enemy_damage = 10; //int, how much damage is dont by the enemy to the unit
    var target; // unit object, unit the enemy is atacking
    var can_attack; // bool, can this unit attack or not, used for delay between attacks
    var attack_delay; // int, amount of time enemy has to wait between attacks
    var took_damage; //boolean that determines if this enemy took damage
    
    //-----------aesthics-----------------------------
    var text = ""; // string, text to be displayed on the enemy sprite
    var click_sfx;
    
    
    function Preload(){
        
    }
    
    /*
    x - int, enemy x position
    y - int, enemy y position
    unitGroup - array, group of units to check for collision and attacking
    enemypGroup - ?
    isBoss - bool, is this enemy a boss or not
    type - int, type of enemy
    */
    function OnCreate(x, y, unitGroup, enemypGroup, isBoss, type){
        isActive = false;
        position.x = x;
        position.y = y;
        can_attack = true; // upon creation enemies should be able to attack instantly
        attack_delay = 0;
        took_damage = false;
        
        click_sfx = game.add.audio('click');

        if(isBoss){ //if the enemy is a boss
            enemySprite = game.add.sprite(position.x, position.y, 'EnemyBoss_1');
            game.physics.enable(enemySprite, Phaser.Physics.ARCADE);
            enemySprite.body.collideWorldBounds = true;
            enemySprite.body.friction = 10;
            enemySprite.body.drag = 100;
            enemySprite.anchor.setTo(0.5, 0.5);
    
            health = maxHealth*10;// boss health
            initialHealth = health;
            healthBar = game.add.sprite(position.x - 100, position.y - 200, 'Boss_1_Health');
            healthBar.crop(new Phaser.Rectangle(0,0,enemySprite.width, 20));
            healthBar.updateCrop();
            initHealthBar = healthBar.width;
            
            
            boss = true;
        }
        else{ // This is a regular enemy
            enemySprite = game.add.sprite(position.x, position.y, 'enemy' + Math.ceil(Math.random()*3) );
            
    
            health = maxHealth;
            initialHealth = health;
            healthBar = game.add.sprite(position.x - 50, position.y - 70, 'healthBar');
            healthBar.crop(new Phaser.Rectangle(0,0,enemySprite.width, 20));
            
            initHealthBar = healthBar.width;
            
            boss = false;
            
            if(type == 2) speed = 200;
            else speed = 100;
        }
        
        init_sprite(); //initialize sprite
        
        
        default_speed = speed;
        
        enemySprite.inputEnabled = false;
        enemySprite.events.onInputDown.add(function(){
            click_sfx.play();
            damage(playerState.clickDamage); //damage per click
        });
        
        uGroup = unitGroup; //the group that the enemies will attack
        enemypGroup.add(enemySprite);
        eGroup = enemypGroup;
        
        // Text for enemy
        var grd;
        var style = { font: "25px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: enemySprite.width, align: "center" };
        var textList = defEngine.getEnemyManager().getEnemyText();
        var selectedText = textList[Math.floor((Math.random() * 4) + 0)];
        //console.log('selectedText: ' + selectedText);
        text = game.add.text(0, 0, selectedText);
        text.font = 'Fontdiner Swanky';
        text.fontSize = 25;
        grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grd.addColorStop(0, '#ff8e9e');   
        grd.addColorStop(1, '#b30e00');
        text.fill = grd;
        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        text.anchor.set(0.5);
    }
    
    /*
    x - int, enemy x position
    y - int, enemy y position
    newTarget - object, unit for enemy to target
    */
    function ResetEnemy(x, y, newTarget){
        //reset the enemies to their original status
        
        //if the  speed is going to potentially be altered, clear the timeout and reset the speed already since the enemy is destroyed
        took_damage = false; //since were resetting the enemy, they should not be taking damage anymore
        
        if(timeout_speed_active){ //clear any time outs
            clearTimeout(timer); 
            timeout_speed_active = false; //since cleared, make it false
        } 
        
        enemySprite.alpha = 1.0; ///reset the opacity to 100%
        if(boss){
            health = maxHealth*10;
            initialHealth = health;
            healthBar.crop(new Phaser.Rectangle(0,0,enemySprite.width, 20));
            
            boss = true;
        }
        else{
            maxHealth = const_maxHealth;
            health = maxHealth;
            initialHealth = maxHealth;
            healthBar.crop(new Phaser.Rectangle(0,0,100, 20));
            
            boss = false;
        }
        
        enemySprite.position = {x, y};
        
        healthBar.updateCrop();
        activate_enemy_sprite(newTarget);
    }
    
    function Update(){ //udpate the enemies
        // Update Text
        text.x = Math.floor(enemySprite.x);
        text.y = Math.floor(enemySprite.y + 12);
        
        //if they can attack the units again or not. 
        if(attack_delay == 0) can_attack = true;
        if(attack_delay > 0) attack_delay = attack_delay - 1;
        
        //move the health accordingly
        if(boss) move_boss_health();
        else move_reg_enemy_health(); 
          
        var unitpGroup = defEngine.getPlayer().getUnitPGroup();
        
        if(target.get_children() == 0) retarget(unitpGroup);
        
        if(took_damage){
            took_damage = false;
            speed = 50;
            
            if(timeout_speed_active) clearTimeout(timer);
            
            timer = setTimeout(resetSpeed, 500);
            timeout_speed_active = true;
        } 
        
        game.physics.arcade.moveToXY(
            enemySprite,
            target.getUnitSprite().position.x,
            target.getUnitSprite().position.y,
            speed
        );
        
        position = enemySprite.position; //their new position

        //loop through units and enemies to check for collision
        //after a collision is detectd, pull the unit object and enemy object for interaction
        //var enemyGroup = defEngine.getEnemyManager().getEnemyGroup();
        
        for(var i = 0; i < unitpGroup.length; i++){
            if(unitpGroup[i].get_children() > 0){
                game.physics.arcade.collide(enemySprite, unitpGroup[i].getUnitSprite(), 
                function(){
                    if(can_attack == true && isActive == true){
                         unitpGroup[i].damage_units(enemy_damage);
                         can_attack = false;
                         reset_attack_delay();
                    } 
                }, null, null, this);
            }
            else{
                game.physics.arcade.collide(enemySprite, defEngine.friendBaseTarget().getUnitSprite(), 
                function(){
                    defEngine.damageGlobalHealth(10);
                    damage(health, false);//immediately is killed
                }, null, null, this);
            }
        }   
    }
    
    /*
    dmg - int, amount of damage to do to the enemy
    */
    function damage(dmg, getGold){ //by default, get gold is undefined, so only need to check if explicitly false
        //dmg = 34;
        //console.log(dmg);
        
        took_damage = true;
        health = health - dmg;
        enemySprite.alpha = 1.0 - 1.0*(initialHealth-health)/initialHealth; //decrease the opacity depending on the ratio between currenthealth and initial health
        
        if(enemySprite.alpha < 0.2){ //dont let it go lower than .15. too transparent
            enemySprite.alpha = .2;
        }
        
        if(boss){ //crop it depending on whether the enemy is a boss or a regular
            healthBar.crop(new Phaser.Rectangle(0,0, initHealthBar * health/initialHealth, 20));
        }
        else{
            
            healthBar.crop(new Phaser.Rectangle(0,0, initHealthBar * health/initialHealth, 20));
        }
        healthBar.updateCrop();
        
        if(health <= 0){ //if the enemy has been defeated
            //if the  speed is going to potentially be altered, 
            //clear the timeout and reset the speed already since the enemy is destroyed
            if(timeout_speed_active){
                clearTimeout(timer); 
            } 
            resetSpeed(); // reset the speed of the enemy since it died
            enemySprite.visible = false;
            healthBar.visible = false;
            enemySprite.inputEnabled = false;
            isActive = false;
            killed = true;
            text.visible = false;
            if(getGold != false){
                if(boss){
                    defEngine.addGold(100);
                    defEngine.updateScore(100);
                }
                else{
                    defEngine.addGold(10);
                    defEngine.updateScore(10);
                }
            }
        }
    }
    
    function retarget(unitpGroup){ //here we have the enemies target another unit if their initial targets are non-existent
        for(var i=0; i<unitpGroup.length; i++){
            if(unitpGroup[i].get_children() != 0){
                target = unitpGroup[i];
                
                var diff = target.getUnitSprite().position.y - enemySprite.position.y;
                
                enemySprite.position.x += 15;
                
                if(diff > 0){
                    enemySprite.position.y += 15;
                }
                else{
                    enemySprite.position.y -= 15;
                }
                
                break;
            }
            if(i == unitpGroup.length - 1){
                // Do whatever needs to be done when all units are at zero
                target = defEngine.friendBaseTarget();
            }
        }
    }
    
    function activate_enemy_sprite(enemy_target){ //initialize the sprite on the screen
    
        speed = default_speed; //assign the speed back to normal
        enemySprite.visible = true;
        healthBar.visible = true;
        enemySprite.inputEnabled = true;
        enemySprite.isActive = true;
        isActive = true;
        target = enemy_target;
        attack_delay = 0;
        can_attack = true;
    
        killed = false;
        text.visible = true;
    }
    
    function init_sprite(){
        game.physics.enable(enemySprite, Phaser.Physics.ARCADE);
        enemySprite.body.collideWorldBounds = true;
        enemySprite.body.friction = 10;
        enemySprite.body.drag = 100;
        enemySprite.anchor.setTo(0.5, 0.5);
        
        enemySprite.visible = false;
        healthBar.visible = false;
        enemySprite.inputEnabled = false;
        enemySprite.isActive = false;
        isActive = false;
    }
    
    function getPos(){
        return position;
    }
    function getIsActive(){
        return isActive;
    }
    function getEnemySprite(){
        return enemySprite;
    }
    function isAttack(){
        return can_attack;
    }
    function set_fisAttack(){
        can_attack = false;
    }
    function set_tisAttack(){
        can_attack = true;
    }
    function reset_attack_delay(){
        attack_delay = 100;
    }
    function dec_attack_delay(){
        attack_delay = attack_delay - 1;
    }
    function getHealth(){
        return health;
    }
    function getKilled(){
        return killed;
    }
    function setKilled(bool){
        killed = bool;
    }
    
    function move_boss_health(){ //move the boss towards the base 
        healthBar.position.x = enemySprite.position.x - 110;
        healthBar.position.y = enemySprite.position.y - 250;
    }
    
    function move_reg_enemy_health(){ //move the enemy towrds the base
        healthBar.position.x = enemySprite.position.x - 50;
        healthBar.position.y = enemySprite.position.y - 70;
    }
    
    function resetSpeed(){
        speed = default_speed;
        timeout_speed_active = false;
    }
    
    that.ResetEnemy = ResetEnemy;
    that.isActive = function(){return isActive};
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.damage = damage;
    that.getPos = getPos;
    that.getIsActive = getIsActive;
    that.getEnemySprite = getEnemySprite;
    that.getHealth = getHealth;
    that.isAttack = isAttack;
    that.set_fisAttack = set_fisAttack;
    that.set_tisAttack = set_tisAttack;
    that.dec_attack_delay = dec_attack_delay;
    that.reset_attack_delay = reset_attack_delay;
    that.getKilled = getKilled;
    that.setKilled = setKilled;
    return that;
}
