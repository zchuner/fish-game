/**
 * Created by leolau on 2017/1/19.
 */
var JSON = {};
function loadImage(arr,fnSucc){
    var count = 0;
    for(var i = 0;i<arr.length;i++){
        var oImg = new Image();
        (function(index){
            oImg.onload = function () {
                JSON[arr[index]] = this;//???????
                count++;
                if(count==arr.length){
                    fnSucc&&fnSucc();
                }
            };
        })(i);

        oImg.src = 'img/'+arr[i]+'.png';
    }
}
function d2a(n){return n*Math.PI/180;}
function a2d(n){return n*180/Math.PI;}
function rnd(m,n){
    return Math.floor(m+Math.random()*(n-m));
}
