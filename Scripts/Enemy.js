var Enemy = function (parent, game){
    var that = {};
    
    var enemySprite;
    
    var healthBar;
    
    var position = {};
    var health = 100;
    var maxHealth = 100;
    var const_maxHealth = 100; //will be the definite health for enemy units
    
    var velocityX = 10;
    
    var isActive;
    
    var uGroup;
    var eGroup;
    
    var target;
    var can_attack;
    var attack_delay;
    var boss;
    
    var killed = false;
    
    function Preload(){
       
    }
    
    function OnCreate(x, y, unitGroup, enemypGroup, isBoss){
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
            healthBar = game.add.sprite(position.x - 50, position.y - 70, 'Boss_1_Health');
            healthBar.crop(new Phaser.Rectangle(0,0,100, 20));
            healthBar.anchor.setTo(0.5,0.5);
            
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
            healthBar = game.add.sprite(position.x - 50, position.y - 70, 'healthBar');
            healthBar.crop(new Phaser.Rectangle(0,0,100, 20));
            
            enemySprite.visible = false;
            healthBar.visible = false;
            enemySprite.inputEnabled = false;
            enemySprite.isActive = false;
            isActive = false;
            boss = false;
        }
        
        enemySprite.inputEnabled = false;
        //enemySprite.input.useHandCursor = true;
        enemySprite.events.onInputDown.add(function(){
            damage(10);
        });
        
        uGroup = unitGroup;
        enemypGroup.add(enemySprite);
        eGroup = enemypGroup;
    }
    
    function ResetEnemy(x, y, target){

        if(boss)
        {
            health = maxHealth*10;
            healthBar.crop(new Phaser.Rectangle(0,0,100, 20));
            healthBar.updateCrop();
            
            enemySprite.visible = true;
            healthBar.visible = true;
            enemySprite.inputEnabled = true;
            enemySprite.isActive = true;
            isActive = true;
            enemySprite.position = {x, y};
            this.target = target;
            attack_delay = 0; 
            can_attack = true;
            boss = true;
            killed = false;
        }
        else
        {
            maxHealth = const_maxHealth;
            health = maxHealth;
            healthBar.crop(new Phaser.Rectangle(0,0,100, 20));
            healthBar.updateCrop();
            
            enemySprite.visible = true;
            healthBar.visible = true;
            enemySprite.inputEnabled = true;
            enemySprite.isActive = true;
            isActive = true;
            enemySprite.position = {x, y};
            this.target = target;
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
        
        healthBar.position.x = enemySprite.position.x - 50;
        healthBar.position.y = enemySprite.position.y - 70;
        
        
        //WE HAVE A WINNER
        /*game.physics.arcade.accelerateToXY(
            enemySprite,
            this.target.position.x,
            this.target.position.y,
            50);*/
            
        game.physics.arcade.moveToXY(
            enemySprite,
            this.target.position.x,
            this.target.position.y,
            100);
        
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
        
       // console.log("enemyGroup: " + enemyGroup);
        
        var unitpGroup = defEngine.getPlayer().getUnitPGroup();
        
        for(var i = 0; i < unitpGroup.length; i++){
            game.physics.arcade.collide(unitpGroup[i].getUnitSprite(), enemySprite, 
            function(){
                if(unitpGroup[i].get_children() > 0 && isAttack == true && isActive == true){
                     unitpGroup[i].dec_children();
                     isAttack = false;
                     reset_attack_delay();
                } 
            } 
            , null, null, this);
        }   
        
        
    }
        
    function damage(dmg){
        health = health - dmg;
        healthBar.crop(new Phaser.Rectangle(0,0,100*(health/maxHealth), 20))
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






