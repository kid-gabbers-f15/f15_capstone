var Player = function (game){
    var that = {};
    var unit1;
    var unit2;
    var unit3;
    
    function Preload(){
        unit1 = Unit(that, game);
        unit2 = Unit(that, game);
        unit3 = Unit(that, game);

        unit1.Preload();
        unit2.Preload();
        unit3.Preload();
        
    }
    
    function OnCreate(unitGroup){
        // unit.OnCreate(game.input.mousePointer.x, game.input.mousePointer.y);
        unit1.OnCreate(300, 900, unitGroup);
        unit2.OnCreate(300, 1001, unitGroup);
        unit3.OnCreate(300, 799, unitGroup);
    }
    
    function Update(){
        
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    
    return that;
}