var Unit = function (parent, game){
    var that = {};
    var position = {};
    var unitSprite;
    var max_size = 10;
    var curr_children = 0;
    var clicks = 0;

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
        
        
        
        var text = game.add.text(position.x, position.y, curr_children, { font: "65px Arial", fill: "#ff0044", align: "center" });
        text.anchor.set(0.25);
    
        unitSprite.events.onInputDown.add(function(){
            add_unit(1);
            text_update(text);
        
        });

        
        unitGroup.add(unitSprite);
    }
    
    function Update(){
       
    }
    
     function add_unit(num_unit){
            if(curr_children != max_size){
               curr_children = curr_children + num_unit;
               text = "clicked " + curr_children + " times";
                console.log("added " + num_unit + " unit(s)"); 
            }
        }
        
     function text_update(item) {
    
        //item.fill = "#ffff44";
        item.text = curr_children;
    
    }
        
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    
    return that;
}