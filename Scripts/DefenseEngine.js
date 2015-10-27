var DefenseEngine = function (game){
    var that = {};
    
    var background;
    
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