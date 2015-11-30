var Player = function (game){
    //unit manager
    var that = {};
    
    var unitpGroup = [];
    var unitSlotPositions = new Array(
        {x: 876, y: 795},
        {x: 920, y: 925},
        {x: 1010, y: 770},
        {x: 1050, y: 995},
        {x: 1150, y: 870},
        {x: 1070, y: 630},
        {x: 1195, y: 730},
        {x: 1280, y: 890}
    );
    
    function Preload(){
        for(var i = 0; i < playerState.unitSlots; i++){
            var unit = Unit(that, game);
            unit.Preload();
            unitpGroup.push(unit);
        }
    }
    
    /*
    unitGroup - list of units
    enemyGroup - list of enemies
    */
    function OnCreate(unitGroup, enemypGroup){
        for(var i = 0; i < unitpGroup.length; i++)
        {
            unitpGroup[i].OnCreate(unitSlotPositions[i].x, unitSlotPositions[i].y, unitGroup);
        }
    }
    
    function Update(){
        for(var i = 0; i < unitpGroup.length; i++){
            if(unitpGroup[i].thisIsBase() === false){
                unitpGroup[i].Update();
            }
        }
    }
    
    function getUnitPGroup(){
        return unitpGroup;
    }
    
    function addSlot(unitGroup){
        var unit = Unit(that, game);
            unit.Preload();
            unit.OnCreate(unitSlotPositions[playerState.unitSlots-1].x, unitSlotPositions[playerState.unitSlots-1].y, unitGroup);
            unitpGroup.push(unit);
        
    }
    
    that.addSlot = addSlot;
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getUnitPGroup = getUnitPGroup;
    
    return that;
}
