var DefenseEngine = function (game){
    var that = {};
    
    var background;
    var topBase;
    
    var enemyManager;
    var player;
    
    var unitGroup;
    var enemypGroup;
    
    var baseData;
    
    function loadBase(base){
        for(var i = 0; i < base.list.length; ++i){
            game.add.sprite(base.list[i].position.x, base.list[i].position.y, base.list[i].image);
        }
    }
    
    function Preload(){
        //loading background image
        console.log("Preload for defense engine");
        game.load.image('background', 'Assets/BackgroundKidGabTemplate.png');
        game.load.image('topBase', 'Assets/TopBaseImage.png');

        enemyManager = EnemyManager(game);
        enemyManager.Preload();
        
        player = Player(game);
        player.Preload();
        
        game.load.image('unit', "Assets/Placeholder1.png");

        game.load.text('JSONBaseData', 'Scripts/json.txt');
        game.load.image('image1', 'Assets/Placeholder1.png');
        game.load.image('image2', 'Assets/Placeholder2.png');
        game.load.image('image3', 'Assets/Placeholder3.png');
        game.load.image('image4', 'Assets/Placeholder4.png');

    }
    
    function OnCreate(){
      
        //drawing background
        background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        background.anchor.setTo(0.5, 0.5);
        
        //create a sprite to act as the area for the user's base
        //this 'windows' the base from other elements in the game 
        topBase = game.add.sprite(game.world.centerX/2, 10, 'topBase');
        topBase.isActive = true;
        game.physics.enable(topBase, Phaser.Physics.ARCADE);
        topBase.body.immovable = true;
        
        //base building
        baseData = JSON.parse(game.cache.getText('JSONBaseData'));
        console.log(baseData);
        loadBase(baseData);

        
        unitGroup = game.add.group();
        enemypGroup = game.add.group();

        player.OnCreate(unitGroup, enemypGroup);
        enemyManager.OnCreate(unitGroup, enemypGroup);
    }
    
    function Update(){
        //check for collision with enemies with base window
        var enemyGroup = getEnemyManager().getEgroup();
        game.physics.arcade.collide(topBase, enemyGroup);
            enemyManager.Update();
            player.Update();
    }
    
    function getEnemyManager(){
        return enemyManager;
    }
    
    function getPlayer(){
        return player;
    }
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getEnemyManager = getEnemyManager;
    that.getPlayer = getPlayer;
    
    
    return that;
}