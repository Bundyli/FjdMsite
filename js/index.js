/**
 * Created by Administrator on 2018/2/13.
 */
window.onload = function () {
    // 初始化页面的功能
    // 搜索
    search();
    // 轮播图
    banner();
    // 倒计时
    downTime();
}

var search = function () {
    /* 1.页面初始化的时候，距离顶部是0的时候，透明度是0；
     2.当页面滚动的时候，随着页面距离顶部的距离变大，透明度变大；
     3.当滚动的距离超过了轮播图的距离的时候，透明度保持变；*/

    // 获取dom元素
    var search = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    // 距离范围
    var height = banner.offsetHeight;
    // console.log(height+'--height');
    // 监听页面滚动的事件
    window.onscroll = function () {
        var opacity = 0;
        // 当前页面滚动的距离
        // var top = document.body.scrollTop;
        var top = document.documentElement.scrollTop;
        // console.log(top+'--top');

        if (top > height){
          opacity = 0.85;
        }else {
          opacity = 0.85*(top/height);
        }
        // 设置颜色给搜索盒子
        search.style.background = 'rgba(216,80,92,'+opacity+')';
        // console.log(search.style.background);
    }
}

var banner = function () {
   /* 1.无缝轮播滚动和无缝滑动（定时器 过渡 位移）
    2.点盒子对应改变（改变当前的样式）
    3.可以滑动（touch事件 监听触摸点坐标改变距离 改变位移）
    4.当滑动距离不够的时候 吸附回去（过渡 位移）
    5.当滑动距离够的时候 跳转上一张还是下一张（判断方向 过渡 位移）
    */
    // 获取需要操作的dom元素
    var banner = document.querySelector('.jd_banner');
    var imageBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');
    var width = banner.offsetWidth;

    // 提几个公共的方法
    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    }
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX('+translateX+'px)';
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';
    }


    // 1.无缝轮播滚动和无缝滑动（定时器 过渡 位移）
    var index = 1;
    var timer = setInterval(function () {
        index ++;
        // 过渡
        addTransition();
        // 位移
        setTranslateX(-index*width);
    }, 3000);

    // 如何监听过渡结束这个时间点 过渡结束事件
        imageBox.addEventListener('transitionend', function () {
            // 无缝滚动
            if(index >= 4) {
                // 瞬间定位到第一张
                index = 1;
                // 清除过渡
                removeTransition();
                // 定位
                setTranslateX(index);
            }else if(index <= 0) {
                // 瞬间定位到第3张
                index = 3;
                removeTransition();
                setTranslateX(index);
            }
            // index的取值范围 1-3 对应的点 0-2
            setPoint();
        });

    // 2.点盒子对应改变（改变当前的样式）
    var setPoint = function () {
       // 去除多有的now的样式
        for(var i =0; i<points.length; i++){
            points[i].classList.remove('now');
        }
        // 给对应的加上对应的样式
        points[index-1].classList.add('now');
    }


    // 记录开始的位置
    var startx = 0;
    // 记录坐标轴的改变
    var distancex =0;
    // 为了严谨判断
    var isMove = false;
    // 3.可以滑动（touch事件 监听触摸点坐标改变距离 改变位移）
    imageBox.addEventListener('touchstart',function (e) {
        clearInterval(timer);
        startx = e.touches[0].clientX;
    });
    
    imageBox.addEventListener('touchmove',function (e) {
        var movex = e.touches[0].clientX;
        distancex = movex - startx;
        // 当distancex >0 则向右滑动，否则向左滑动
        // 滑动，基于当前的位置去滑动
        // 计算将要去做定位
        var translateX = -index*width + distancex;
        // 清除过渡
        removeTransition();
        // 定位
        setTranslateX(translateX);
        isMove = true;
    });
    
    imageBox.addEventListener('touchend',function (e) {
        // 滑动事件结束之后，判断当前滑动的距离，若>1/3是切换图片，反之则定位回去
        if(isMove){
          if(Math.abs(distancex) < width*1/3) {
              // 4.当滑动距离不够的时候 吸附回去（过渡 位移）
              //   过渡
              addTransition();
              // 位移
              setTranslateX(-index*width);
          }else {
              // 5.当滑动距离够的时候 跳转上一张还是下一张（判断方向 过渡 位移）
                if(distancex > 0){
                    index --;
                }else {
                    index ++;
                }
              addTransition();
              setTranslateX(-index*width);
          }
        }

        // 加定时器
        // 严谨，保证只加一次
        clearInterval(timer);
        timer = setInterval(function () {
            index ++;
            addTransition();
            setTranslateX(-index*width);
        }, 3000);

        // 重置参数
        startx =0;
        distancex =0;
        isMove = false;
    });
}

var downTime = function () {
   /* 1.模拟倒计时的时间 11个小时
    2.利用定时器 1s1次 重新展示时间
    */
    var time = 60*60*11;
    var skTime = document.querySelector('.sk_time');
    var spans = skTime.querySelectorAll('span');
    var timer = setInterval(function () {
        time --;
        // 格式化时间
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;
        // 设置时间
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
        if (time<=0){
            clearInterval(timer);
        }
    },1000);
}