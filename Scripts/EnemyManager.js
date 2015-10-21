var EnemyManager = function (game){
    var that = {};

    var enemyGroup = [];    

    var uGroup;
    var eGroup;
    
    function Preload(){
        for(var i = 0; i < 5; ++i){
            var enemy = Enemy(that, game);
            enemy.Preload();
            
            enemyGroup.push(enemy);
        }
    }
    
    
    function OnCreate(unitGroup, enemypGroup){
        uGroup = unitGroup;
        eGroup = enemypGroup;
        for(var i = 0; i < enemyGroup.length; ++i){
            enemyGroup[i].OnCreate(1500 - (Math.floor(Math.random() * 100)), 800 + (Math.floor(Math.random() * 200)), unitGroup, enemypGroup);
            enemyGroup[i].ResetEnemy(1500 - (Math.floor(Math.random() * 100)), 800 + (Math.floor(Math.random() * 200)), unitGroup.getChildAt(Math.floor(Math.random() * unitGroup.length)));
        }
    }
    
    function Update(){
        for(var i = 0; i < enemyGroup.length; ++i){
            if(enemyGroup[i].getIsActive() == true){
                enemyGroup[i].Update();
            }else{
                console.log('Else');
                enemyGroup[i].ResetEnemy(1500 - (Math.floor(Math.random() * 100)), 800 + (Math.floor(Math.random() * 200)), uGroup.getChildAt(Math.floor(Math.random() * uGroup.length)));
            }
        }
        
        for(var k = 0; k < enemyGroup.length; k++){
            if(enemyGroup[k].get_attack_delay() == 0){
                enemyGroup[k].set_tisAttack();
            }
            if(enemyGroup[k].get_attack_delay() > 0){
                enemyGroup[k].dec_attack_delay();
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