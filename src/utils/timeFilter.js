import Vue from "vue";
//将毫秒数转化为分秒形式
//使用如：   <td>{{ item.duration|timeFormat }}</td>
Vue.filter('timeFormat', function(duration) {
    let min = parseInt(duration/1000/60)
    if(min<10){
        min = '0'+ min
    }
    let sec = parseInt((duration/1000)%60)
    if(sec<10){
        sec = '0'+ sec
    }
    return `${min}:${sec}`
})