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
            enemyGroup[i].OnCreate(1500 - (Math.floor(Math.random() * 100)), 800 + (Math.floor(Math.random() * 200)), unitGroup);
            enemyGroup[i].ResetEnemy(1500 - (Math.floor(Math.random() * 100)), 800 + (Math.floor(Math.random() * 200)), unitGroup.getChildAt(Math.floor(Math.random() * unitGroup.length)));
        }
    }
    
    function Update(){
        for(var i = 0; i < enemyGroup.length; ++i){
            if(enemyGroup[i].isActive){
                enemyGroup[i].Update();
            }
        }
    }
    
    function getEnemyGroup(){
        return enemyGroup;
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getEnemyGroup = getEnemyGroup;

    return that;
}