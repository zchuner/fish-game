function Coin(type){
    this.x = 0;
    this.y = 0;
    this.cur = 0;
    this.type = type;
    this.move();
    this.playSong();
}
Coin.prototype.draw = function (gd) {
    switch(this.type){
        case 1:
        case 2:
        case 3:
            gd.save();
            gd.translate(this.x,this.y);
            gd.drawImage(JSON['coinAni1'],
                0,this.cur*60,60,60,
                -30,-30,60,60
            );
            gd.restore();

            break;
        case 4:
        case 5:    
            gd.save();
            gd.translate(this.x,this.y);
            gd.drawImage(JSON['coinAni2'],
                0,this.cur*60,60,60,
                -30,-30,60,60
            );
            gd.restore();

            break;
            
    }
};
Coin.prototype.move = function () {
    var _this = this;
    setInterval(function(){
        _this.cur+=1;
        if(_this.cur==10){
            _this.cur = 0;
        }
    },30);
    //运动速度
    setInterval(function(){
        _this.x +=(0-_this.x)/10;
        _this.y +=(660-_this.y)/10;
        // _this.x = _this.x + 0 - _this.x -> _this.x = 0
    },30);

};
Coin.prototype.playSong = function(){
    var oA = new Audio();
    oA.src = 'snd/coin.wav';
    oA.play();
};