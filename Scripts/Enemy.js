var Enemy = function (parent, game){
    var that = {};
    
    var enemySprite;
    
    var position = {};
    var health = 100;
    var maxHealth = 100;
    var velocityX = 10;
    
    var isActive;
    
    var uGroup;
    
    var target;
    
    function Preload(){
        game.load.image('enemy', "Assets/EnemyPlaceholder.png");
    }
    
    
    function OnCreate(x, y, unitGroup){
        isActive = false;
        position.x = x;
        position.y = y;
        
        enemySprite = game.add.sprite(position.x, position.y, 'enemy' );
        game.physics.enable(enemySprite, Phaser.Physics.ARCADE);
        enemySprite.body.collideWorldBounds = true;
        enemySprite.body.friction = 10;
        enemySprite.body.drag = 100;

        health = maxHealth;
        
        enemySprite.inputEnabled = true;
        enemySprite.input.useHandCursor = true;
        enemySprite.events.onInputDown.add(function(){
            damage(10);
            
        });
        
        uGroup = unitGroup;
        
    }
    
    function ResetEnemy(x, y, target){
        enemySprite.visible = true;
        enemySprite.inputEnabled = true;
        enemySprite.isActive = true;
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
        
        position = enemySprite.position;
    }
    
    function damage(dmg){
        health = health - dmg;
        console.log(health);
        
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