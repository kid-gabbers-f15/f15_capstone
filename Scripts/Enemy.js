var Enemy = function (parent, game){
    var that = {};
    
    var enemySprite; // object, phaster sprite
    
    var healthBar; // object, phaser sprite?
    
    var position = {}; // object, used to keep enemy x and y position
    var health = 100; // int, enemy health
    var maxHealth = 100; // int, most health an enemy can have
    var const_maxHealth = 100; // int, will be the definite health for enemy units
    
    var initialHealth; // int, staring health, uneeded?
    var velocityX = 10; // int, default speed, uneeded?
    
    var isActive; // bool, is this enemy active and on screen
    var dmgPerClick = 10; // int, how much damage is done to the enemy when clicked
    
    var uGroup; // array, unit group
    var eGroup; // array, enemy group
    
    var totalMissingHealth = 0.0; // float, missing health bar
    var minusHealthIncr = 0.0; // float, how much health to take off the health bar
    
    var initHealthBar = 0.0; // float, initial amount og healthbar
    
    var target; // unit object, unit the enemy is atacking
    var can_attack; // bool, can this unit attack or not, used for delay between attacks
    var attack_delay; // int, amount of time enemy has to wait between attacks
    var boss; // bool, is this enemy a boss or not
    
    var type; // int, what type of enemy
    var speed = 100; // int, speed of the enemy
    
    var killed = false; // bool, has the enemy been killed this wave
    
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

        if(isBoss==true) // This enemy is a boss
        {
            enemySprite = game.add.sprite(position.x, position.y, 'EnemyBoss_1' );
            game.physics.enable(enemySprite, Phaser.Physics.ARCADE);
            enemySprite.body.collideWorldBounds = true;
            enemySprite.body.friction = 10;
            enemySprite.body.drag = 100;
    
            enemySprite.anchor.setTo(0.5, 0.5);
    
            health = maxHealth*10;
            initialHealth = health;
            healthBar = game.add.sprite(position.x - 100, position.y - 200, 'Boss_1_Health');
            healthBar.crop(new Phaser.Rectangle(0,0,enemySprite.width, 20));
            healthBar.updateCrop();
            initHealthBar = healthBar.width;
            
            enemySprite.visible = false;
            healthBar.visible = false;
            enemySprite.inputEnabled = false;
            enemySprite.isActive = false;
            isActive = false;
            boss = true;
        }
        else // This is a regular enemy
        {
            enemySprite = game.add.sprite(position.x, position.y, 'enemy' + Math.ceil(Math.random()*3) );
            game.physics.enable(enemySprite, Phaser.Physics.ARCADE);
            enemySprite.body.collideWorldBounds = true;
            enemySprite.body.friction = 10;
            enemySprite.body.drag = 100;
    
            enemySprite.anchor.setTo(0.5, 0.5);
    
            health = maxHealth;
            initialHealth = health;
            healthBar = game.add.sprite(position.x - 50, position.y - 70, 'healthBar');
            healthBar.crop(new Phaser.Rectangle(0,0,enemySprite.width, 20));
            
            initHealthBar = healthBar.width;
            enemySprite.visible = false;
            healthBar.visible = false;
            enemySprite.inputEnabled = false;
            enemySprite.isActive = false;
            isActive = false;
            boss = false;
            
            if(type == 2)
            {
                speed = 200;
            }
        }
        
        enemySprite.inputEnabled = false;
        //enemySprite.input.useHandCursor = true;
        enemySprite.events.onInputDown.add(function(){
            damage(dmgPerClick); //damage per click
        });
        uGroup = unitGroup;
        enemypGroup.add(enemySprite);
        eGroup = enemypGroup;
    }
    
    /*
    x - int, enemy x position
    y - int, enemy y position
    newTarget - object, unit for enemy to target
    */
    function ResetEnemy(x, y, newTarget){
        enemySprite.alpha = 1.0; 
        if(boss)
        {
            health = maxHealth*10;
            initialHealth = health;
            healthBar.crop(new Phaser.Rectangle(0,0,enemySprite.width, 20));
            
            enemySprite.visible = true;
            healthBar.visible = true;
            enemySprite.inputEnabled = true;
            enemySprite.isActive = true;
            isActive = true;
            enemySprite.position = {x, y};
            target = newTarget;
            attack_delay = 0; 
            can_attack = true;
            boss = true;
            killed = false;
        }
        else
        {
            maxHealth = const_maxHealth;
            health = maxHealth;
            initialHealth = maxHealth;
            healthBar.crop(new Phaser.Rectangle(0,0,100, 20));
            healthBar.updateCrop();
            
            enemySprite.visible = true;
            healthBar.visible = true;
            enemySprite.inputEnabled = true;
            enemySprite.isActive = true;
            isActive = true;
            enemySprite.position = {x, y};
            target = newTarget;
            can_attack = true;
            attack_delay = 0;
            boss = false;
            killed = false;
        }
    }
    
    function Update(){
        if(attack_delay == 0)
        {
            can_attack = true;
        }
        if(attack_delay > 0)
        {
            attack_delay = attack_delay - 1;
        }
        
        if(boss){ //if this enemy is a boss, then move the health accordingly
            healthBar.position.x = enemySprite.position.x - 110;
            healthBar.position.y = enemySprite.position.y - 250;
        }
        else{
            healthBar.position.x = enemySprite.position.x - 50;
            healthBar.position.y = enemySprite.position.y - 70;
        }
          
        var unitpGroup = defEngine.getPlayer().getUnitPGroup();
        
        if(target.get_children() == 0)
        {
            retarget(unitpGroup);
        }
        
        game.physics.arcade.moveToXY(
            enemySprite,
            target.getUnitSprite().position.x,
            target.getUnitSprite().position.y,
            speed);
        
        if(health <= 0){
            enemySprite.visible = false;
            healthBar.visible = false;
            enemySprite.inputEnabled = false;
            isActive = false;
        }
        
        position = enemySprite.position;

        //loop through units and enemies to check for collision
        //after a collision is detectd, pull the unit object and enemy object for interaction
        //var enemyGroup = defEngine.getEnemyManager().getEnemyGroup();
        
        for(var i = 0; i < unitpGroup.length; i++){
            game.physics.arcade.collide(enemySprite, unitpGroup[i].getUnitSprite(), 
            function(){
                if(unitpGroup[i].get_children() > 0 && can_attack == true && isActive == true){
                     unitpGroup[i].dec_children();
                     can_attack = false;
                     reset_attack_delay();
                } 
            } 
            , null, null, this);
        }   
        
        
    }
    
    /*
    dmg - int, amount of damage to do to the enemy
    */
    function damage(dmg){
        
        health = health - dmg;
        enemySprite.alpha = 1.0 - 1.0*(initialHealth-health)/initialHealth;
        
        if(enemySprite.alpha < 0.15){ //dont let it go lower than .15 too transparent
            enemySprite.alpha = .15;
        }
        
        if(boss){
            healthBar.crop(new Phaser.Rectangle(0,0, initHealthBar * health/initialHealth, 20));
        }
        else{
            
            healthBar.crop(new Phaser.Rectangle(0,0, initHealthBar * health/initialHealth, 20));
        }
        healthBar.updateCrop();
        
        if(health <= 0){
            enemySprite.visible = false;
            healthBar.visible = false;
            enemySprite.inputEnabled = false;
            isActive = false;
            killed = true;
            if(boss){
                defEngine.addGold(100);
            }
            else{
                defEngine.addGold(10);
            }
        }
    }
    
    function retarget(unitpGroup){
        for(var i=0; i<unitpGroup.length; i++)
        {
            if(unitpGroup[i].get_children() != 0)
            {
                target = unitpGroup[i];
                
                var diff = target.getUnitSprite().position.y - enemySprite.position.y;
                
                enemySprite.position.x += 15;
                
                if(diff > 0)
                {
                    enemySprite.position.y += 15;
                }
                else
                {
                    enemySprite.position.y -= 15;
                }
                
                break;
            }
            if(i == unitpGroup.length - 1)
            {
                // Do whatever needs to be done when all units are at zero
            }
        }
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






