---
title: css小结
date: 2018-03-01 09:01:44
tags:
---
css基础知识
<!--more-->
### 1.css的选择器有哪些？

**css选择器：** id选择器(#id)，类选择器(.classname),标签选择器(h1,div,p),相邻选择器(h1+p),子选择器(ul>li),后代选择器(div p),通配符选择器(*),属性选择器(p[rel='external']),伪类选择器(a:hover,li:nth-child);

### 2.css优先级算法如何计算

元素选择符：1 class选择符：10 id选择符：100
1.!important 声明的样式优先级最高，如果冲突在进行计算。
2.如果优先级相同，则选择最后出现的样式
3.继承得到的优先级样式最低

### 3.css3有哪些新的特性？

1.RGBA和透明度
2.background-image background-origin background-size background-repeat
3.word-wrap(对长的 不可分割的单词进行换行) word-wrap:break-word
4.文字阴影：text-shadow:10px 10px 5px #FF0000(水平阴影，垂直阴影，模糊距离，阴影颜色)
5.font-face属性：定义自己的字体
6.圆角(边框半径):border-radius
7.边框图片:border-image
8.盒阴影:box-shadow
9.媒体查询：定义两套css，当浏览器的尺寸变化时会采用不同的属性

### 4.纯css创建一个三角形的原理

先设置元素的高度，宽度为0.然后设置边框的样式。
```css
.triangle{
	width:0;
	height:0;
	border-top:40px solid transparent;
	border-left:40px solid transparent;
	border-right:40px solid transparent;
	border-bottom:40px solid red;
}
```

### 5.常见的浏览器兼容性问题

1. 不同浏览器的标签默认的margin盒padding不一样。
2. IE6双边距bug：块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置大。hack：display：inline；将其转化为行内属性。
3. 渐进识别方式，从总体中逐渐排除局部。首先，巧妙的使用“9”这一标记，将IE浏览器从所有情况中分离出来。接着，再次使用“+”将IE8和IE7，IE6分离出来，这样IE8已经独立识别。
```css
 background-color:#f1ee18;/*识别所有*/
 .background-color:#00deff\9;/*IE6,7,8识别*/
 +background-color:#a200ff;/*IE6,7识别*/
 _background-color:#1e0bd1;/*IE6识别*/*/
```

### 4. Chrome中文界面下默认会将小于12px的文本强制按照12px显示，可通过加入css属性-webkit-text-size-adjust：none解决

### 5.position跟display，overflow，float这些特性相互叠加后会怎么样？

display属性规定元素应该生成的框的类型；position属性规定元素的定位类型；float属性时一种布局方式，定义元素在哪个方向浮动。
类似优先级机制；position：absolute/fixed优先级最高，有他们在时，float不起作用，display值需要调整。float或者absolute定位的元素，只能时块元素或表格

### 6. 对BFC(块级格式化上下文)规范的理解
BFC规定了内部的Block Box如何布局。
定位方案：
1.内部的box会在垂直方向上一个接一个放置；
2.box垂直方向的距离由margin决定，属于同一个BFC的两个相邻 box的margin会发生重叠。
3.每个元素的margin box的左边，与包含块border box的左边相接触。
4.BFC的区域不会与float box重叠
5.BFC时页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
6.计算BFC高度时，浮动元素也会参与计算

触发BFC的条件（满足一个即可）
1.根元素，即html
2.float的值不为none
3.overflow的值不为visible
4.display的值为inline-block，table-cell，table-caption
5.position的值为absolute或则fixed

### 7. 怎么让Chrome支持小于12px的字体
```css
p{
 font-size:10px;
 transform:scale(0.8);
 -webkit-transform:scale(0.8);
}
```
