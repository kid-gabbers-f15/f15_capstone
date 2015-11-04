var EnemyManager = function (game){
    var that = {};

    var x = 0;

    var enemyGroup = [];    
    
    var enemy_count_in_wave = 6; //
    var killCnter = 0;
    
    var waveNumber = 0; //Keeps count of wave number. notify boss wave
    var boss_wave = 3;
    var ifBoss = 0; //zero is no boss one is boss
    
    var enemyChecked = [];

    var uGroup;
    var eGroup;
    
    var eSpawn = {};
    eSpawn.x = 1850;
    eSpawn.y = 800;
    
    function Preload(){
        for(var i = 0; i < enemy_count_in_wave; ++i){
            var enemy = Enemy(that, game);
            enemyChecked.push(1);
            
            enemy.Preload();
            enemyGroup.push(enemy);
        }
    }
    
    
    function OnCreate(unitGroup, enemypGroup){
        uGroup = unitGroup;
        eGroup = enemypGroup;
        
        for(var i = 0; i < enemyGroup.length - 1; ++i){
            enemyGroup[i].OnCreate(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup, enemypGroup);
            enemyGroup[i].ResetEnemy(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup.getChildAt(Math.floor(Math.random() * unitGroup.length)));
            enemyGroup[i].set_tisAttack(); //assert that the enemy is able to attack upon creation
        }
        
        enemyGroup[enemyGroup.length - 1].OnCreate(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup, enemypGroup, true);
        //enemyGroup[enemyGroup.length - 1].make_Boss(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup.getChildAt(Math.floor(Math.random() * unitGroup.length)));
        //enemyGroup[enemyGroup.length - 1].set_tisAttack();
        //enemyGroup[enemyGroup.length - 1].zero_attack_delay();
    }
    
    
    function add_enemy(thisManyEnemies){//add enemies to array of enemies
        
        var xPosition = eSpawn.x - (Math.floor(Math.random() * 100)); //where the enemies will start
        var yPosition = eSpawn.y + (Math.floor(Math.random() * 200));
        
        for(var i = 0; i < thisManyEnemies; ++i){
            
            var enemy = Enemy(that, game);
            
            
            
            enemy.Preload();
            enemy.new_enemy(xPosition, yPosition, uGroup, eGroup); //adding a new enemy to the squad
            enemy.ResetEnemy(xPosition, yPosition, uGroup.getChildAt(Math.floor(Math.random() * uGroup.length))); //reset enemy to new position
            enemy.set_tisAttack();
            //enemy.zero_attack_delay();
        
            enemyChecked.splice(enemyChecked.length-2, 0, 1); //unchecked
            
            enemyGroup.splice(enemyGroup.length-2, 0, enemy);
            
        }
        
        
        
    }
    
    
    
    
    function Update(){
        
        if(ifBoss){
            if(enemyGroup[enemyGroup.length - 1].getIsActive() == true){
                enemyGroup[enemyGroup.length - 1].Update();
            }
            else{ //once the boss is dead
                ifBoss = 0; //turn off boss mode
                killCnter = enemy_count_in_wave + 1; //so itll restart the wave
                
            }
            
        }
        else{
                
            if(killCnter < enemy_count_in_wave - 1){  //if you havent defeated all enemies (minus boss)
            
                for(var i = 0; i < enemyGroup.length - 1; ++i){
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
                
                if(waveNumber == boss_wave){ //every three waves, a big one comes out
                    enemyGroup[enemyGroup.length - 1].make_Boss(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), uGroup.getChildAt(Math.floor(Math.random() * uGroup.length)));
                    ifBoss = 1; //active boss level
                    waveNumber = 0;
                }
                else{    
                    for(var j = 0; j < enemyGroup.length - 1; ++j){
                        //console.log('Else');
                        enemyGroup[j].ResetEnemy(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), uGroup.getChildAt(Math.floor(Math.random() * uGroup.length)));
                        enemyChecked[j] = 1; //mark as unchecked for death since were resetting
                        
                        
                        
                        
                    }
                    
                    
                    add_enemy(2);
                    enemy_count_in_wave = enemy_count_in_wave + 2;
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