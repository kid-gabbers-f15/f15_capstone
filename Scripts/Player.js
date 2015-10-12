var Player = function (game){
    var that = {};
    var unit;

    function Preload(){
        unit = Unit(that, game);
        unit.Preload();
        
    }
    var bmpText;
    
    function OnCreate(){
     // unit.OnCreate(game.input.mousePointer.x, game.input.mousePointer.y);
     unit.OnCreate(1000, 500)

    }
    
    function Update(){
        
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    
    return that;
}