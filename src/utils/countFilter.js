import Vue from "vue";
//将毫秒数转化为分秒形式
//使用如：   <td>{{ item.duration|timeFormat }}</td>
Vue.filter('playCountFormat', function(playCount) {
    if (playCount > 100000){
        playCount = parseInt(playCount / 10000) + '万'
    }
    return `${playCount}`
})