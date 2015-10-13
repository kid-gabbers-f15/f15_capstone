var Player = function (game){
    var that = {};
    var unit;

    function Preload(){
        unit = Unit(that, game);
        unit.Preload();
    }
    
    function OnCreate(){
        // unit.OnCreate(game.input.mousePointer.x, game.input.mousePointer.y);
        unit.OnCreate(300, 900, unitGroup)
    }
    
    function Update(){
        unit.Update();
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    
    return that;
}