var Player = function (game){
    //unit manager
    var that = {};
    var unit1;
    var unit2;
    var unit3;
    var unitpGroup = [];
    var upGroup;
    
    function Preload(){
        for(var i = 0; i < 3; i++){
            var unit = Unit(that, game);
            unit.Preload();
            unitpGroup.push(unit);
        }
    }
    
    function OnCreate(unitGroup, enemypGroup){
        upGroup = unitGroup;
        var y_pos = 699;
        for(var i = 0; i < unitpGroup.length; i++)
        {
            unitpGroup[i].OnCreate(900, y_pos, unitGroup);
            y_pos = y_pos + 111;
        }
    }
    
    function Update(){
        for(var i = 0; i < unitpGroup.length; i++){
            unitpGroup[i].Update();
        }
    }
    function getUnitPGroup(){
        return unitpGroup;
    }
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getUnitPGroup = getUnitPGroup;
    
    return that;
}