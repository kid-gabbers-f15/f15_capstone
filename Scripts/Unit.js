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
    var bulletSprite2;
    var bulletSprite3;
    var focusedEnemy;
    var focusedEnemyDistance = 1000;
    var focusedEnemyX;
    var focusedEnemyY;
    var bulletSpriteGroup;

    var collision_group;
    var text;
    var topBaseCollision;
    
    var bulletType = 'none';
    var cost;
    var pistolSprite;
    var shotgunSprite;
    var rifleSprite;
    var showWeapons = false;

    WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia']
    }

};

    function Preload(){

    }
    
    
    function OnCreate(x, y, unitGroup, enemypGroup){
        topBaseCollision = defEngine.getTopBaseCollision();
        position.x = x;
        position.y = y;
        
        bulletSpriteGroup = game.add.group();
        
        unitSprite = game.add.sprite(position.x, position.y, 'unit0' );
        game.physics.enable(unitSprite, Phaser.Physics.ARCADE);
        unitSprite.body.collideWorldBounds = true;

        unitSprite.anchor.setTo(0.5, 0.5);

        unitSprite.body.immovable = true;
        
        unitSprite.inputEnabled = true;
        unitSprite.input.useHandCursor = true;
        
        text = game.add.text(position.x + 15, position.y + 5, curr_children);
        text.anchor.set(0.25);
        text.font = 'Revalia';
        text.fontSize = 45;
        grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        text.fill = grd;
        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        pistolSprite = game.add.sprite(position.x-150, position.y, 'Unit3');
        shotgunSprite = game.add.sprite(position.x-250, position.y, 'Unit1');
        rifleSprite = game.add.sprite(position.x-150, position.y-100, 'Unit2');
        pistolSprite.inputEnabled = false;
        shotgunSprite.inputEnabled = false;
        rifleSprite.inputEnabled = false;
        pistolSprite.visible = false;
        shotgunSprite.visible = false;
        rifleSprite.visible = false;
        
        pistolSprite.events.onInputDown.add(function(){
            bulletType = 'pistol';
            cost = 5;
            pistolSprite.visible = false;
            shotgunSprite.visible = false;
            rifleSprite.visible = false;
            pistolSprite.inputEnabled = false;
            shotgunSprite.inputEnabled = false;
            rifleSprite.inputEnabled = false;
            showWeapons = false;
            add_unit(1);
            unitSprite.loadTexture('Unit3');
        });
        
        shotgunSprite.events.onInputDown.add(function(){
            bulletType = 'shotgun';
            cost = 20;
            pistolSprite.visible = false;
            shotgunSprite.visible = false;
            rifleSprite.visible = false;
            pistolSprite.inputEnabled = false;
            shotgunSprite.inputEnabled = false;
            rifleSprite.inputEnabled = false;
            showWeapons = false;
            add_unit(1);
            unitSprite.loadTexture('Unit1');
        });
        
        rifleSprite.events.onInputDown.add(function(){
            bulletType = 'rifle';
            cost = 10;
            pistolSprite.visible = false;
            shotgunSprite.visible = false;
            rifleSprite.visible = false;
            pistolSprite.inputEnabled = false;
            shotgunSprite.inputEnabled = false;
            rifleSprite.inputEnabled = false;
            showWeapons = false;
            add_unit(1);
            unitSprite.loadTexture('Unit2');
        });
        
    
        unitSprite.events.onInputDown.add(function(){
            if(bulletType=='none')
            {
                if(showWeapons == true)
                {
                    showWeapons = false;
                }
                else 
                {
                    showWeapons = true;
                }
                weaponSelection();
            }
            else
            {
                add_unit(1);
                update_text();
            }
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
        if(curr_children == 0)
            {
                unitSprite.loadTexture('unit0');
                bulletType = 'none';
            }
        
        // Change picture based on children
        /*if(old_curr_children != curr_children)
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
        }*/
        
        var enemyGroup = defEngine.getEnemyManager().getEnemyGroup();
        
        if(shoot==true && curr_children>0)
        {
            focusedEnemyDistance = 1000;
            focusedEnemy = undefined;
            for(var i=0;i<enemyGroup.length;i++)
            {
                var enemyPos = enemyGroup[i].getPos();
                var xd = enemyPos.x - position.x;
                var yd = enemyPos.y - position.y;
                var distance = Math.sqrt((xd*xd)+(yd*yd));
                if(distance<=1000 && enemyGroup[i].getIsActive()==true && curr_children>0 && distance<focusedEnemyDistance && enemyGroup[i].getHealth()>0)
                {
                    focusedEnemy = enemyGroup[i];
                    focusedEnemyDistance = distance;
                    focusedEnemyX = enemyPos.x;
                    focusedEnemyY = enemyPos.y;
                }
            }
            
            if(focusedEnemy!=undefined)
            {
                if(bulletType=='pistol')
                {
                    bulletSprite = game.add.sprite(position.x, position.y, 'bullet' );
                    game.physics.enable(bulletSprite, Phaser.Physics.ARCADE);
                    bulletSprite.checkWorldBounds = true;
                    bulletSprite.outOfBoundsKill = true;
                    game.physics.arcade.moveToXY(
                        bulletSprite,
                        focusedEnemyX,
                        focusedEnemyY,
                        1000);
                    shoot=false;
                    setTimeout(resetShoot, 1000-(curr_children*50));
                    bulletSpriteGroup.add(bulletSprite);
                }
                else if(bulletType=='shotgun')
                {
                    bulletSprite = game.add.sprite(position.x, position.y, 'bullet' );
                    bulletSprite2 = game.add.sprite(position.x, position.y, 'bullet' );
                    bulletSprite3 = game.add.sprite(position.x, position.y, 'bullet' );
                    
                    game.physics.enable(bulletSprite, Phaser.Physics.ARCADE);
                    game.physics.enable(bulletSprite2, Phaser.Physics.ARCADE);
                    game.physics.enable(bulletSprite3, Phaser.Physics.ARCADE);
                    
                    bulletSprite.checkWorldBounds = true;
                    bulletSprite2.checkWorldBounds = true;
                    bulletSprite3.checkWorldBounds = true;
                    
                    bulletSprite.outOfBoundsKill = true;
                    bulletSprite2.outOfBoundsKill = true;
                    bulletSprite3.outOfBoundsKill = true;
                    
                    game.physics.arcade.moveToXY(
                        bulletSprite,
                        focusedEnemyX + 20,
                        focusedEnemyY + 20,
                        500);
                    game.physics.arcade.moveToXY(
                        bulletSprite2,
                        focusedEnemyX - 50,
                        focusedEnemyY - 50,
                        500);
                    game.physics.arcade.moveToXY(
                        bulletSprite3,
                        focusedEnemyX - 20,
                        focusedEnemyY - 20,
                        500);
                        
                    shoot=false;
                    setTimeout(resetShoot, 2000-(curr_children*50));
                    bulletSpriteGroup.add(bulletSprite);
                    bulletSpriteGroup.add(bulletSprite2);
                    bulletSpriteGroup.add(bulletSprite3);
                }
                else if(bulletType=='rifle')
                {
                    bulletSprite = game.add.sprite(position.x, position.y, 'bullet' );
                    game.physics.enable(bulletSprite, Phaser.Physics.ARCADE);
                    bulletSprite.checkWorldBounds = true;
                    bulletSprite.outOfBoundsKill = true;
                    game.physics.arcade.moveToXY(
                        bulletSprite,
                        focusedEnemyX,
                        focusedEnemyY,
                        1000);
                    shoot=false;
                    setTimeout(resetShoot, 3000-(curr_children*50));
                    bulletSpriteGroup.add(bulletSprite);
                }
            }
        }
        
        if(focusedEnemy!=undefined)
        {
            for(var i = 0; i<enemyGroup.length; i++)
            {
                if(enemyGroup[i]!=undefined && enemyGroup[i].getIsActive()==true)
                {
                    var currentBullet;
                    var hitEnemy;
                    var derp = game.physics.arcade.overlap(enemyGroup[i].getEnemySprite(), bulletSpriteGroup, function(obj1, obj2){
                        hitEnemy = obj1;
                        currentBullet = obj2;
                    }, null, null, this);
                    if(derp == true)
                    {
                        removeBullet(currentBullet, enemyGroup[i]);
                    }
                }
            }
        } 
        var herp = game.physics.arcade.overlap(topBaseCollision, bulletSpriteGroup, function(obj1, obj2){
                        currentBullet = obj2;
                }, null, null, this);
                    if(herp == true)
                    {
                        removeBulletOnly(currentBullet);
                    }
        
    }
    
    function add_unit(num_unit){
            if(curr_children != max_size && defEngine.canAfford(cost)){
               curr_children = curr_children + num_unit;
               defEngine.spendGold(cost);
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
    }
    function update_text(){
        text.setText(curr_children);
    }

    function removeBullet(bSprite, enemy){
        bSprite.destroy();
        
        if(bulletType=='pistol')
        {
            enemy.damage(10);
        }
        else if(bulletType=='shotgun')
        {
            enemy.damage(5);
        }
        else if(bulletType=='rifle')
        {
            enemy.damage(25);
        }
    }
    function removeBulletOnly(bSprite){
        bSprite.destroy();
    }
    function isAttack(){
        return can_attack;
    }
    
    function weaponSelection(){
        
        if(showWeapons == true)
        {
            pistolSprite.visible = true;
            shotgunSprite.visible = true;
            rifleSprite.visible = true;
            pistolSprite.inputEnabled = true;
            shotgunSprite.inputEnabled = true;
            rifleSprite.inputEnabled = true;
        }
        else
        {
            pistolSprite.visible = false;
            shotgunSprite.visible = false;
            rifleSprite.visible = false;
            pistolSprite.inputEnabled = false;
            shotgunSprite.inputEnabled = false;
            rifleSprite.inputEnabled = false;
        }
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getUnitSprite = getUnitSprite;
    that.get_children = get_children;
    that.dec_children = dec_children;
    that.isAttack = isAttack;
    
    return that;
}