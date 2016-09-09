/**
 * Created by duo on 2016/9/9.
 */
var clock = document.querySelector(".count-down");
var countDown = new CountDown(clock);

function CountDown(element){
    this.container = element;
    this.rotateLeft = element.querySelector(".left");
    this.rotateRight = element.querySelector(".right");
    console.log(this)

    this.rotateRight.style.display = "none";

    this.an = 0;
    var me = this;
    setInterval(function(){
        var angle = me.angle();
        console.log(angle)
        me.rotate(me.rotateLeft, me.rotateRight, angle)
    }, 1000);
}
CountDown.prototype.angle = function(){
    this.an = (this.an + 360 / 60) % 360;
    return this.an;
};
CountDown.prototype.rotate = function(l, r, angle){
    l.style.MozTransform = l.style.WebkitTransform = l.style.transform = 'rotate('+angle+'deg)';
};
