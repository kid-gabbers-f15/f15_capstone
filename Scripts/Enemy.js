var Enemy = function (parent, game){
    var that = {};
    
    var enemySprite;
    
    var healthBar;
    
    var position = {};
    var health = 100;
    var maxHealth = 100;
    var const_maxHealth = 100; //will be the definite health for enemy units
    var initialHealth;
    
    var velocityX = 10;
    
    var isActive;
    var dmgPerClick = 10;
    
    var uGroup;
    var eGroup;
    
    var totalMissingHealth = 0.0; //missing health bar
    var minusHealthIncr = 0.0; //how much health to take off the health bar
    
    var target;
    var can_attack;
    var attack_delay;
    var boss;
    
    var type;
    var speed = 100;
    
    var killed = false;
    
    function Preload(){
       
    }
    
    function OnCreate(x, y, unitGroup, enemypGroup, isBoss, type){
        isActive = false;
        position.x = x;
        position.y = y;
        can_attack = true; //upon creation enemies should be able to attack instantly
        attack_delay = 0;

        if(isBoss==true) // Boss
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
            //healthBar.anchor.setTo(0.5,0.5);
            
            enemySprite.visible = false;
            healthBar.visible = false;
            enemySprite.inputEnabled = false;
            enemySprite.isActive = false;
            isActive = false;
            boss = true;
        }
        else // Enemy
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
    
    function ResetEnemy(x, y, newTarget){
        enemySprite.alpha = 1.0; 
        if(boss)
        {
            health = maxHealth*10;
            initialHealth = health;
            //healthBar.crop(new Phaser.Rectangle(0,0,100*(health/maxHealth), 20));
            //healthBar.updateCrop();
            
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
            console.log("reseting regulars");
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
        
    function damage(dmg){
        
        health = health - dmg;
<<<<<<< HEAD
        enemySprite.alpha = 1.0 - 1.0*(initialHealth-health)/initialHealth;
        
        if(enemySprite.alpha < 0.15){ //dont let it go lower than .15 too transparent
            enemySprite.alpha = .15;
        }
        
        if(boss){
            healthBar.crop(new Phaser.Rectangle(0,0, 200 * health/initialHealth, 20));
        }
        else{
            
            healthBar.crop(new Phaser.Rectangle(0,0, 100 * health/initialHealth, 20));
        }
        
=======
        if(enemySprite.alpha >= 0.1){// make sure its not toooo see through
            enemySprite.alpha = 1.0 - 1.0*(initialHealth-health)/initialHealth;
        }
        
        healthBar.crop(new Phaser.Rectangle(0,0,health*healthBar.width/initialHealth, 20));
>>>>>>> 96533c25fdf3e7d222a5c0417e545f79b4a34d85
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






