var DefenseEngine = function (game){
    var that = {};
    
    var background;
    
    var enemyManager;
    var player;
    
    //collisionGroups
    var enemyCollisionGroup;
    var unitCollisionGroup;
    
    function Preload(){
        //loading background image
        console.log("Preload for defense engine");
        game.load.image('background', 'Assets/BackgroundKidGabTemplate.png');
        
        enemyManager = EnemyManager(game);
        enemyManager.Preload();
        
        player = Player(game);
        player.Preload();
        
        
        game.load.image('unit', "Assets/Placeholder1.png");
    }
    
    
    function OnCreate(){
        
        enemyCollisionGroup = game.add.group();
        unitCollisionGroup =  game.add.group();
        
        //drawing background
        background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        background.anchor.setTo(0.5, 0.5);
        
        var unit1 = game.add.sprite(200, 850, 'unit');
        var unit2 = game.add.sprite(200, 950, 'unit');
        var unit3 = game.add.sprite(200, 1050, 'unit');

        game.physics.enable(unit1, Phaser.Physics.ARCADE);
        game.physics.enable(unit2, Phaser.Physics.ARCADE);
        game.physics.enable(unit3, Phaser.Physics.ARCADE);
        
        unitCollisionGroup.add(unit1);
        unitCollisionGroup.add(unit2);
        unitCollisionGroup.add(unit3);
        
        enemyManager.OnCreate();
        player.OnCreate();
    }
    
    function Update(){
        enemyManager.Update();
        player.Update();
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    
    that.unitCollisionGroup = unitCollisionGroup;
    that.enemyCollisionGroup = enemyCollisionGroup;
    
    return that;
}