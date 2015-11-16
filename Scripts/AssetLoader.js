var AssetLoader = function(game){
    var that = {};
    
    var Preload = function(){
        //Base Backgrounds-------------------------------------------------
        game.load.image('BaseBackground1', 'Assets/BaseBackgrounds/BG1.png');
        game.load.image('BaseBackground2', 'Assets/BaseBackgrounds/BG2.png');
        game.load.image('BaseBackground3', 'Assets/BaseBackgrounds/BG3.png');
        game.load.image('BaseBackground4', 'Assets/BaseBackgrounds/BG4.png');
        game.load.image('BaseBackground5', 'Assets/BaseBackgrounds/BG5.png');
        game.load.image('BaseBackground6', 'Assets/BaseBackgrounds/BG6.png');
        game.load.image('BaseBackground7', 'Assets/BaseBackgrounds/BG7.png');
        game.load.image('BaseBackground8', 'Assets/BaseBackgrounds/BG8.png');
        game.load.image('BaseBackground9', 'Assets/BaseBackgrounds/BG9.png');
        game.load.image('BaseBackground10', 'Assets/BaseBackgrounds/BG10.png');
        game.load.image('BaseBackground11', 'Assets/BaseBackgrounds/BG11.png');
        game.load.image('BaseBackground12', 'Assets/BaseBackgrounds/BG12.png');
        game.load.image('BaseBackground13', 'Assets/BaseBackgrounds/BG13.png');
        game.load.image('BaseBackground14', 'Assets/BaseBackgrounds/BG14.png');
        game.load.image('BaseBackground15', 'Assets/BaseBackgrounds/BG15.png');
        game.load.image('BaseBackground16', 'Assets/BaseBackgrounds/BG16.png');
        game.load.image('BaseBackground17', 'Assets/BaseBackgrounds/BG17.png');
        game.load.image('BaseBackground18', 'Assets/BaseBackgrounds/BG18.png');
        game.load.image('BaseBackground19', 'Assets/BaseBackgrounds/BG19.png');
        game.load.image('BaseBackground20', 'Assets/BaseBackgrounds/BG20.png');
        game.load.image('BaseBackground21', 'Assets/BaseBackgrounds/BG21.png');
        game.load.image('BaseBackground22', 'Assets/BaseBackgrounds/BG22.png');
        game.load.image('BaseBackground23', 'Assets/BaseBackgrounds/BG23.png');

        //Base Stickers-----------------------------------------------------
        game.load.image('BaseSticker1', 'Assets/BaseStickers/Animal1.png');
        game.load.image('BaseSticker2', 'Assets/BaseStickers/Animal2.png');
        game.load.image('BaseSticker3', 'Assets/BaseStickers/Animal3.png');
        game.load.image('BaseSticker4', 'Assets/BaseStickers/Animal4.png');
        game.load.image('BaseSticker5', 'Assets/BaseStickers/Animal5.png');
        game.load.image('BaseSticker6', 'Assets/BaseStickers/Animal6.png');
        game.load.image('BaseSticker7', 'Assets/BaseStickers/Animal7.png');
        game.load.image('BaseSticker8', 'Assets/BaseStickers/Animal8.png');
        game.load.image('BaseSticker9', 'Assets/BaseStickers/Animal9.png');
        game.load.image('BaseSticker10', 'Assets/BaseStickers/Animal10.png');
        game.load.image('BaseSticker11', 'Assets/BaseStickers/Animal11.png');
        game.load.image('BaseSticker12', 'Assets/BaseStickers/Animal12.png');
        game.load.image('BaseSticker13', 'Assets/BaseStickers/Animal13.png');
        game.load.image('BaseSticker14', 'Assets/BaseStickers/Animal14.png');
        game.load.image('BaseSticker15', 'Assets/BaseStickers/Animal15.png');
        game.load.image('BaseSticker16', 'Assets/BaseStickers/Animal16.png');
        game.load.image('BaseSticker17', 'Assets/BaseStickers/Animal17.png');
        game.load.image('BaseSticker18', 'Assets/BaseStickers/Animal18.png');
        game.load.image('BaseSticker19', 'Assets/BaseStickers/Animal19.png');
        game.load.image('BaseSticker20', 'Assets/BaseStickers/Animal20.png');
        game.load.image('BaseSticker21', 'Assets/BaseStickers/Animal21.png');
        game.load.image('BaseSticker22', 'Assets/BaseStickers/Animal22.png');
        game.load.image('BaseSticker23', 'Assets/BaseStickers/Animal23.png');
        game.load.image('BaseSticker24', 'Assets/BaseStickers/Animal24.png');
        game.load.image('BaseSticker25', 'Assets/BaseStickers/MusicNote1.png');
        game.load.image('BaseSticker26', 'Assets/BaseStickers/MusicNote2.png');
        game.load.image('BaseSticker27', 'Assets/BaseStickers/MusicNote3.png');
        game.load.image('BaseSticker28', 'Assets/BaseStickers/MusicNote4.png');
        game.load.image('BaseSticker29', 'Assets/BaseStickers/PaintBrush.png');
        game.load.image('BaseSticker30', 'Assets/BaseStickers/Unicorn1.png');

        //Units-----------------------------------------------------
        game.load.image('Unit1','Assets/Unit_Pictures/robot1.png');
        game.load.image('Unit2','Assets/Unit_Pictures/SuperBear.png');
        game.load.image('Unit3','Assets/Unit_Pictures/Unicorn1.png');

        game.load.image('unit0', "Assets/Unit_Pictures/unit0.png");
        game.load.image('bullet', "Assets/bullet.png");
        game.load.image('pistolSprite', "Assets/Bullet_Type_Pictures/pistol.png");
        game.load.image('shotgunSprite', "Assets/Bullet_Type_Pictures/shotgun.png");
        game.load.image('rifleSprite', "Assets/Bullet_Type_Pictures/rifle.png");
        
        //enemies----------------------------------------------------
        game.load.image('enemy1', "Assets/Enemy_Pictures/Enemy6.png");
        game.load.image('enemy2', "Assets/Enemy_Pictures/Enemy2.png");
        game.load.image('enemy3', "Assets/Enemy_Pictures/Enemy4.png");
        game.load.image('healthBar', 'Assets/Placeholder4.png');
        game.load.image('EnemyBoss_1', 'Assets/Enemy_Pictures/Enemy5.png');
        game.load.image('Boss_1_Health', 'Assets/Enemy_Pictures/Boss_1Health.png');
        
        //Main view stuff
        game.load.image('background', 'Assets/BackgroundKidGabTemplate.png');
        game.load.image('topBaseCollision', 'Assets/TopBaseImage.png');
        game.load.image('topBaseBackground', 'Assets/TopBaseImage.png');
        
        //shop stuff-------------------------------------------------
        game.load.image('shopMenu', 'Assets/Placeholder3.png');
        game.load.image('Item1', 'Assets/BaseStickers/Animal1.png');
        game.load.image('Item2', 'Assets/BaseStickers/Animal2.png');
        game.load.image('Item3', 'Assets/BaseStickers/Animal3.png');
        game.load.image('Item4', 'Assets/BaseStickers/Animal4.png');
        game.load.image('Item5', 'Assets/BaseStickers/Animal5.png');
        game.load.image('Item6', 'Assets/BaseStickers/Animal6.png');
        game.load.image('Item7', 'Assets/BaseStickers/Animal7.png');
        game.load.image('Item8', 'Assets/BaseStickers/Animal8.png');
        game.load.image('Item9', 'Assets/BaseStickers/Animal9.png');

    }
    
    that.Preload = Preload;
    return that;
}