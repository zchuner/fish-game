var FISH_SIZE=[
    null,
    {w: 55, h: 37, collR: 17},
    {w: 78, h: 64, collR: 24},
    {w: 72, h: 56, collR: 20},
    {w: 77, h: 59, collR: 22},
    {w: 107, h: 122, collR: 29}
];

function DieFish(type) {
    this.x = 0;
    this.y = 0;
    this.type = type;
    this.rotate = 0;
    this.cur = 0;
    this.move();
}
DieFish.prototype.draw = function(gd){
    var w = FISH_SIZE[this.type].w;
    var h = FISH_SIZE[this.type].h;
    gd.save();
    gd.beginPath();
    gd.translate(this.x,this.y);
    gd.rotate(d2a(this.rotate));
    gd.drawImage(JSON['fish'+this.type],
        0,(this.cur+4)*h,w,h,
        -w/2,-h/2,w,h
    );
    gd.restore();
};
DieFish.prototype.move = function(){
    var _this = this;
    //画尾巴
    setInterval(function(){
        _this.cur+=1;
        if(_this.cur==4){
            _this.cur = 0;
        }
    },200);

};
