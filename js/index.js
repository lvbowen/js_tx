// JavaScript Document

/*封装运动框架 start*/
function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];        //IE678
	}
	else
	{
		return getComputedStyle(obj, false)[name];    //其他浏览器
	}
}
// 运动数据为json
function startMove(obj, json, fnEnd)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//假设：所有值都已经到了
		for(var attr in json){
			var cur=0;
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}else{
				cur=parseInt(getStyle(obj, attr));
			}

			var speed=(json[attr]-cur)/10;                //缓冲运动
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			//有一个值不等于目标点，没有运动完。
			if(cur!=json[attr])
				bStop=false;//假设不成立

			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
		}
		// 运动到达目标值执行
		if(bStop){
			clearInterval(obj.timer);
			if(fnEnd)fnEnd();
		}
	}, 30);
}
/*封装运动框架 end*/

//活动公告滑动门
function setTab(name,curl,n){
	 for(i=1; i<=n; i++){
		 var  menu=document.getElementById(name+i);
		 var submenu=document.getElementById("con_"+name+"_"+i);
		 menu.className=(i===curl)?'hoveron':'';
		 submenu.style.display=(i===curl)?'block':"none";
		 }
	}

//表单验证
function checkForm(){
	var user=document.getElementById("user").value;
	var usererr=document.getElementById("usererr");
	var ucue=document.getElementById("usererr-text");
	var password=document.getElementById("password").value;
	var pwerr=document.getElementById("pwerr");
	var pcue=document.getElementById("pwerr-text");
	if(user==""){
		usererr.style.visibility="visible";
		ucue.innerHTML="请输入用户名";
		return false
		}else if (!isNaN(user)|| user.length<6|| user.length>12){
		    usererr.style.visibility="visible";
		    ucue.innerHTML="不能为数字且为6-12位";
			//user=""
			//user.focus()
			 return false
					}else{
					      usererr.style.visibility="";
		                  return false
						}
	if(password==""){
		pwerr.style.visibility="visible";
		pcue.innerHTML="密码不能为空";
		return false
		}
	}

window.onload=function(){ a(); b(); c(); d();e(); f(); g(); h(); reTop();};
//下拉菜单
function a(){
	var oUl=document.getElementById('navWapper');
	var oBg=document.getElementById('bg');
	var oLi=oUl.getElementsByTagName('li');
	for(var i=0;i<oLi.length;i++){
		oLi[i].index=i;
		oLi[i].onmouseover=function(){
            var nLeft=100*this.index;
            if(this.getElementsByTagName('p')[0]){
                var oP=this.getElementsByTagName('p')[0];
                var oA=oP.getElementsByTagName('a');
                var pHei=0;
                for(var j=0;j<oA.length;j++){
                    pHei+=oA[j].offsetHeight;
                }
            }
			startMove(oBg,{left:nLeft});
			startMove(oP,{height:pHei})
		};
		oLi[i].onmouseout=function(){
			if(this.getElementsByTagName('p')[0]){
				var oP=this.getElementsByTagName('p')[0];
			}
			startMove(oBg,{left:0});
			startMove(oP,{height:0})
		};
	}
}

//换肤效果
 function b(){
	 var oBtns=document.getElementById("wapperskin");
	 var aBtn=oBtns.getElementsByTagName("a");
	 var oCss=document.getElementById("skin");
	 var len=aBtn.length;
	 for(i=0;i<len;i++){
		 aBtn[i].onclick=function(){
			 changeSkin(this.title)
			 }
		 }
	  function changeSkin(color){
		  oCss.href="style/"+color+".css" ;
		  }
    }

//焦点图轮播
function c(){
	var oCon=document.getElementById('container');
	var oList=document.getElementById('list');
	var oBtn=document.getElementById('buttons');
	var oPrev=document.getElementById('prev');
	var oNext=document.getElementById('next');
	var oImg=oList.getElementsByTagName('img');
	var oSpan=oBtn.getElementsByTagName('span');
	var timer=null;

	/*function startMove(obj,iTarget){
		var alpha=0;                    //这个变量不能放在外面做全局变量
		clearInterval(timer);
		timer=setInterval(function(){
			if(alpha==iTarget){
				clearInterval(timer);
			}else{
				alpha+=2;
				obj.style.filter='alpha(opacity:'+alpha+')';
				obj.style.opacity=alpha/100;
			}
		},30)
	}*/

	function tab(){                             //封装公共代码
		for(var j=0; j<oImg.length;j++){
			oImg[j].style.display='none';
			oSpan[j].className='';
		}
		oImg[now].style.cssText='display:block;filter:alpha(opacity:0);opacity:0;';
		oSpan[now].className="on";
		startMove(oImg[now],{opacity:100})
	}

	for(var i=0; i<oSpan.length;i++) {
		oSpan[i].index=i;                    //功能等同于在标签中自定义index属性
		var now=0;
		oSpan[i].onmouseover = function () {
			now=this.index;  //等同于 index=this.getAttribute('index')，将圆形按钮和左右箭头关联起来
			tab()
		};

		oNext.onclick=function(){
			now++;
			if(now==oImg.length){
				now=0;
			}
			tab()
		};

		oPrev.onclick=function(){
			now--;
			if(now==-1){
				now=oImg.length-1;
			}
			tab()
		}
	}

	var t=setInterval(oNext.onclick,3000);
	oCon.onmouseover=function(){
		clearInterval(t)
	};
	oCon.onmouseout=function(){
		t=setInterval(oNext.onclick,3000);       //t不能掉
	};
}

//伸缩课程菜单
function d(){
	var dl=document.getElementById("dlwapper").getElementsByTagName("dl") ;
	for(var i=0;i<dl.length ;i++){
		dl[i].onmouseover= function(){
			  for(j=0;j<dl.length ;j++)
				 {
			dl[j].getElementsByTagName("dd")[0].className="";
					 }
			   this.getElementsByTagName("dd")[0].className="courseshow";
			            }
     }
 }

//图片滚动
function e(){
	var btnLt=document.getElementById("btnlt");
	var btnRt=document.getElementById("btnrt");
	var ul=document.getElementById("babyul");
	var li=ul.getElementsByTagName("li");
	var speed=-2;

	ul.innerHTML+=ul.innerHTML;
	var liwidth=li[0].offsetWidth+12;
	ul.style.width=liwidth*li.length+"px" ;
	var timer = setInterval(move,30);

	btnLt.onclick=function(){
		speed=-2
	};
	btnRt.onclick=function(){
		speed=2
	};

	function move(){
		ul.style.left=ul.offsetLeft+speed+'px';
		if( ul.offsetLeft<-Math.floor(ul.offsetWidth/2)){
			ul.style.left="0";
		}
		if( ul.offsetLeft>0){
			ul.style.left=-Math.floor(ul.offsetWidth/2)+"px";
		}
	}

	var picShow=document.getElementById("picshow")
	picShow.onmouseover=function(){ clearInterval(timer);}
	picShow.onmouseout=function(){ timer = setInterval(move,30);}
}

//悬浮的移动盒子
function f(){
	var oAD=document.getElementById("box");
	var x,y,xs,ys;       //x,y是初始坐标   xs，ys 移动坐标
	var x=0 , y=0, xs=10, ys=10;
	var timer;         //使用setInterval 控制时间计时器
	function move(){
		//move促使图片进行运行，改变坐标轴
		var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
		x+=xs;
		y+=ys;
		if(x >= document.documentElement.clientWidth - oAD.offsetWidth || x<=0) {xs=-1*xs}
		if(y >= document.documentElement.clientHeight+scrollTop - oAD.offsetHeight || y<=0) {ys=-1*ys}
		oAD.style.left=x+"px";
		oAD.style.top=y+"px";
		}

	timer = setInterval(move,100);

	  oAD.onmouseover=function(){
		  clearInterval(timer)
		  };

	   oAD.onmouseout=function(){
		   timer = setInterval(move,100)
		  };
    oAD.onclick=function(){
      //  clearInterval(timer);
        oAD.onmouseout=null;
       this.style.display='none';
    }
}

//侧栏广告
function g()
{
	var oAds=document.getElementById('ads');
	var oCloseBtn=document.getElementById('close');
	setTimeout(function() {
		startMove(oAds, {height: 318});
	},5000);
	setTimeout(function() {
		startMove(oAds, {height: 0});
	},10000);
	oCloseBtn.onclick=function(){
		oAds.style.display='none';
	}
}

//图片展示（瀑布流）
 function h() {
	var data = {     //模拟后台数据 的一个JSON格式的文件
		"data":[
			{"src":"4.jpg"},
			{"src":"5.jpg"},
			{"src":"6.jpg"},
			{"src":"7.jpg"},
			{"src":"1.jpg"},
			{"src":"2.jpg"},
			{"src":"3.jpg"},
			{"src":"4.jpg"},
			{"src":"5.jpg"}
		]
	};
	var oBtn = document.getElementById("btn1");
	var oLi = document.getElementById("wrap").getElementsByTagName("li");
	var num=-1;
	oBtn.onclick=function(){
		num++;
		if(num==3){num=0;}

		for(var i=0; i<oLi.length; i++){
			//var img = document.createElement('img');   //创建img元素
			var img=new Image();               //作用同上一行代码
			img.src = 'images/'+data.data[3*num+i].src;      //设置读取路径
			//alert(img.src)
			img.onload=function(){             //图片加载完之后执行
				var div = document.createElement('div');
				div.className = 'con';
				var p = document.createElement('p');
				p.innerHTML = '阅读全文';
				oLi[getSort()].appendChild(div);
				div.appendChild(this);      //注意：this不能写成img
				//alert(img.src)
				div.appendChild(p);
			}
		}
	};

	function getSort(){
		var index=0;
		var iH=oLi[index].offsetHeight;
		for(var i=0;i<oLi.length;i++){
			if(oLi[i].offsetHeight<iH){
				index=i;
				iH=oLi[index].offsetHeight;
			}
		}
		return index;
	}
}

//返回顶部
function reTop(){
	var top=document.getElementById('returnTop');
	var t=null;
	window.onscroll=function(){
		 var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
		top.style.display=(scrollTop>100)?'block':'none';
		top.onclick=function(){
			clearInterval(t);
			t=setInterval(function(){
				window.scrollBy(0,-80);
				if(document.body.scrollTop==0&&document.documentElement.scrollTop==0)
				{clearInterval(t)}
			},30)
		};
	};
}