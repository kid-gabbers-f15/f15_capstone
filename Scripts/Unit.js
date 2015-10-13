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
    
    var shoot = true;
    function resetShoot()
    {
        shoot = true;
    }
    
    function Update(){
        if(shoot==true)
        {
            var enemyGroup = defEngine.getEnemyManager().getEnemyGroup();
            for(var i=0;i<enemyGroup.length;i++)
            {
                var enemyPos = enemyGroup[i].getPos();
                var xd = enemyPos.x - position.x;
                var yd = enemyPos.y - position.y;
                var distance = Math.sqrt((xd*xd)+(yd*yd));
                if(distance<=300 && enemyGroup[i].getIsActive()==true)
                {
                    enemyGroup[i].damage(10);
                    break;
                }
            }
            shoot=false;
            setTimeout(resetShoot, 1000);
        }
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