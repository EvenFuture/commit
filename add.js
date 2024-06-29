const fs = require('fs');

// 日期格式化函数
function formatDate(date, format) {
    const o = {
        "M+": date.getMonth() + 1, //month 
        "d+": date.getDate(), //day 
        "h+": date.getHours(), //hour 
        "m+": date.getMinutes(), //minute 
        "s+": date.getSeconds(), //second 
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter 
        "S": date.getMilliseconds() //millisecond 
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

// 生成随机字符串函数
function generateRandomString() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        if (i < 3) result += '-';
    }
    return result;
}

// 获取当前时间并格式化
const now = new Date();
const formattedTime = formatDate(now, "yyyy年MM月dd日 hh:mm:ss");

// 生成随机字符串
const randomString = generateRandomString();

// 写入文件
fs.appendFileSync('records.txt', `${formattedTime}\n${randomString}\n\n`);

