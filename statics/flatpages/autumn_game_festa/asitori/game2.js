enchant();

window.onload = function() {
    var game = new Game(400, 320);//��ʂ̃T�C�Y�ݒ�
    game.fps =30;//��ʂ̂P�b�Ԃ̃R�}��
    game.preload('kawaz.gif','itemA.png','itemB.png');//�摜�̓ǂݍ���
    game.keybind(90, 'a'); //z
    
    game.onload = function() {
    
        //���[���E�ւс�
    
        var itemA = new Sprite(30, 30);//�摜�̃T�C�Y
        itemA.image = game.assets['itemA.png'];//�摜�̖��O
        itemA.x = 0;
        itemA.y = 110;//�摜�̈ʒu
        itemA.pose = 0;//pose�����[���ɒ�`
        
        itemA.addEventListener('enterframe',function(){
            this.speed = 0;
            
            if (game.input.up) {//�����������Ƃ�
                this.speed = -5;
            } else if (game.input.down) {//�����������Ƃ�
                this.speed = 5;
            }
            
            if(game.input.left) {//�����������Ƃ�
                this.x = 0;
                this.scaleX = 1;
            } else if (game.input.right){//�����������Ƃ�
                this.x = 370;
                this.scaleX = -1;
            }
            this.y += this.speed;
            
            if(game.input.a) { // �����������Ƃ�
             this.frame = 1;
            } else {
             this.frame = 0;
            }
            
            if(this.y < 0){
                this.y = 0;
            } else if(this.y > 370){
                this.y = 370;
            }
        });
        
        game.rootScene.addChild(itemA);
        
        //���[���E�ւс@�����܂Ł�
    
        //���킸����
    
        var kawaz = new Sprite(45, 65);
        kawaz.image = game.assets['kawaz.gif'];
        kawaz.x = 138;
        kawaz.y = 110;
        kawaz.pose = 0;
        
        kawaz.addEventListener('enterframe', function(){
            
            if(this.x > itemA.x) {         //���[�������ɂ���Ƃ�
                this.scaleX = 1;
                this.speed = -2;
            } else if(this.x < itemA.x) {  //���[�����E�ɂ���Ƃ�
                this.scaleX = -1;
                this.speed = 2;
            }
            this.x += this.speed;
            
            if(this.y > itemA.y) {         //���[������ɂ���Ƃ�
                this.speed = -2;
            } else if(this.y < itemA.y) {  //���[�������ɂ���Ƃ�
                this.speed = 2;
            } else if(this.y == itemA.y) {  //���[�������ɂ���Ƃ�
                this.speed = 0;
            }
            this.y += this.speed;
            
            if(game.input.a && this.x > itemA.x) {           //�ւт����ɂ���Ƃ�
                this.scaleX = -1;
                this.speed = 2;
            } else if(game.input.a && this.x < itemA.x) {    //�ւт��E�ɂ���Ƃ�
                this.scaleX = 1;
                this.speed = -2;
            }
            this.x += this.speed;
            
            if(game.input.a && this.y > itemA.y) {          //�ւт���ɂ���Ƃ�
                this.speed = 2;
            } else if(game.input.a && this.y < itemA.y){    //�ւт����ɂ���Ƃ�
                this.speed = -2;
            } else if(game.input.a && this.y == itemA.y){    //�ւт����ɂ���Ƃ�
                this.speed = 0;
            }
            this.y += this.speed;
            
        });
        
        game.rootScene.addChild(kawaz);
        
        //���킸����@�����܂Ł�
        
        //�́[�Ɓ�
        
        var itemBNum = 5;
        for (i = 0; i < itemBNum; i++) {
           var itemB = new Sprite(30, 30);
           itemB.x = Math.floor(Math.random() * game.width);
           itemB.y = Math.floor(Math.random() * game.height);
           itemB.image = game.assets['itemB.png']
           itemB.pose = 0;
           
           itemB.addEventListener('enterframe', function(){
           
           if (game.frame % 15 == 0) {
               this.pose++;
               this.pose %= 2;
               this.frame = this.pose + 1;
           }
           
           });
        
        game.rootScene.addChild(itemB);
        
           
       }
        //�́[�Ɓ@�����܂Ł�
        
    }
    
    game.start();
}