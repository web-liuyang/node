const request = require("request");//网络请求
const cheerio = require("cheerio"); //类似于JQ的库
const fs = require("fs"); //文件操作
const iconv = require("iconv-lite");  //编码转换
const express = require('express');//导入express框架
const app = express(); //创建express实例
const path = 3000; //端口号
//  访问/get自动下载图片
app.get("/get", (req, res) => {
    var imgList = [];
    request({
        url: "http://www.netbian.com",
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36' },
        encoding:null
    }, (a, b, body) => {
        body = iconv.decode(body, 'gbk'); //转码
        var $ = cheerio.load(body); //获取html网页并使用类似于JQ写法的库
        var imgs = $(".slide ul li img") //获取图片标签
        // 遍历图片标签拿到url与title并push到事先准备的数组里面
        imgs.each((index, item) => {
            imgList.push({ url: $(item).attr("src"), title: $(item).attr("alt") })
        })
        // 循环下载图片到指定文件夹
        $(imgList).each((index,item)=>{
            request(item).pipe(fs.createWriteStream('./image/'+ item.title + '.png'))
        })
        // console.log(imgList) 打印图片信息
    })
})

// 访问静态页面
app.use(express.static("public")).listen(3001);
// 监听请求
app.listen(path,data => console.log("开启服务器"+ path))



/* functionhtmlDecode(str){
    var t = $("");
    t.html(str); returnt.text();
}
var $ = cheerio.load(sres.text);
var ans = [];
$('.titlelnk').each(function (index, item) {
    var $item = $(item);
    ans.push(htmlDecode($item.html()));
}); */

