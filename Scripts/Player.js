var Player = function (game){
    var that = {};
    var unit;

    function Preload(){
        unit = Unit(that, game);
        unit.Preload();
    }
    
    
<<<<<<< HEAD
    function OnCreate(){
        unit.OnCreate(game.input.mousePointer.x, game.input.mousePointer.y);
     
=======
    function OnCreate(unitGroup){
        // unit.OnCreate(game.input.mousePointer.x, game.input.mousePointer.y);
        unit.OnCreate(300, 900, unitGroup)
>>>>>>> abe520b245822d895f55d13ce2fd1e280f42935a
    }
    
    function Update(){
        unit.Update();
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    
    return that;
}