// 随机
function random(m,n){

    var num = Math.round(Math.random() * (m - n) + n);
    return num;
}

// 切片
function ArrSlice(item,len){
    var Slice = item.slice(0, len);
    return Slice;
}

module.exports={
    random: random,
    ArrSlice: ArrSlice
}