var AssetLoader = function(game){
    var that = {};
    
    var Preload = function(){
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.text('JSONshopMenuItems', KCG_SCRIPT_PATH+'shopItems.txt');

         //Units-----------------------------------------------------
        game.load.image('unit_health', KCG_ASSET_PATH+'Unit_Pictures/UnitHealthBar.png');
        game.load.image('Unit1',KCG_ASSET_PATH+'Unit_Pictures/robot1.png');
        game.load.image('Unit2',KCG_ASSET_PATH+'Unit_Pictures/SuperBear.png');
        game.load.image('Unit3',KCG_ASSET_PATH+'Unit_Pictures/Unicorn1.png');

        game.load.image('unit0', KCG_ASSET_PATH+'Unit_Pictures/unit0.png');
        game.load.image('bullet', KCG_ASSET_PATH+'bulletSprite.png');
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
        game.load.image('BaseSticker31', KCG_ASSET_PATH+'BaseStickers/Castle1.png');
        game.load.image('BaseSticker32', KCG_ASSET_PATH+'BaseStickers/Castle2.png');
        game.load.image('BaseSticker33', KCG_ASSET_PATH+'BaseStickers/Castle3.png');
        game.load.image('BaseSticker34', KCG_ASSET_PATH+'BaseStickers/Castle4.png');
        game.load.image('BaseSticker35', KCG_ASSET_PATH+'BaseStickers/Castle14.png');
        game.load.image('BaseSticker36', KCG_ASSET_PATH+'BaseStickers/Castle15.png');
        game.load.image('BaseSticker37', KCG_ASSET_PATH+'BaseStickers/Castle25.png');
        game.load.image('BaseSticker38', KCG_ASSET_PATH+'BaseStickers/Person1.png');
        game.load.image('BaseSticker39', KCG_ASSET_PATH+'BaseStickers/Person2.png');
        game.load.image('BaseSticker40', KCG_ASSET_PATH+'BaseStickers/Person3.png');
        game.load.image('BaseSticker41', KCG_ASSET_PATH+'BaseStickers/Person4.png');
        game.load.image('BaseSticker42', KCG_ASSET_PATH+'BaseStickers/Person5.png');
        game.load.image('BaseSticker43', KCG_ASSET_PATH+'BaseStickers/Person6.png');
        game.load.image('BaseSticker44', KCG_ASSET_PATH+'BaseStickers/Person7.png');
        game.load.image('BaseSticker45', KCG_ASSET_PATH+'BaseStickers/Person8.png');
        game.load.image('BaseSticker46', KCG_ASSET_PATH+'BaseStickers/Person9.png');
        game.load.image('BaseSticker47', KCG_ASSET_PATH+'BaseStickers/Person10.png');
        game.load.image('BaseSticker48', KCG_ASSET_PATH+'BaseStickers/Person11.png');
        game.load.image('BaseSticker49', KCG_ASSET_PATH+'BaseStickers/Person12.png');
        game.load.image('BaseSticker50', KCG_ASSET_PATH+'BaseStickers/Person13.png');
        game.load.image('BaseSticker51', KCG_ASSET_PATH+'BaseStickers/Person14.png');
        game.load.image('BaseSticker52', KCG_ASSET_PATH+'BaseStickers/Person15.png');
        game.load.image('BaseSticker53', KCG_ASSET_PATH+'BaseStickers/Person16.png');
        game.load.image('BaseSticker54', KCG_ASSET_PATH+'BaseStickers/Person17.png');
        game.load.image('BaseSticker55', KCG_ASSET_PATH+'BaseStickers/Person18.png');
        game.load.image('BaseSticker56', KCG_ASSET_PATH+'BaseStickers/Person19.png');
        game.load.image('BaseSticker57', KCG_ASSET_PATH+'BaseStickers/Person20.png');
        game.load.image('BaseSticker58', KCG_ASSET_PATH+'BaseStickers/Person21.png');
        game.load.image('BaseSticker59', KCG_ASSET_PATH+'BaseStickers/Person22.png');
        game.load.image('BaseSticker60', KCG_ASSET_PATH+'BaseStickers/Person23.png');
        game.load.image('BaseSticker61', KCG_ASSET_PATH+'BaseStickers/Person24.png');
        game.load.image('BaseSticker62', KCG_ASSET_PATH+'BaseStickers/Person25.png');
        game.load.image('BaseSticker63', KCG_ASSET_PATH+'BaseStickers/Person26.png');
        game.load.image('BaseSticker64', KCG_ASSET_PATH+'BaseStickers/Person27.png');
        game.load.image('BaseSticker65',KCG_ASSET_PATH+'Unit_Pictures/robot1.png');
        game.load.image('BaseSticker66',KCG_ASSET_PATH+'Unit_Pictures/SuperBear.png');
        game.load.image('BaseSticker67',KCG_ASSET_PATH+'Unit_Pictures/Unicorn1.png');
        //Base Health
        game.load.image('baseHealthBar', KCG_ASSET_PATH+'baseHealthBar.png');
       
        //Main view stuff
        game.load.image('background', KCG_ASSET_PATH+'BackgroundKidGabTemplate.png');
        game.load.image('topBaseCollision', KCG_ASSET_PATH+'TopBaseImage.png');
        //game.load.image('topBaseBackground', KCG_ASSET_PATH+'TopBaseImage.png');
        
        //unit slots----------------------------------------------
        game.load.image('unitSlot1', KCG_ASSET_PATH+'shelves1.png');
        game.load.image('unitSlot2', KCG_ASSET_PATH+'shelves2.png');
        game.load.image('unitSlot3', KCG_ASSET_PATH+'shelves3.png');
        game.load.image('unitSlot4', KCG_ASSET_PATH+'shelves4.png');
        game.load.image('unitSlot5', KCG_ASSET_PATH+'shelves5.png');
        game.load.image('unitSlot6', KCG_ASSET_PATH+'shelves6.png');
        game.load.image('unitSlot7', KCG_ASSET_PATH+'shelves7.png');
        game.load.image('unitSlot8', KCG_ASSET_PATH+'shelves8.png');

        //game audio files----------------------------------------
        game.load.audio('rsound', KCG_ASSET_PATH+'audio/pause.mp3')
        game.load.audio('pling', KCG_ASSET_PATH+'audio/soundbible/Pling-KevanGC-1485374730_edit.mp3')
        game.load.audio('pew', KCG_ASSET_PATH+'audio/soundbible/Pew_Pew-DKnight556-1379997159.mp3');
        game.load.audio('click', KCG_ASSET_PATH+'audio/soundbible/Punch_HD-Mark_DiAngelo-1718986183.mp3');
        game.load.audio('button_click', KCG_ASSET_PATH+'audio/soundbible/Click-SoundBible.com-1387633738.mp3');
    }
    
    that.Preload = Preload;
    return that;
}
