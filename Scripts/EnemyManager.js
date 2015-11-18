var EnemyManager = function (game){
    var that = {};

    var x = 0;

    var enemyGroup1 = [];
    var enemyGroup2 = [];
    var enemyGroup3 = [];
    var bossGroup = [];
    
    var total_enemies = 10;
    var enemy_count_in_wave = 0;
    var boss_count_in_wave = 1;
    var killCnter = 0;
    
    var grd; //gradient of the text for the wave number
    var waveNumText;
    var waveNumTextFont = 'Revalia'; //wave text font
    
    var currentWave;
    var waveNumber = 0; //Keeps count of wave number. notify boss wave
    var boss_wave = 3;
    var ifBoss = 0; //zero is no boss one is boss

    var uGroup;
    var eGroup;
    
    var waitingForWave = false;
    
    var eSpawn = {};
    eSpawn.x = 1850;
    eSpawn.y = 800;
    
    var enemyTextList = []; // Empty list for text used on enemies
    
    function Preload(){
        for(var i = 0; i < total_enemies; ++i) //add each enemies to their respective arrays
        {
            var enemy1 = Enemy(that, game);
            
            enemy1.Preload();
            enemyGroup1.push(enemy1);
        
            var enemy2 = Enemy(that, game);
            
            enemy2.Preload();
            enemyGroup2.push(enemy2);
       
            var enemy3 = Enemy(that, game);
            
            enemy3.Preload();
            enemyGroup3.push(enemy3);
        
            var enemyBoss = Enemy(that, game);
            
            enemyBoss.Preload();
            bossGroup.push(enemyBoss);
        }
        
        // Load text file for enemy sprite text
        game.load.text('enemyText', '/Scripts/enemyText.txt');
    }
    
    
    function OnCreate(unitGroup, enemypGroup){
        // Enemy text
        var enemyText = game.cache.getText('enemyText');
        enemyTextList = enemyText.split('\n');
        
        uGroup = unitGroup;
        eGroup = enemypGroup;
        currentWave = 0;
        
        //here we create the enemies. four different groups for four different types
        
        for(var i = 0; i < enemyGroup1.length; ++i){
            enemyGroup1[i].OnCreate(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup, enemypGroup, false, 1);
            enemyGroup1[i].set_tisAttack(); //assert that the enemy is able to attack upon creation
        }
        
        for(var i = 0; i < enemyGroup2.length; ++i){
            enemyGroup2[i].OnCreate(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup, enemypGroup, false, 2);
            enemyGroup2[i].set_tisAttack(); //assert that the enemy is able to attack upon creation
        }
        
        for(var i = 0; i < enemyGroup3.length; ++i){
            enemyGroup3[i].OnCreate(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup, enemypGroup, false, 3);
            enemyGroup3[i].set_tisAttack(); //assert that the enemy is able to attack upon creation
        }
        
        for(var i = 0; i < bossGroup.length; ++i){
            bossGroup[i].OnCreate(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), unitGroup, enemypGroup, true, 0);
            bossGroup[i].set_tisAttack(); //assert that the enemy is able to attack upon creation
        }
        
        
        //..........................
        //create the text for the wave count
        waveNumText = game.add.text(50, 260, "Wave: " + currentWave);
                    waveNumText.font = waveNumTextFont;
                    waveNumText.fontSize = 60;
                    grd = waveNumText.context.createLinearGradient(0, 0, 0, waveNumText.canvas.height);
                    grd.addColorStop(0, '#8ED6FF');   
                    grd.addColorStop(1, '#004CB3');
                    waveNumText.fill = grd;
                    waveNumText.align = 'center';
                    waveNumText.stroke = '#000000';
                    waveNumText.strokeThickness = 2;
                    waveNumText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        waveNumText.anchor.setTo(0.0,0.0); //set the point of reference for the sprite
    }
    
    function Update(){
        
        if(ifBoss) // Boss Wave
        {
            console.log(killCnter + " < " + boss_count_in_wave)
            if(killCnter < boss_count_in_wave) // Bosses still alive
            {
                for(var i=0;i<boss_count_in_wave;i++)
                {
                    if(bossGroup[i].getIsActive() == true) // Boss is alive
                    {
                        bossGroup[i].Update();
                    }
                    else // Boss is dead
                    {
                        if(bossGroup[i].getIsActive() == false && bossGroup[i].getKilled() == true)
                        {
                            console.log('killed boss');
                            bossGroup[i].setKilled(false);
                           // ifBoss = 0; //turn off boss mode
                            killCnter++;
                        }
                    }
                }
            }
            else // All Bosses dead
            {
                if(waitingForWave == false)
                {
                    setTimeout(restartWave, 2000);
                    waitingForWave = true;
                }
            }
        }
        else // Normal wave
        {
            //console.log(killCnter + " < " + enemy_count_in_wave*3);
            
            //it is *3 because there are 3 groups of enemies. enemy_count_in_wave stands for enemies per group
            if(killCnter < enemy_count_in_wave*3) // Enemies still alive
            { 
                for(var i = 0; i < enemyGroup1.length; ++i)
                {
                    if(enemyGroup1[i].getIsActive() == true) // enemy alive
                    {
                        enemyGroup1[i].Update();
                    }
                    else // enemy dead
                    {
                        if(enemyGroup1[i].getIsActive() == false && enemyGroup1[i].getKilled() == true)
                        {
                            enemyGroup1[i].setKilled(false);
                            //console.log("killed e1");
                            ++killCnter;
                        }
                    }
                }
                for(var i = 0; i < enemyGroup2.length; ++i)
                {
                    if(enemyGroup2[i].getIsActive() == true) // enemy alive
                    {
                        enemyGroup2[i].Update();
                    }
                    else // enemy dead
                    {
                        if(enemyGroup2[i].getIsActive() == false && enemyGroup2[i].getKilled() == true)
                        {
                            enemyGroup2[i].setKilled(false);
                            //console.log("killed e2");
                            ++killCnter;
                        }
                    }
                }
                for(var i = 0; i < enemyGroup3.length; ++i)
                {
                    if(enemyGroup3[i].getIsActive() == true) // enemy alive
                    {
                        enemyGroup3[i].Update();
                    }
                    else // enemy dead
                    {
                        if(enemyGroup3[i].getIsActive() == false && enemyGroup3[i].getKilled() == true)
                        {
                            enemyGroup3[i].setKilled(false);
                            //console.log("killed e3");
                            ++killCnter;
                        }
                    }
                }
            }
            else // all enemies dead
            {
                if(waitingForWave == false)
                {
                    setTimeout(restartWave, 2000);
                    waitingForWave = true;
                }
            }
        }
    }
    
    function restartWave()
    {
        playerState.points = waveNumber; //keep track of high score for player
        
        
        killCnter = 0;
        ++waveNumber;
        
        ++currentWave;
        
        update_Wave_Text(); //increment the wave count text
        
        var unitpGroup = defEngine.getPlayer().getUnitPGroup();
        
        if(waveNumber != boss_wave)
        {
            ifBoss = 0;
        }
        
        if(waveNumber == boss_wave) //every three waves, a big one comes out
        { 
            ifBoss = 1; //active boss level
            waveNumber = 0;
            for(var i = 0; i < boss_count_in_wave; i++)
            {
                bossGroup[i].ResetEnemy(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), findUnit(unitpGroup));
            }
        }
        else // non boss wave
        {    
            enemy_count_in_wave = enemy_count_in_wave + 1;
            if(enemy_count_in_wave>10){
                enemy_count_in_wave=10;
            }
            for(var j = 0; j < enemy_count_in_wave; ++j)
            {
                enemyGroup1[j].ResetEnemy(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), findUnit(unitpGroup));
            }
            for(var j = 0; j < enemy_count_in_wave; ++j)
            {
                enemyGroup2[j].ResetEnemy(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), findUnit(unitpGroup));
            }
            for(var j = 0; j < enemy_count_in_wave; ++j)
            {
                enemyGroup3[j].ResetEnemy(eSpawn.x - (Math.floor(Math.random() * 100)), eSpawn.y + (Math.floor(Math.random() * 200)), findUnit(unitpGroup));
            }
        }
        
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
    
    
    
    // Getters
    function getEnemyGroup(){
        var enemyGroup = [];
        for(var i=0; i<enemyGroup1.length; i++)
        {
            if(enemyGroup1[i].getIsActive() == true)
            {
                enemyGroup.push(enemyGroup1[i]);
            }
        }
        for(var i=0; i<enemyGroup2.length; i++)
        {
            if(enemyGroup2[i].getIsActive() == true)
            {
                enemyGroup.push(enemyGroup2[i]);
            }
        }
        for(var i=0; i<enemyGroup3.length; i++)
        {
            if(enemyGroup3[i].getIsActive() == true)
            {
                enemyGroup.push(enemyGroup3[i]);
            }
        }
        for(var i=0; i<bossGroup.length; i++)
        {
            if(bossGroup[i].getIsActive() == true)
            {
                enemyGroup.push(bossGroup[i]);
            }
        }
        return enemyGroup;
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
    
    that.Preload = Preload;
    that.Update = Update;
    that.OnCreate = OnCreate;
    that.getEnemyGroup = getEnemyGroup;
    that.getEgroup = getEgroup;
    that.getEnemyText = getEnemyText;

    return that;
}