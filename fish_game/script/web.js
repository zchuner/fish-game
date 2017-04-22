function Web(type){
    this.x = 0;
    this.y = 0;
    this.type = type;
    this.scale = 1;
    this.move();
}
Web.prototype.draw = function (gd) {
    gd.save();
    gd.beginPath();
    gd.translate(this.x,this.y);
    gd.scale(this.scale,this.scale);
    gd.drawImage(JSON['web'],
        0,0,220,220,
        -110,-110,220,220
    );
    gd.restore();
};
Web.prototype.move = function(){
    var _this = this;
    setInterval(function(){
        _this.scale += 0.01;
    },30);
};
