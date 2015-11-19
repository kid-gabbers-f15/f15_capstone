var Player = function (game){
    //unit manager
    var that = {};
    var unitpGroup = [];
    var unitSlotPositions = new Array(
        {x: 676, y: 795},
        {x: 720, y: 925},
        {x: 810, y: 770},
        {x: 850, y: 995},
        {x: 950, y: 870},
        {x: 870, y: 630},
        {x: 995, y: 730},
        {x: 1080, y: 890}
        );
    
    function Preload(){
        for(var i = 0; i < playerState.unitSlots; i++){
            var unit = Unit(that, game);
            unit.Preload();
            unitpGroup.push(unit);
        }
    }
    
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
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getUnitPGroup = getUnitPGroup;
    
    return that;
}