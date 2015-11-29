var AssetLoader = function(game){
    var that = {};
    
    var Preload = function(){
		
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

         //Units-----------------------------------------------------
        game.load.image('unit_health', KCG_ASSET_PATH+'Unit_Pictures/UnitHealthBar.png');
        game.load.image('Unit1',KCG_ASSET_PATH+'Unit_Pictures/robot1.png');
        game.load.image('Unit2',KCG_ASSET_PATH+'Unit_Pictures/SuperBear.png');
        game.load.image('Unit3',KCG_ASSET_PATH+'Unit_Pictures/Unicorn1.png');

        game.load.image('unit0', KCG_ASSET_PATH+'Unit_Pictures/unit0.png');
        game.load.image('bullet', KCG_ASSET_PATH+'bullet.png');
        game.load.image('pistolSprite', KCG_ASSET_PATH+'Bullet_Type_Pictures/pistol.png');
        game.load.image('shotgunSprite', KCG_ASSET_PATH+'Bullet_Type_Pictures/shotgun.png');
        game.load.image('rifleSprite', KCG_ASSET_PATH+'Bullet_Type_Pictures/rifle.png');
        
        //enemies----------------------------------------------------
        game.load.image('enemy1', KCG_ASSET_PATH+'Enemy_Pictures/Enemy6.png');
        game.load.image('enemy2', KCG_ASSET_PATH+'Enemy_Pictures/Enemy2.png');
        game.load.image('enemy3', KCG_ASSET_PATH+'Enemy_Pictures/Enemy4.png');
        game.load.image('healthBar', KCG_ASSET_PATH+'Placeholder4.png');
        game.load.image('EnemyBoss_1', KCG_ASSET_PATH+'Enemy_Pictures/Enemy5.png');
        game.load.image('Boss_1_Health', KCG_ASSET_PATH+'Enemy_Pictures/Boss_1Health.png');
        
        //Base Backgrounds-------------------------------------------------
        game.load.image('BaseBackground1', KCG_ASSET_PATH+'BaseBackgrounds/BG1.png');
        game.load.image('BaseBackground2', KCG_ASSET_PATH+'BaseBackgrounds/BG2.png');
        game.load.image('BaseBackground3', KCG_ASSET_PATH+'BaseBackgrounds/BG3.png');
        game.load.image('BaseBackground4', KCG_ASSET_PATH+'BaseBackgrounds/BG4.png');
        game.load.image('BaseBackground5', KCG_ASSET_PATH+'BaseBackgrounds/BG5.png');
        game.load.image('BaseBackground6', KCG_ASSET_PATH+'BaseBackgrounds/BG6.png');
        game.load.image('BaseBackground7', KCG_ASSET_PATH+'BaseBackgrounds/BG7.png');
        game.load.image('BaseBackground8', KCG_ASSET_PATH+'BaseBackgrounds/BG8.png');
        game.load.image('BaseBackground9', KCG_ASSET_PATH+'BaseBackgrounds/BG9.png');
        game.load.image('BaseBackground10', KCG_ASSET_PATH+'BaseBackgrounds/BG10.png');
        game.load.image('BaseBackground11', KCG_ASSET_PATH+'BaseBackgrounds/BG11.png');
        game.load.image('BaseBackground12', KCG_ASSET_PATH+'BaseBackgrounds/BG12.png');
        game.load.image('BaseBackground13', KCG_ASSET_PATH+'BaseBackgrounds/BG13.png');
        game.load.image('BaseBackground14', KCG_ASSET_PATH+'BaseBackgrounds/BG14.png');
        game.load.image('BaseBackground15', KCG_ASSET_PATH+'BaseBackgrounds/BG15.png');
        game.load.image('BaseBackground16', KCG_ASSET_PATH+'BaseBackgrounds/BG16.png');
        game.load.image('BaseBackground17', KCG_ASSET_PATH+'BaseBackgrounds/BG17.png');
        game.load.image('BaseBackground18', KCG_ASSET_PATH+'BaseBackgrounds/BG18.png');
        game.load.image('BaseBackground19', KCG_ASSET_PATH+'BaseBackgrounds/BG19.png');
        game.load.image('BaseBackground20', KCG_ASSET_PATH+'BaseBackgrounds/BG20.png');
        game.load.image('BaseBackground21', KCG_ASSET_PATH+'BaseBackgrounds/BG21.png');
        game.load.image('BaseBackground22', KCG_ASSET_PATH+'BaseBackgrounds/BG22.png');
        game.load.image('BaseBackground23', KCG_ASSET_PATH+'BaseBackgrounds/BG23.png');

        //Base Stickers-----------------------------------------------------
        game.load.image('BaseSticker1', KCG_ASSET_PATH+'BaseStickers/Animal1.png');
        game.load.image('BaseSticker2', KCG_ASSET_PATH+'BaseStickers/Animal2.png');
        game.load.image('BaseSticker3', KCG_ASSET_PATH+'BaseStickers/Animal3.png');
        game.load.image('BaseSticker4', KCG_ASSET_PATH+'BaseStickers/Animal4.png');
        game.load.image('BaseSticker5', KCG_ASSET_PATH+'BaseStickers/Animal5.png');
        game.load.image('BaseSticker6', KCG_ASSET_PATH+'BaseStickers/Animal6.png');
        game.load.image('BaseSticker7', KCG_ASSET_PATH+'BaseStickers/Animal7.png');
        game.load.image('BaseSticker8', KCG_ASSET_PATH+'BaseStickers/Animal8.png');
        game.load.image('BaseSticker9', KCG_ASSET_PATH+'BaseStickers/Animal9.png');
        game.load.image('BaseSticker10', KCG_ASSET_PATH+'BaseStickers/Animal10.png');
        game.load.image('BaseSticker11', KCG_ASSET_PATH+'BaseStickers/Animal11.png');
        game.load.image('BaseSticker12', KCG_ASSET_PATH+'BaseStickers/Animal12.png');
        game.load.image('BaseSticker13', KCG_ASSET_PATH+'BaseStickers/Animal13.png');
        game.load.image('BaseSticker14', KCG_ASSET_PATH+'BaseStickers/Animal14.png');
        game.load.image('BaseSticker15', KCG_ASSET_PATH+'BaseStickers/Animal15.png');
        game.load.image('BaseSticker16', KCG_ASSET_PATH+'BaseStickers/Animal16.png');
        game.load.image('BaseSticker17', KCG_ASSET_PATH+'BaseStickers/Animal17.png');
        game.load.image('BaseSticker18', KCG_ASSET_PATH+'BaseStickers/Animal18.png');
        game.load.image('BaseSticker19', KCG_ASSET_PATH+'BaseStickers/Animal19.png');
        game.load.image('BaseSticker20', KCG_ASSET_PATH+'BaseStickers/Animal20.png');
        game.load.image('BaseSticker21', KCG_ASSET_PATH+'BaseStickers/Animal21.png');
        game.load.image('BaseSticker22', KCG_ASSET_PATH+'BaseStickers/Animal22.png');
        game.load.image('BaseSticker23', KCG_ASSET_PATH+'BaseStickers/Animal23.png');
        game.load.image('BaseSticker24', KCG_ASSET_PATH+'BaseStickers/Animal24.png');
        game.load.image('BaseSticker25', KCG_ASSET_PATH+'BaseStickers/MusicNote1.png');
        game.load.image('BaseSticker26', KCG_ASSET_PATH+'BaseStickers/MusicNote2.png');
        game.load.image('BaseSticker27', KCG_ASSET_PATH+'BaseStickers/MusicNote3.png');
        game.load.image('BaseSticker28', KCG_ASSET_PATH+'BaseStickers/MusicNote4.png');
        game.load.image('BaseSticker29', KCG_ASSET_PATH+'BaseStickers/PaintBrush.png');
        game.load.image('BaseSticker30', KCG_ASSET_PATH+'BaseStickers/Unicorn1.png');


        //Base Health
        game.load.image('baseHealthBar', KCG_ASSET_PATH+'baseHealthBar.png');
       
        //Main view stuff
        game.load.image('background', KCG_ASSET_PATH+'BackgroundKidGabTemplate.png');
        game.load.image('topBaseCollision', KCG_ASSET_PATH+'TopBaseImage.png');
        game.load.image('topBaseBackground', KCG_ASSET_PATH+'TopBaseImage.png');
        
        //shop stuff-------------------------------------------------
        game.load.image('shopMenu', KCG_ASSET_PATH+'Placeholder3.png');
        game.load.image('Item1', KCG_ASSET_PATH+'BaseStickers/Animal1.png');
        game.load.image('Item2', KCG_ASSET_PATH+'BaseStickers/Animal2.png');
        game.load.image('Item3', KCG_ASSET_PATH+'BaseStickers/Animal3.png');
        game.load.image('Item4', KCG_ASSET_PATH+'BaseStickers/Animal4.png');
        game.load.image('Item5', KCG_ASSET_PATH+'BaseStickers/Animal5.png');
        game.load.image('Item6', KCG_ASSET_PATH+'BaseStickers/Animal6.png');
        game.load.image('Item7', KCG_ASSET_PATH+'BaseStickers/Animal7.png');
        game.load.image('Item8', KCG_ASSET_PATH+'BaseStickers/Animal8.png');
        game.load.image('Item9', KCG_ASSET_PATH+'BaseStickers/Animal9.png');
        
        //unit slots----------------------------------------------
        game.load.image('unitSlot1', KCG_ASSET_PATH+'shelves1.png');
        game.load.image('unitSlot2', KCG_ASSET_PATH+'shelves2.png');
        game.load.image('unitSlot3', KCG_ASSET_PATH+'shelves3.png');
        game.load.image('unitSlot4', KCG_ASSET_PATH+'shelves4.png');
        game.load.image('unitSlot5', KCG_ASSET_PATH+'shelves5.png');
        game.load.image('unitSlot6', KCG_ASSET_PATH+'shelves6.png');
        game.load.image('unitSlot7', KCG_ASSET_PATH+'shelves7.png');
        game.load.image('unitSlot8', KCG_ASSET_PATH+'shelves8.png');


    }
    
    that.Preload = Preload;
    return that;
}