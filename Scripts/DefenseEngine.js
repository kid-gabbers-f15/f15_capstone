var DefenseEngine = function (game){
    var that = {};
    
    var background;
    
    var enemyManager;
    var player;
    
    
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
    var bmpText;
    
    function OnCreate(){
      
        //drawing background
        background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        background.anchor.setTo(0.5, 0.5);
        
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
    
    return that;
}