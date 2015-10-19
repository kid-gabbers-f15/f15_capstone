var Enemy = function (parent, game){
    var that = {};
    
    var enemySprite;
    var healthBar;
            var ha = 1;
    var position = {};
    var health = 100;
    var maxHealth = 100;
    var velocityX = 10;
    
    var isActive;
    
    var uGroup;
    var eGroup;
    
    var target;
    
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
    
    function ResetEnemy(x, y, target){
        console.log("resetting");
        
        health = maxHealth;
        
        healthBar.crop(new Phaser.Rectangle(0,0,100, 20));
        healthBar.updateCrop();
        
        enemySprite.visible = true;
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
            enemySprite.inputEnabled = false;
            isActive = false;
        }
        
        //collisions with units
        game.physics.arcade.collide(enemySprite, uGroup);
        //game.physics.arcade.collide(enemySprite, uGroup, print, null, null, this);
        position = enemySprite.position;
        
        
        var unitpGroup = defEngine.getPlayer().getUnitPGroup();

        for(var i = 0; i < unitpGroup.length; i++){
            game.physics.arcade.collide(unitpGroup[i].getUnitSprite(), eGroup, 
            function(){
                if(unitpGroup[i].get_children() > 0){
                     unitpGroup[i].dec_children();
                     } 
                } 
            , null, null, this);
        }
    }
        
    function damage(dmg){
        health = health - dmg;
        console.log(health);
        
        healthBar.crop(new Phaser.Rectangle(0,0,100*(health/maxHealth), 20))
        healthBar.updateCrop();
        
        if(health <= 0){
            enemySprite.visible = false;
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
    
    that.ResetEnemy = ResetEnemy;
    that.isActive = function(){return isActive};
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.damage = damage;
    that.getPos = getPos;
    that.getIsActive = getIsActive;
    
    return that;
}