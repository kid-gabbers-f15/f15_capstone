var DefenseEngine = function (game){
    var that = {};
    
    var background;
    var topBase;
    
    var enemyManager;
    var player;
    
    var unitGroup;
    var enemypGroup;
    
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
    }
    
    function OnCreate(){
      
        //drawing background
        background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        background.anchor.setTo(0.5, 0.5);
        
        topBase = game.add.sprite(game.world.centerX/2, 10, 'topBase');
        topBase.isActive = true;
        game.physics.enable(topBase, Phaser.Physics.ARCADE);
        topBase.body.immovable = true;
        //topBase.anchor.setTo(0.25,0.25);
        
        unitGroup = game.add.group();
        enemypGroup = game.add.group();

        player.OnCreate(unitGroup, enemypGroup);
        enemyManager.OnCreate(unitGroup, enemypGroup);
    }
    
    function Update(){
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