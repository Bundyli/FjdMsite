/**
 * Created by Administrator on 2018/2/20.
 */
window.onload = function () {
    // 左侧滑动
    // leftSwipe();
    iscrollLeft();
    // 右侧滑动
    rightSwipe();
}

var leftSwipe = function () {
    // 上下滑动 touch事件 位移
    var parentBox = document.querySelector('.cate_left');
    var childBox = parentBox.querySelector('ul');

    var starty =0;
    var distancey =0;
    // 程序的核心点
    var currenty =0;

    childBox.addEventListener('touchstart',function (e) {
        starty = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove',function (e) {
        var movey= e.touches[0].clientY;
        distancey = movey-starty;
        // 将要定位的位移
        var translatey = currenty + distancey;
        childBox.style.transform = 'translateY('+translatey+'px)';
        childBox.style.webkitTransform = 'translateY('+translatey+'px)';
    });

    childBox.addEventListener('touchend',function (e) {
        // 滑动完成之后，记录位置
        currenty = currenty + distancey;
    });

}

var iscrollLeft = function () {
   // 使用iscroll
    new IScroll(document.querySelector('.cate_left'));
}
var rightSwipe = function () {
    // 使用iscroll
    new IScroll(document.querySelector('.cate_right'));
    // 同参数配置实现左右滑动
    // 在谷歌的模拟器上失效
    // scrollX: true;
    // scrollY: false;

}