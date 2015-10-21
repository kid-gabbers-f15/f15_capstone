var Unit = function (parent, game){
    var that = {};
    var position = {};
    var unitSprite;
    var max_size = 10;
    var curr_children = 0;
    var old_curr_children = 0;
    var clicks = 0;
    var shoot = true;

    var bulletSprite;
    var focusedEnemy;
    var focusedEnemyDistance = 1000;
    var focusedEnemyX;
    var focusedEnemyY;
    var bulletSpriteGroup;

    var collision_group;
    var text;


    function Preload(){
        game.load.image('bullet', "Assets/bullet.png");
        game.load.image('unit0', "Assets/Unit_Pictures/unit0.png");
        game.load.image('unit1', "Assets/Unit_Pictures/unit1.png");
        game.load.image('unit2', "Assets/Unit_Pictures/unit2.png");
        game.load.image('unit3', "Assets/Unit_Pictures/unit3.png");
        game.load.image('unit4', "Assets/Unit_Pictures/unit4.png");
        game.load.image('unit5', "Assets/Unit_Pictures/unit5.png");
        game.load.image('unit6', "Assets/Unit_Pictures/unit6.png");
        game.load.image('unit7', "Assets/Unit_Pictures/unit7.png");
        game.load.image('unit8', "Assets/Unit_Pictures/unit8.png");
        game.load.image('unit9', "Assets/Unit_Pictures/unit9.png");
        game.load.image('unit10', "Assets/Unit_Pictures/unit10.png");
    }
    
    
    function OnCreate(x, y, unitGroup, enemypGroup){
        position.x = x;
        position.y = y;
        
        bulletSpriteGroup = game.add.group();
        
        unitSprite = game.add.sprite(position.x, position.y, 'unit0' );
        game.physics.enable(unitSprite, Phaser.Physics.ARCADE);
        unitSprite.body.collideWorldBounds = true;

        unitSprite.body.immovable = true;
        
        unitSprite.inputEnabled = true;
        unitSprite.input.useHandCursor = true;
        
        
        
        text = game.add.text(position.x, position.y, curr_children, { font: "65px Arial", fill: "#ff0044", align: "center" });
        text.anchor.set(0.25);
    
        unitSprite.events.onInputDown.add(function(){
            add_unit(1);
            update_text();
        
        });
        
        unitGroup.add(unitSprite);
        collision_group = unitGroup;
    }
    
    function resetShoot()
    {
        shoot = true;
    }
    
    function Update(){
        update_text();
        if(old_curr_children != curr_children)
        {
            if(curr_children == 0)
            {
                unitSprite.loadTexture('unit0');
            }
            else if(curr_children == 1)
            {
                unitSprite.loadTexture('unit1');
            }
            else if(curr_children == 2)
            {
                unitSprite.loadTexture('unit2');
            }
            else if(curr_children == 3)
            {
                unitSprite.loadTexture('unit3');
            }
            else if(curr_children == 4)
            {
                unitSprite.loadTexture('unit4');
            }
            else if(curr_children == 5)
            {
                unitSprite.loadTexture('unit5');
            }
            else if(curr_children == 6)
            {
                unitSprite.loadTexture('unit6');
            }
            else if(curr_children == 6)
            {
                unitSprite.loadTexture('unit6');
            }
            else if(curr_children == 7)
            {
                unitSprite.loadTexture('unit7');
            }
            else if(curr_children == 8)
            {
                unitSprite.loadTexture('unit8');
            }
            else if(curr_children == 9)
            {
                unitSprite.loadTexture('unit9');
            }
            else if(curr_children == 10)
            {
                unitSprite.loadTexture('unit10');
            }
            
            old_curr_children = curr_children;
        }
        
        var enemyGroup = defEngine.getEnemyManager().getEnemyGroup();
        
        if(shoot==true && curr_children>0)
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
                bulletSprite = game.add.sprite(position.x, position.y, 'bullet' );
                game.physics.enable(bulletSprite, Phaser.Physics.ARCADE);
                bulletSprite.checkWorldBounds = true;
                bulletSprite.outOfBoundsKill = true;
                game.physics.arcade.accelerateToXY(
                    bulletSprite,
                    focusedEnemyX,
                    focusedEnemyY,
                    5000);
                shoot=false;
                setTimeout(resetShoot, 1000-(curr_children*50));
                bulletSpriteGroup.add(bulletSprite);
            }
        }
        
        if(focusedEnemy!=undefined)
        {
            var currentBullet;
            var derp = game.physics.arcade.overlap(focusedEnemy.getEnemySprite(), bulletSpriteGroup, function(obj1, obj2){
                currentBullet = obj2;
            }, null, null, this);
            if(derp == true)
            {
                removeBullet(currentBullet, focusedEnemy);
            }
        }      
    }
    
    function add_unit(num_unit){
            if(curr_children != max_size){
               curr_children = curr_children + num_unit;
                console.log("added " + num_unit + " unit"); 
            }
        }
        
    function getUnitSprite(){
        return unitSprite;
    }
    
    function get_children(){
        return curr_children;
    }
    
    function dec_children(){
        curr_children = curr_children - 1;
        console.log(curr_children);
    }
    function update_text(){
        text.setText(curr_children);
    }

    function removeBullet(bSprite, enemy){
        bSprite.destroy();
        enemy.damage(10);
        //console.log("collide");
    }

    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getUnitSprite = getUnitSprite;
    that.get_children = get_children;
    that.dec_children = dec_children;
    
    return that;
}