var Unit = function (parent, game){
    var that = {};
    var position = {};
    var unitSprite;
    var max_size = 10;
    var curr_children = 0;
    var clicks = 0;
    var bulletSprite;
    var focusedEnemy;
    var focusedEnemyDistance = 1000;
    var focusedEnemyX;
    var focusedEnemyY;

    function Preload(){
        game.load.image('unit', "Assets/Placeholder1.png");
        game.load.image('bullet', "Assets/bullet.png");
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
    
    var shoot = true;
    function resetShoot()
    {
        shoot = true;
    }
    
    function Update(){
        var enemyGroup = defEngine.getEnemyManager().getEnemyGroup();
        
        if(shoot==true)
        {
            focusedEnemyDistance = 1000;
            for(var i=0;i<enemyGroup.length;i++)
            {
                var enemyPos = enemyGroup[i].getPos();
                var xd = enemyPos.x - position.x;
                var yd = enemyPos.y - position.y;
                var distance = Math.sqrt((xd*xd)+(yd*yd));
                if(distance<=1000 && enemyGroup[i].getIsActive()==true && curr_children>0 && distance<focusedEnemyDistance)
                {
                    focusedEnemy = enemyGroup[i];
                    focusedEnemyDistance = distance;
                    focusedEnemyX = enemyPos.x;
                    focusedEnemyY = enemyPos.y;
                }
            }
            
            if(focusedEnemy!=undefined)
            {
                //focusedEnemy.damage(10);
                        
                bulletSprite = game.add.sprite(position.x, position.y, 'bullet' );
                game.physics.enable(bulletSprite, Phaser.Physics.ARCADE);
                //bulletSprite.body.collideWorldBounds = true;
                bulletSprite.checkWorldBounds = true;
                bulletSprite.outOfBoundsKill = true;
                game.physics.arcade.accelerateToXY(
                    bulletSprite,
                    focusedEnemyX,
                    focusedEnemyY,
                    5000);
                shoot=false;
                setTimeout(resetShoot, 1000-(curr_children*50));
            }
        }
        
        if(focusedEnemy!=undefined)
        {
            var derp = game.physics.arcade.overlap(bulletSprite, focusedEnemy.getEnemySprite());
            if(derp == true)
            {
                removeBullet(bulletSprite, focusedEnemy);
            }
        }            
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
     
    function removeBullet(bSprite, enemy){
        bSprite.destroy();
        enemy.damage(10);
        //console.log("collide");
    }
        
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    
    return that;
}