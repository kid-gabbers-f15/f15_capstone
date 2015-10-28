var DefenseEngine = function (game){
    var that = {};
    
    var background;
    var topBase;
    
    var enemyManager;
    var player;
    
    var unitGroup;
    var enemypGroup;
    
    var friendBaseData;
    
    function loadPlayerBase(base){
        for(var i = 0; i < base.list.length; ++i){
            var temp = game.add.sprite(base.list[i].position.x/2 + game.world.centerX/2, base.list[i].position.y/2, base.list[i].image);
            temp.anchor.setTo(0.5, 0.5);
            temp.scale.setTo(0.5, 0.5);
        }
    }
    function loadFriendBase(base){
        for(var i = 0; i < base.list.length; ++i){
            var temp = game.add.sprite(base.list[i].position.x/2, base.list[i].position.y/2 + game.world.centerY, base.list[i].image);
            temp.anchor.setTo(0.5, 0.5);
            temp.scale.setTo(0.5, 0.5);
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

        game.load.text('JSONfriendBaseData', 'Scripts/json.txt');
        game.load.text('JSONplayerBaseData', 'Scripts/json.txt');
        
        game.load.image('image1', 'Assets/Placeholder1.png');
        game.load.image('image2', 'Assets/Placeholder2.png');
        game.load.image('image3', 'Assets/Placeholder3.png');
        game.load.image('image4', 'Assets/Placeholder4.png');

    }
    
    function OnCreate(){
      
        //drawing background
        background = game.add.sprite(game.world.centerX, game.world.centerY + game.world.centerY/2, 'background');
        background.anchor.setTo(0.5, 0.5);
        background.crop(new Phaser.Rectangle(0, 540, 1920, 1080));
        
        topBase = game.add.sprite(game.world.centerX, game.world.centerY/2, 'topBase');
        topBase.anchor.setTo(0.5, 0.5);
        topBase.isActive = true;
        game.physics.enable(topBase, Phaser.Physics.ARCADE);
        topBase.body.immovable = true;
        //topBase.anchor.setTo(0.25,0.25);
        
        //friend base building
        friendBaseData = JSON.parse(game.cache.getText('JSONfriendBaseData'));
        console.log(friendBaseData);
        loadFriendBase(friendBaseData);
        playerBaseData = JSON.parse(game.cache.getText('JSONplayerBaseData'));
        console.log(playerBaseData);
        loadPlayerBase(playerBaseData);
        
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