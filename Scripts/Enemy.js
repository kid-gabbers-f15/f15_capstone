var Enemy = function (parent, game){
    var that = {};
    
    var enemySprite;
    var healthBar;
    
    var position = {};
    var health = 100;
    var maxHealth = 100;
    var const_maxHealth = 100; //will be the definite health for units
    
    var velocityX = 10;
    
    
    
    var isActive;
    
    var uGroup;
    var eGroup;
    
    var target;
    var can_attack = true;
    var attack_delay = 0;
    
    function Preload(){
        game.load.image('enemy', "Assets/EnemyPlaceholder.png");
        game.load.image('healthBar', 'Assets/Placeholder4.png');
    }
    
    function OnCreate(x, y, unitGroup, enemypGroup){
        isActive = false;
        position.x = x;
        position.y = y;
        
        enemySprite = game.add.sprite(position.x, position.y, 'enemy' );
        game.physics.enable(enemySprite, Phaser.Physics.ARCADE);
        enemySprite.body.collideWorldBounds = true;
        enemySprite.body.friction = 10;
        enemySprite.body.drag = 100;

        health = maxHealth;
        healthBar = game.add.sprite(position.x, position.y - 20, 'healthBar');
        healthBar.crop(new Phaser.Rectangle(0,0,100, 20));
        
        enemySprite.inputEnabled = true;
        enemySprite.input.useHandCursor = true;
        enemySprite.events.onInputDown.add(function(){
            damage(10);
            
        });
        
        uGroup = unitGroup;
        enemypGroup.add(enemySprite);
        eGroup = enemypGroup;
    }
    
    function make_Boss(x, y, target){ //this will be resetting the enemy to a boss Unit
        console.log("BOSS TIME")
        
        maxHealth = const_maxHealth*10; //multiply by 10 the health to make it stronger
        
        health = maxHealth //times 10
        
        healthBar.crop(new Phaser.Rectangle(0,0,100, 20));
        healthBar.updateCrop();
        
        enemySprite.visible = true;
        healthBar.visible = true;
        enemySprite.inputEnabled = true;
        enemySprite.isActive = true;
        isActive = true;
        enemySprite.position = {x, y};
        this.target = target;
                
        
    }
    
    function ResetEnemy(x, y, target){
        console.log("resetting");
        
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
    }
    
    function Update(){
        /*game.physics.arcade.moveToXY(
            enemySprite,
            200, 
            900, 
            75
        );*/
        healthBar.position.x = enemySprite.position.x;
        healthBar.position.y = enemySprite.position.y - 20;
        
        
        //WE HAVE A WINNER
        game.physics.arcade.accelerateToXY(
            enemySprite,
            this.target.position.x,
            this.target.position.y,
            50);
        
        if(health <= 0){
            enemySprite.visible = false;
            healthBar.visible = false;
            enemySprite.inputEnabled = false;
            isActive = false;
        }
        
        //collisions with units
        game.physics.arcade.collide(enemySprite, uGroup);
        //game.physics.arcade.collide(enemySprite, uGroup, print, null, null, this);
        position = enemySprite.position;
        /*
        if(attack_delay > 0) attack_delay--;
        if(attack_delay == 0){
            can_attack = true;
        }
        */
        var enemyGroup = defEngine.getEnemyManager().getEnemyGroup();
        var unitpGroup = defEngine.getPlayer().getUnitPGroup();
        for(var k = 0; k < enemyGroup.length; k++){
            for(var i = 0; i < unitpGroup.length; i++){
                game.physics.arcade.collide(unitpGroup[i].getUnitSprite(), enemyGroup[k].getEnemySprite(), 
                function(){
                    console.log("attack " + enemyGroup[k].isAttack());
                    console.log("active " + enemyGroup[k].isActive());
                    if(unitpGroup[i].get_children() > 0 && enemyGroup[k].isAttack() == true && enemyGroup[k].isActive() == true){
                         unitpGroup[i].dec_children();
                         enemyGroup[k].set_fisAttack();
                         enemyGroup[k].set_attack_delay();
                         } 
                    } 
                , null, null, this);
            }   
        }
        
    }
        
    function damage(dmg){
        health = health - dmg;
        console.log(health);
        
        healthBar.crop(new Phaser.Rectangle(0,0,100*(health/maxHealth), 20))
        healthBar.updateCrop();
        
        if(health <= 0){
            enemySprite.visible = false;
            healthBar.visible = false;
            enemySprite.inputEnabled = false;
            isActive = false;
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
    function set_attack_delay(){
        attack_delay = 100;
    }
    function dec_attack_delay(){
        attack_delay = attack_delay - 1;
    }
    function get_attack_delay(){
        return attack_delay;
    }
    
    function getHealth(){
        return health;
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
<<<<<<< HEAD
    that.make_Boss = make_Boss;
=======
    that.getHealth = getHealth;
    that.isAttack = isAttack;
    that.set_fisAttack = set_fisAttack;
    that.set_tisAttack = set_tisAttack;
    that.dec_attack_delay = dec_attack_delay;
    that.set_attack_delay = set_attack_delay;
    that.get_attack_delay = get_attack_delay;
    
>>>>>>> 4725d339043f7b590a949bb47b484901b8d143cb
    return that;
}