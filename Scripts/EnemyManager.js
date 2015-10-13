var EnemyManager = function (game){
    var that = {};

    var enemyGroup = [];    

    function Preload(){
        for(var i = 0; i < 5; ++i){
            var enemy = Enemy(that, game);
            enemy.Preload();
            
            enemyGroup.push(enemy);
        }
    }
    
    
    function OnCreate(unitGroup){
        for(var i = 0; i < enemyGroup.length; ++i){
            enemyGroup[i].OnCreate(2000, 850, unitGroup);
        }
        
        console.log(enemyGroup);
    }
    
    function Update(){
        for(var i = 0; i < enemyGroup.length; ++i){
            if(enemyGroup[i].isActive){
                enemyGroup[i].Update();
            }
        }
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;

    return that;
}