var DefenseEngine = function (game){
    var that = {};
    
    var background;
    
    var enemyManager;
    var player;
    
    var unitGroup;
    
    function Preload(){
        //loading background image
        console.log("Preload for defense engine");
       // game.load.image('background', 'Assets/BackgroundKidGabTemplate.png');
        game.load.bitmapFont('carrier_command', 'Assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');

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
        
        bmpText = game.add.bitmapText(10, 100, 'carrier_command','Drag me around !',34);
        bmpText.inputEnabled = true;
        bmpText.input.enableDrag();
        
        unitGroup = game.add.group();

        enemyManager.OnCreate(unitGroup);
        player.OnCreate(unitGroup);

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