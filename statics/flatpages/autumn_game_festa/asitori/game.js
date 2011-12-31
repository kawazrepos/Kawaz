enchant();

window.onload = function() {
  var game = new Game(400, 320);//��ʂ̃T�C�Y�ݒ�
  game.fps =30;//��ʂ̂P�b�Ԃ̃R�}��
  game.preload('kawaz.gif','itemA.png','itemB.png','back.png','gigi1.gif','gigi2.png');//�摜�̓ǂݍ���
  game.keybind(90, 'a'); //z
  game.score = 0;
  var timer = new Timer(30); //1�b��30�t���[��
  timer.play();

  game.addEventListener('enterframe', function(){
    timer.tick();
    if(timer.isOver()){
      // console.log("owata");
    }
  });

  game.onload = function() {

    var back = new Sprite(400,320);     //�w�i�́ugame.rootScene.backgroundColor = 'rgb(��, ��, ��)';�v�ł���
    back.image = game.assets['back.png'];
    back.x = 0;
    back.y = 0;

    game.rootScene.addChild(back);


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

      if(this.y <= 0 ) {
        this.y == game.height;
      }
      if(this.y + this.height > game.height) {
        this.y = game.height - this.height;
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
    var isFull = false; // �����t���O�@�́@�����ĂȂ�
    var eatTime = 0; // �H�ׂ͂��߂�����

    kawaz.addEventListener('enterframe', function(){

      if(!isFull){
        // �H�ׂĂȂ��Ƃ�
        if(!game.input.a) {                //���[����
          if(this.x > itemA.x) {         //���ɂ���Ƃ�
            this.scaleX = 1;
            this.speed = -2;
          } else if(this.x < itemA.x) {  //�E�ɂ���Ƃ�
            this.scaleX = -1;
            this.speed = 2;
          }
          this.x += this.speed;

          if(this.y+32 > itemA.y+30) {         //��ɂ���Ƃ�
            this.speed = -2;
          } else if(this.y+32 < itemA.y) {  //���ɂ���Ƃ�
            this.speed = 2;
          } else if(itemA.y < this.y+32 < itemA.y+30) { //���ɂ���Ƃ�
            this.speed = 0;
          }
          this.y += this.speed;
        } else if(game.input.a) {          //�ւт�

          if(this.x > itemA.x) {         //���ɂ���Ƃ�
            this.scaleX = -1;
            this.speed = 5;
          } else if(this.x < itemA.x) {  //�E�ɂ���Ƃ�
            this.scaleX = 1;
            this.speed = -5;
          }
          this.x += this.speed;

          if(this.y+32 > itemA.y+30) {         //��ɂ���Ƃ�
            this.speed = 5;
          } else if(this.y+32 < itemA.y){   //���ɂ���Ƃ�
            this.speed = -5;
          } else if(itemA.y < this.y+32 < itemA.y+30){  //���ɂ���Ƃ�
            this.speed = 0;
          }
          this.y += this.speed;
        }
        if(this.intersect(itemA)) { //���[���ƂԂ������Ƃ�
          this.speed = 0;         //�~�܂�
          isFull = true;          //�����t���O������
          eatTime = game.frame;   //�H�׎n�߂����Ԃ����Ȃ̂��L�^�ieatTime�Ɍ��݂�game.frame�����j
        }
      } else {
        //�@�H�ׂĂ�Ƃ�
        if(game.frame > eatTime + 90){ //�S�̂̎��Ԃ��A�H�׎n�߂�����+90�t���[���i3�b�j�ɂȂ����Ƃ�
          isFull = false;            //�����t���O���Ȃ��Ȃ�
        }
      }


      //��ʂ���͂ݏo�Ȃ��悤�Ɂ�
      if(this.x <= 0 ) {
        this.x = 0;
      }
      if(this.x + this.width > game.width){
        this.x = game.width - this.width;
      }
      if(this.y <= 0 ) {
        this.y = 0;
      }
      if(this.y + this.height > game.height) {
        this.y = game.height - this.height;
      }
      //�݂͂��������܂Ł�


      //�A�j���[�V������

      if (!isFull && game.frame % 4 == 0) {
        this.pose++;
        this.pose %= 4;
        this.frame = this.pose + 1;
      }else if (isFull) {
        this.frame = 0;
      }

      //�A�j�������܂Ł�


    });

    game.rootScene.addChild(kawaz);

    //���킸����@�����܂Ł�

    //�����˂���

    var gigi = new Sprite(50, 50);
    gigi.image = game.assets['gigi1.gif'];
    initialX = [-50, 450][Math.floor(Math.random() * 2)]; // -50��450�������_���ŕԂ�
    gigi.x = initialX;
    gigi.y = Math.floor(Math.random() * game.height-50);
    gigi.speed = 0;
    gigi.pose = 0;
    var moe = false; // �G���t���O�͗����ĂȂ�
    var moeTime = 0;
    var appearTime = Math.floor(Math.random() * 120); // �o�����Ԃ�����������

    gigi.addEventListener('enterframe', function(){
      if(game.frame >= appearTime) {  // game.frame���o�����Ԉȏ�ɂȂ�����
        if(!moe){
          if(this.x == -50) {
            this.scaleX = -1;
            this.speed = 8;
          } else if (this.x == 450) {
            this.scaleX = 1;
            this.speed = -8;
          }

          this.x += this.speed;
          if (game.frame % 3 == 0) {     //���ɂ߁[�����
            this.pose++;
            this.pose %= 2;
            this.frame = this.pose + 1;
          }
          if(this.x < -50 || this.x > 450) {
            appearTime = game.frame + Math.floor(Math.random() * 120); // �o�����Ԃ�ς���B���̎��Ԃ���1���ȓ��̂ǂ����ɂ���B
            this.x = initialX;
          }

          if(this.intersect(kawaz)) { //���킸����ƂԂ������Ƃ�
            this.speed = 0;         //�~�܂�
            moe = true;          //�G���t���O������
            moeTime = game.frame;   //�Ԃ��������Ԃ����Ȃ̂��L�^�imoeTime�Ɍ��݂�game.frame�����j

            var neko = new Sprite(210, 280);       //�����˂���\��
            neko.image = game.assets['gigi2.png'];
            neko.x = 100;
            neko.y = 10;
            neko.opacity = 1;     //�����x100��
            game.rootScene.addChild(neko);

            neko.addEventListener('enterframe', function(){
              if(game.frame<moeTime + 40) {
                this.opacity = 1 - (game.frame - moeTime) * 0.025;  //�����x��ς���3�b�ԂŃt�F�[�h�C���A�t�F�[�h�A�E�g
              } else if(moeTime + 40 < game.frame < moeTime + 50) {
                this.opacity = 0;
              } else if(moeTime + 50 < game.frame){
                this.opacity = 0 + (game.frame - moeTime + 50) * 0.025;
              }
              //�^�C�}�[�~�߂�
            });
          }
        } else {
          //  �G���Ă�Ƃ�
          if(game.frame > moeTime + 90){         //�S�̂̎��Ԃ��A�G���n�߂�����+90�t���[���i3�b�j�ɂȂ����Ƃ�
            game.rootScene.removeChild(neko);  //�����˂���\���i�t�F�[�h�A�E�g���������j
            moe = false;                       //�G���t���O���Ȃ��Ȃ�
            appearTime = game.frame + Math.floor(Math.random() * 120); // �o�����Ԃ�ς���B���̎��Ԃ���1���ȓ��̂ǂ����ɂ���B
            gigi.x = initialX;

            var itemBNum =10;                  //�V���Ƀn�[�g����������o��
            for (i = 0; i < itemBNum; i++) {
              var itemB = new Sprite(30, 30);
              itemB.x = Math.random() * 370;
              itemB.y = Math.random() * 290;
              itemB.image = game.assets['itemB.png']
              itemB.pose = 0;

              itemB.addEventListener('enterframe', function(){

                if (game.frame % 15 == 0) {     //���ɂ߁[�����
                  this.pose++;
                  this.pose %= 2;
                  this.frame = this.pose + 1;
                }
              })
            }

            //�^�C�}�[�ĊJ
          }
        }

      }
    });
    game.rootScene.addChild(gigi);

    //�����˂������܂Ł�

    //�́[�Ɓ�

    var itemBNum = 6;
    for (i = 0; i < itemBNum; i++) {
      var itemB = new Sprite(30, 30);
      itemB.x = Math.random() * 370;
      itemB.y = Math.random() * 290;
      itemB.image = game.assets['itemB.png']
      itemB.pose = 0;

      itemB.addEventListener('enterframe', function(){

    /*�@��

    Math.floor �� �����_�ȉ��؂�̂�
    Math.random() �� �O�ȏ�P�����̐��������_���ŏo��
    * game.width �� �Q�[����ʂ̕���������

*/

        if(this.intersect(kawaz)){       //�X�R�A
          game.score += 10;
          this.x = Math.random() * 370;
          this.y = Math.random() * 290;
          console.log(game.score);
        }

        if (game.frame % 15 == 0) {     //���ɂ߁[�����
          this.pose++;
          this.pose %= 2;
          this.frame = this.pose + 1;
        }

      });

      game.rootScene.addChild(itemB);


    }
    //�́[�Ɓ@�����܂Ł�
    //�X�R�A��

    var score = new Label();
    score.font = "12px 'Arial Black'";                      
    score.addEventListener('enterframe', function() {
      this.text = "Score : " + game.score;
    });

    game.rootScene.addChild(score);

    //�X�R�A�����܂Ł�
	
    /*�^�C�}�[��
	
	var time_label = new Label();
        time_label.x = time_label.y = 15;
        time_label._element.style.zIndex = 128;
		
        time_label.addEventListener(enchant.Event.ENTER_FRAME, function(){
            var progress = parseInt(game.frame/game.fps);          //�o�ߎ��Ԃ̎擾
            time = LIMIT_TIME - parseInt(game.frame/game.fps)+"";
            this.text = "���~�b�g : " + time;
            // �^�C����0�ȉ��ɂȂ�����Q�[���I�[�o�[�V�[���Ɉڍs����
            //if (time <= 0) { changeToGameOverScene(); }
        });
        game.rootScene.addChild(time_label);

    �^�C�}�[�����܂Ł�*/

	

  }
  game.start();
}
