var Unit = function (parent, game){
    var that = {};
    var position = {};
    var unitSprite;
    var max_size = 10;
    var curr_children = 0;

    function Preload(){
        game.load.image('unit', "Assets/Placeholder1.png");
    }
    
    
    function OnCreate(x, y){
        position.x = x;
        position.y = y;
        
        unitSprite = game.add.sprite(position.x, position.y, 'unit' );
        game.physics.enable(unitSprite, Phaser.Physics.ARCADE);
        unitSprite.body.collideWorldBounds = true;

        
        unitSprite.inputEnabled = true;
        unitSprite.input.useHandCursor = true;
        unitSprite.events.onInputDown.add(function(){
            add_unit(1);
        });
        
    }
    
    function Update(){
       
    }
    
     function add_unit(num_unit){
            if(curr_children != max_size){
               curr_children = curr_children + num_unit;
                console.log("added " + num_unit + " unit(s)"); 
            }
        }
        
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    
    
    /*0
     function OnCreate(x, y){
        position.x = x;
        position.y = y;
        
        enemySprite = game.add.sprite(position.x, position.y, 'enemy' );
        game.physics.enable(enemySprite, Phaser.Physics.ARCADE);
        enemySprite.body.collideWorldBounds = true;
        health = maxHealth;
        
        enemySprite.inputEnabled = true;
        enemySprite.input.useHandCursor = true;
        enemySprite.events.onInputDown.add(function(){
            health = health - 10;
            console.log(health);
        });
    }
    
    function ResetEnemy(x, y){
        enemySprite.isVisible = true;
        enemySprite.inputEnabled = true;
        enemySprite.isActive = true;
        enemySprite.position = {x, y};
    }
    
    function Update(){
        if(health <= 0){
            enemySprite.isVisible = false;
            enemySprite.inputEnabled = false;
            isActive = false;
        }
    }
    
    */
    return that;
}