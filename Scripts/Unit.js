var Unit = function (parent, game){
    var that = {};
    var position = {};
    var unitSprite;
    var max_size = 10;
    var curr_children = 0;

    function Preload(){
        game.load.image('unit', "Assets/Placeholder1.png");
    }
    
    
    function OnCreate(x, y, unitGroup){
        position.x = x;
        position.y = y;
        
        unitSprite = game.add.sprite(position.x, position.y, 'unit' );
        game.physics.enable(unitSprite, Phaser.Physics.ARCADE);
        unitSprite.body.collideWorldBounds = true;

        unitSprite.body.immovable = true;
        
        unitSprite.inputEnabled = true;
        unitSprite.input.useHandCursor = true;
        unitSprite.events.onInputDown.add(function(){
            add_unit(1);
        });
        
        unitGroup.add(unitSprite);
    }
    
    function Update(){
<<<<<<< HEAD
        
=======
<<<<<<< HEAD
        //Damage enemies
        console.log("Enemies: ");
        console.log(defEngine.enemyManager);
=======
       
>>>>>>> abe520b245822d895f55d13ce2fd1e280f42935a
>>>>>>> 8f8446543f726818a2ccc5ccab67d7b27090922d
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
    
    return that;
}