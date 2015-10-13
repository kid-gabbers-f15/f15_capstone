var Enemy = function (parent, game){
    var that = {};
    
    var enemySprite;
    
    var position = {};
    var health = 100;
    var maxHealth = 100;
    var velocityX = 10;
    
    var isActive;
    
    function Preload(){
        game.load.image('enemy', "Assets/EnemyPlaceholder.png");
    }
    
    
    function OnCreate(x, y){
        isActive = true;
        position.x = x;
        position.y = y;
        
        enemySprite = game.add.sprite(position.x, position.y, 'enemy' );
        game.physics.enable(enemySprite, Phaser.Physics.ARCADE);
        enemySprite.body.collideWorldBounds = true;
        health = maxHealth;
        
        enemySprite.inputEnabled = true;
        enemySprite.input.useHandCursor = true;
        enemySprite.events.onInputDown.add(function(){
            damage(10);
        });
        
    }
    
    function ResetEnemy(x, y){
        enemySprite.visible = true;
        enemySprite.inputEnabled = true;
        enemySprite.isActive = true;
        enemySprite.position = {x, y};
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
            200,
            900,
            100);
        
        if(health <= 0){
            enemySprite.visible = false;
            enemySprite.inputEnabled = false;
            isActive = false;
        }
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
    
    that.ResetEnemy = ResetEnemy;
    that.isActive = function(){return isActive};
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.damage = damage;
    
    return that;
}