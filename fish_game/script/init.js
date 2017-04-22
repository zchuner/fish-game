document.addEventListener('DOMContentLoaded',function(){
    var oC = document.querySelector('#c1');
    var gd = oC.getContext('2d');
    var out = 50;//范围
    var rule = 0.05;
    var direction = [-out,out];
    loadImage(resource,function(){
        //创建炮
        var c1 = new Cannon(5);
        //存放炮弹
        var arrBullet = [];
        var arrFish = [];
        var arrDieFish = [];
        var arrWeb = [];
        //放金币
        var arrCoin = [];
        setInterval(function () {
            gd.clearRect(0,0,oC.width,oC.height);
            //画炮台
            gd.drawImage(JSON['bottom'],
                0,0,765,70,
                0,532,765,70
            );

            //画炮
            c1.draw(gd);
            //画子弹
            for(var i = 0;i<arrBullet.length;i++){
                arrBullet[i].draw(gd);
            }
            //子弹优化
            for(var i = 0;i<arrBullet.length;i++){
                if(arrBullet[i].x<-out||arrBullet.x>oC.width+out||arrBullet[i].y<-out||arrBullet.y>oC.height+out){
                    arrBullet.splice(i,1);
                    i--;
                }
            }

            //生成鱼
            if(Math.random()<rule){
                direction.sort(function(){
                    return Math.random() - 0.5;
                });
                //从左边
                if(direction[0]<0){
                    var f1 = new Fish(rnd(1,6));
                    f1.x = -out;
                    f1.y = rnd(out,oC.height - out);
                    f1.rotate = rnd(-45,45);
                    arrFish.push(f1);
                }else{
                    var f1 = new Fish(rnd(1,6));
                    f1.x = oC.width+out;
                    f1.y = rnd(out,oC.height - out);
                    f1.rotate = rnd(135,225);
                    arrFish.push(f1);
                }
            }
            //画鱼
            for(var i = 0;i<arrFish.length;i++){
                arrFish[i].draw(gd);
            }
            //鱼性能优化
            for(var i = 0;i<arrFish.length;i++){
                if(arrFish[i].x<-out||arrFish.x>oC.width+out||arrFish[i].y<-out||arrFish.y>oC.height+out){
                    arrFish.splice(i,1);
                    i--;
                }
            }
            //画金币
            for(var i = 0;i<arrCoin.length;i++){
                arrCoin[i].draw(gd);
            }
            //画死鱼
            for(var i = 0;i<arrDieFish.length;i++){
                arrDieFish[i].draw(gd);
            }
            for(var i = 0;i<arrWeb.length;i++){
                arrWeb[i].draw(gd);
                if(arrWeb[i].scale>1.2){
                    arrWeb.splice(i,1);
                    i--;
                }
            }

            //碰撞检测
            for(var i = 0;i<arrFish.length;i++){
                for(var j = 0;j<arrBullet.length;j++){
                    console.log(arrFish[i].isIn(arrBullet[j].x,arrBullet[j].y));
                    if(arrFish[i].isIn(arrBullet[j].x,arrBullet[j].y)){
                        var x = arrFish[i].x;
                        var y = arrFish[i].y;
                        var type = arrFish[i].type;

                        //鱼死
                        arrFish.splice(i,1);
                        i--;
                        //子弹也死
                        arrBullet.splice(j,1);
                        j--;
                        //生成金币
                        var coin = new Coin(type);
                        coin.x = x;
                        coin.y = y;
                        arrCoin.push(coin);
                        //生成死鱼
                        var dieFish = new DieFish(type);
                        dieFish.x = x;
                        dieFish.y = y;
                        arrDieFish.push(dieFish);
                        setTimeout(function(){
                            arrDieFish.shift();
                        },300);
                        //生渔网
                        var web = new Web(type);
                        web.x = x;
                        web.y = y;
                        arrWeb.push(web);
                    }
                }
            }



        },16);
        //点击改变方向
        oC.onclick = function(ev){
            var x = ev.clientX -oC.offsetLeft - oC.offsetWidth/2;
            var y = oC.offsetHeight - (ev.clientY - oC.offsetTop);
            var d = 90-a2d(Math.atan2(y,x));
            c1.rotate = d;
            //后坐力
            c1.emitChange();
            var oA = new Audio();
            oA.src = 'snd/cannon.mp3';
            oA.play();
            //创建炮弹
            var bullet = new Bullet(c1.type);
            bullet.x = c1.x;
            bullet.y = c1.y;
            bullet.rotate = c1.rotate;
            arrBullet.push(bullet);
        };
    });
},false);
