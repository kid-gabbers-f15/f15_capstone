var EnemyManager = function (game){
    var that = {};

    var enemyGroup = [];    
    var enemy;
    
    function Preload(){

        enemy = Enemy(that, game);
        enemy.Preload();
    }
    
    
    function OnCreate(){
        enemy.OnCreate(2000, 850);

        enemyGroup.push(enemy);
        console.log(enemyGroup);
    }
    
    function Update(){
        for(var i = 0; i < enemyGroup.length; ++i){
            if(enemyGroup[i].isActive){
                enemyGroup[i].Update();
            }
        }
        //console.log("EnemyManager enemyGroup");
        //console.log(enemyGroup);
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.enemyGroup = function(){return enemyGroup};

    return that;
}