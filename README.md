## 个人仓库源代码

1. git clone -b gh-pages https://github.com/licongwen/licongwen.github.io.git

2. 运行hexo s 报错：WARING：No layot ：index.html;原因：缺少hexo主题模板，主题文件在根目录的theme文件夹下，解决方法：
```js
cd your-hexo-site
git clone https://github.com/iissnan/hexo-theme-next themes/next
```