var EnemyManager = function (game){
    var that = {};

    var enemyGroup = [];    
    
    var WAVECOUNT = 5; //
    var killCnter = 0;
    
    var waveNumber = 0; //Keeps count of wave number. notify boss wave 
    var ifBoss = 0; //zero is no boss one is boss
    
    var enemyChecked = [];

    var uGroup;
    var eGroup;
    
    var eSpawn = {};
    eSpawn.x = 1850;
    eSpawn.y = 800;
    
    function Preload(){
        for(var i = 0; i < WAVECOUNT; ++i){
            var enemy = Enemy(that, game);
            
            enemyChecked.push(1);
            
            enemy.Preload();
            
            enemyGroup.push(enemy);
        }
    }
    
    
    function OnCreate(unitGroup, enemypGroup){
        uGroup = unitGroup;
        eGroup = enemypGroup;
        for(var i = 0; i < enemyGroup.length; ++i){
            enemyGroup[i].OnCreate(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup, enemypGroup);
            enemyGroup[i].ResetEnemy(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup.getChildAt(Math.floor(Math.random() * unitGroup.length)));
            enemyGroup[i].set_tisAttack();
            enemyGroup[i].zero_attack_delay();
        }
    }
    
    function Update(){
        
        for(var k = 0; k < enemyGroup.length; k++){
            if(enemyGroup[k].get_attack_delay() == 0){
                enemyGroup[k].set_tisAttack();
            }
            if(enemyGroup[k].get_attack_delay() > 0){
                enemyGroup[k].dec_attack_delay();
            }
        }
        
        if(ifBoss){
            if(enemyGroup[0].getIsActive() == true){
                enemyGroup[0].Update();
            }
            else{ //once the boss is dead
                ifBoss = 0; //turn off boss mode
                killCnter = WAVECOUNT + 1; //so itll restart the wave
                
            }
            
        }
        else{
                
            if(killCnter < WAVECOUNT){  //if you havent defeated all enemies  
            
                
                
                for(var i = 0; i < enemyGroup.length; ++i){
                    if(enemyGroup[i].getIsActive() == true){
                        enemyGroup[i].Update(); //move them closer to player since theyre not dead, and incremement killcnter if health is zero
                        
                    }
                    else{ //if theyre dead
                        if(enemyChecked[i] == 1){ //if not checked for their death
                            ++killCnter;
                            enemyChecked[i] = 0; //mark as checked
                        }
                        
                        
                    }
                }
                
            }
            else{
                
                killCnter = 0; //they should all be dead by now, reset the kill counter
                ++waveNumber;
                
                if(waveNumber == 3){ //every three waves, a big one comes out
                    enemyGroup[0].make_Boss(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), uGroup.getChildAt(Math.floor(Math.random() * uGroup.length)));
                    ifBoss = 1; //active boss level
                    waveNumber = 0;
                }
                else{    
                    for(var j = 0; j < enemyGroup.length; ++j){
                        //console.log('Else');
                        enemyGroup[j].ResetEnemy(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), uGroup.getChildAt(Math.floor(Math.random() * uGroup.length)));
                        enemyChecked[j] = 1; //mark as unchecked for death since were resetting
                        
                    }
                }
                
                
                
                
            }
        }

    }
    
    function getEnemyGroup(){
        return enemyGroup;
    }
    function getEgroup(){
        return eGroup;
    }
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getEnemyGroup = getEnemyGroup;
    that.getEgroup = getEgroup;

    return that;
}