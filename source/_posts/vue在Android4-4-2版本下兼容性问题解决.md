---
title: vue在Android4.4.2版本下兼容性问题解决
date: 2018-02-05 10:37:40
tags: vue
---
今天在老大让我用H builder将vue项目打包成Android App的时候遇到一个问题，打包后的APK安装在安卓模拟器后不能与API交互。下面来说一下解决的方法。
<!--more-->
因为vue2.0项目与后台做交互时用的是axios，而axios又是以来与promise，安卓模拟器的版本为4.4.2，对promise的兼容性并不好，所以我们需要手动安装babel-ployfill和es6-promise这两个库来解决兼容性问题。具体操作方法如下：
* 先npm 安装这两个包(建议使用cnpm安装)
```javascript
cnpm install babel-polyfill --save -dev
cnpm install es6-promise --save -dev
```
* 配置WebPack.base.conf.js的入口文件
```javascript
entry: {
  app: ["babel-polyfill",'./src/main.js']
}
```


* 设置好之后，npm run build,打包好后，将dist文件下的文件放入H builder中打包成app，就可以放心使用axios了。