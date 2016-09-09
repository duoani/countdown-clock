/**
 * Created by duo on 2016/9/9.
 */

function Template(str) {
    var me = this,
        i = 0,
        body = "__p+='";

    str.replace(Template._matcher, function (matchText, subText, index, s) {
        body += str.slice(i, s).replace(Template._escapeRegExp, Template._escapeChar);
        i = s + matchText.length;
        if(subText){
            body += "'+\n((__t=(" + subText + "))==null?'':__t)+\n'"
        }else if(index){
            body += "';\n" + index + "\n__p+='";
        }
        return matchText;
    });
    body += "';\n";
    body = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + body + "return __p;\n";
    try {
        var fn = new Function("data", body);
        this._templateFunction = function (data) {
            return fn.call(me, data);
        };
    } catch (e) {
        e.source = body;
        throw e;
    }
}
Template.prototype.render = function (data) {
    return this._templateFunction(data);
};
Template._matcher = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g;
Template._escapes = {
    "'": "'",
    "\\": "\\",
    "\r": "r",
    "\n": "n",
    "\u2028": "u2028",
    "\u2029": "u2029"
};
Template._escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
Template._escapeChar = function (char) {
    return "\\" + Template._escapes[char];
};


var clockTpl =  '<div class="clock">' +
    '<div class="mask mask-left"></div>' +
    '<div class="mask mask-right"></div>' +
    '<div class="rotate rotate-left" style="<%= data.leftStyle %>">' +
    '<div class="bg"></div>' +
    '</div>' +
    '<div class="rotate rotate-right" style="<%= data.rightStyle %>">' +
    '<div class="bg"></div>' +
    '</div>' +
    '<div class="seconds"><%= data.seconds %></div>' +
    '</div>';

var tpl = new Template(clockTpl);

var tick = function(current, total){
    return this.rotate(parseInt(current, 10), parseInt(total, 10));
};
var angle = function(current, total){
    var anglePerStep = 360 / total;
    return current * anglePerStep % 360;
};
var rotate = function(remainTime, totalTime){
    var an;
    var data = {};
    data.seconds = remainTime;

    if(!totalTime){
        data.leftStyle = 'display:none;';
        data.rightStyle = 'display:none;';

    }else if(remainTime >= totalTime / 2){
        an = - angle(remainTime, totalTime);
        data.leftStyle = '';
        data.rightStyle = '-webkit-transform:rotate('+an+'deg);transform:rotate('+an+'deg);';

    }else{
        an = 180 - angle(remainTime, totalTime);
        data.leftStyle = '-webkit-transform:rotate('+an+'deg);transform:rotate('+an+'deg);';
        data.rightStyle = 'display:none;';
    }

    return tpl.render(data);
};



var container = document.querySelector(".container");
var current = 0;
var total = 5;
setInterval(function(){
    current -= 1;
    if(current < 0){
        current = total;
    }
    container.innerHTML = tick(current, total);
}, 1000);