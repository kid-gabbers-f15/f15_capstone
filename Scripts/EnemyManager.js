var EnemyManager = function (game){
    var that = {};

    var x = 0;
    var enemyGroup = []; // Group of all enemies
    var enemyGroup1 = []; // Group of enemy type 1
    var enemyGroup2 = []; // Group of enemy type 2
    var enemyGroup3 = []; // Group of enemy type 3
    var bossGroup = [];  // Group of bosses
    var total_enemies = 30; // Total number of enemies to create
    var total_bosses = 10; // Total number of bosses to create
    var enemy_count_in_wave = 0; // number of enemies from each group
    var boss_count_in_wave = 1; // Bosses to start with in wave
    var killCnter = 0; // Counter for kills per wave
    var grd; //gradient of the text for the wave number
    var waveNumText; // text for wave count
    var waveNumTextFont = 'Revalia'; //wave text font
    var numThatHasSpawned = 0; //number of enemies that have spawned
    var currentWave; // int, current wave the player is on
    var waveNumber = 0; //Keeps count of wave number. notify boss wave
    var boss_wave = 3; // how often the boss wave happens
    var ifBoss = 0; //zero is no boss one is boss
    var uGroup; // Group of units
    var eGroup; // Group of enemies
    var waitingForWave = false; // whether the timer for the wave is counting down
    var waitingForStart = true; // whether the game is waiting for the start button to be clicked
    var eSpawn = {}; // Coordinates for enemies to spawn around
    eSpawn.x = 1850;
    eSpawn.y = 800;
    var enemyTextList = []; // Empty list for text used on enemies
    
    function Preload(){
        for(var i = 0; i < total_enemies; ++i){ //add enemies to the array
            var enemy = Enemy(that, game);
            enemyGroup.push(enemy);
        }
        
        for(var i = 0; i < total_bosses; i++){ // add bosses to the array
            var boss = Enemy(that, game);
            bossGroup.push(boss);
        }
        
        // Load text file for enemy sprite text
        game.load.text('enemyText', KCG_SCRIPT_PATH+'enemyText.txt');
    }
    
    function OnCreate(unitGroup, enemypGroup){
        // Enemy text
        var enemyText = game.cache.getText('enemyText');
        enemyTextList = enemyText.split('\n');
        
        uGroup = unitGroup;
        eGroup = enemypGroup;
        currentWave = tempState.current_wave;
        waveNumber = tempState.boss_indicator;
        
        // OnCreate for each enemy and boss
        for(var i = 0; i < enemyGroup.length; ++i){
            enemyGroup[i].OnCreate(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup, enemypGroup, false, (Math.floor(i/10) + 1));
            enemyGroup[i].set_tisAttack(); //assert that the enemy is able to attack upon creation
        }
        
        for(var i = 0; i < bossGroup.length; ++i){
            bossGroup[i].OnCreate(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup, enemypGroup, true, 0);
            bossGroup[i].set_tisAttack(); //assert that the enemy is able to attack upon creation
        }
        
        //create the text for the wave count
        waveNumText = game.add.text(60, 385, "Wave: " + currentWave);
        waveNumText.font = waveNumTextFont;
        waveNumText.fontSize = 45;
        grd = waveNumText.context.createLinearGradient(0, 0, 0, waveNumText.canvas.height);
        grd.addColorStop(0, '#cd0000');   
        grd.addColorStop(1, '#ff1a1a');
        waveNumText.fill = grd;
        waveNumText.align = 'center';
        waveNumText.stroke = '#000000';
        waveNumText.strokeThickness = 4;
        waveNumText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        waveNumText.anchor.setTo(0.0,0.0); //set the point of reference for the sprite
    }
    
    function Update(){
        if(waitingForStart == false){
            if(ifBoss){ // Boss Wave
                //console.log(killCnter + " < " + boss_count_in_wave)
                if(killCnter < boss_count_in_wave){ // Bosses still alive
                    for(var i=0;i<boss_count_in_wave;i++){
                        if(bossGroup[i].getIsActive() == true){ // Boss is alive
                            bossGroup[i].Update();
                        }
                        else{ // Boss is dead
                            if(bossGroup[i].getIsActive() == false && bossGroup[i].getKilled() == true){
                                console.log('killed boss');
                                bossGroup[i].setKilled(false);
                               // ifBoss = 0; //turn off boss mode
                                killCnter++;
                            }
                        }
                    }
                }
                else{ // All Bosses dead
                    if(waitingForWave == false){
                        setTimeout(restartWave, 3000);
                        waitingForWave = true;
                    }
                }
            }
            else{ // Normal wave
                //console.log(killCnter + " < " + enemy_count_in_wave);
                var unitpGroup = defEngine.getPlayer().getUnitPGroup();
                
                if(killCnter < enemy_count_in_wave){ // Enemies still alive
                    for(var i = 0; i < enemyGroup.length; ++i){
                        if(enemyGroup[i].getIsActive() == true){ // enemy alive
                            enemyGroup[i].Update();
                        }
                        else{ // enemy dead
                            if(enemyGroup[i].getIsActive() == false && enemyGroup[i].getKilled() == true){
                                if(numThatHasSpawned < enemy_count_in_wave){
                                    enemyGroup[i].ResetEnemy(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), findUnit(unitpGroup));
                                    numThatHasSpawned++;
                                }
                                else{
                                    enemyGroup[i].setKilled(false);
                                }
                                
                                ++killCnter;
                            }
                        }
                    }
                }
                else{ // all enemies dead
                    if(waitingForWave == false){
                        setTimeout(restartWave, 3000);
                        waitingForWave = true;
                    }
                }
            }
        }
    }
    
    function restartWave(){
        numThatHasSpawned = 0;
        playerState.points = waveNumber; //keep track of high score for player
        killCnter = 0;
        
        
        if(tempState.came_from_base){
            tempState.came_from_base = false;
        }
        else{
            ++waveNumber;
            ++currentWave;
        }
        
        update_Wave_Text(); //increment the wave count text
        
        var unitpGroup = defEngine.getPlayer().getUnitPGroup();
        
        if(waveNumber != boss_wave){
            ifBoss = 0;
        }
        
        if(waveNumber == boss_wave){ //every three waves, a big one comes out
            ifBoss = 1; //active boss level
            waveNumber = 0;
            for(var i = 0; i < boss_count_in_wave; i++){
                bossGroup[i].ResetEnemy(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), findUnit(unitpGroup));
            }
        }
        else{ // non boss wave
            enemy_count_in_wave = enemy_count_in_wave + 2;
            // Increase this ^ to increase count per wave
            
            if(enemy_count_in_wave > 30){ //increase the number of enemies from each group
                enemy_count_in_wave = 30; //10 is the limit since each group only has 10 max. Memory limit.
            }
            
            for(var j = 0; j < enemy_count_in_wave; ++j){
                //reset enemies to spawn again
                if(numThatHasSpawned <= enemy_count_in_wave){
                    enemyGroup[j].ResetEnemy(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), findUnit(unitpGroup));
                    numThatHasSpawned++;
                }
            }
        }
        //set values for the state of the current game
        tempState.current_wave = currentWave;
        tempState.boss_indicator = waveNumber;
        waitingForWave = false;
    }
    
    function findUnit(uGroup){
        var temp = uGroup[0];
        for(var i = 1; i < uGroup.length; ++i){
            if(uGroup[i].getUnitSprite().x > temp.getUnitSprite().x){
                if(uGroup[i].get_children()>0){
                    temp = uGroup[i];
                }
            }
        }
        return temp;
    }
    
    // Getters & Setters
    function getEnemyGroup(){
        var tempEnemyGroup=[];
        
        for(var i=0;i<enemyGroup.length;i++){
            tempEnemyGroup.push(enemyGroup[i]);
        }
        
        for(var i=0;i<bossGroup.length;i++){
            tempEnemyGroup.push(bossGroup[i]);
        }
        
        return tempEnemyGroup;
    }
    function getEgroup(){
        return eGroup;
    }
    function update_Wave_Text(){
        waveNumText.setText("Wave: " + currentWave);
    }
    function getEnemyText(){
        return enemyTextList;
    }
    function startGame(){
        waitingForStart = false;
    }
    function endGame(){
        waitingForStart = true;
    }
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getEnemyGroup = getEnemyGroup;
    that.getEgroup = getEgroup;
    that.getEnemyText = getEnemyText;
    that.startGame = startGame;
    that.endGame = endGame;

    return that;
}
