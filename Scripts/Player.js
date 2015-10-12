var Player = function (game){
    var that = {};
    var unit;

    function Preload(){
        unit = Unit(that, game);
        unit.Preload();
    }
    
    
    function OnCreate(){
     // unit.OnCreate(game.input.mousePointer.x, game.input.mousePointer.y);
     
    }
    
    function Update(){
        
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    
    return that;
}