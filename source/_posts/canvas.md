---
title: canvas的一些学习笔记
date: 2016-06-13 13:30:48
tags: canvas 
---
去年的时候学过canvas绘图，但当时没怎么认真学加上时间很久了，现在决定重新学习canvas，并记下学习的笔记。
<!--more-->
-标签:
	```Html<canvas>不支持canvas的浏览器看到的内容</canvas>```
-绘制的环境：
	getContext('2d'): 目前支持的2d场景 
  
-绘制方块
	fillRect(L,T,W,H):绘制填充的方块，默认的颜色是黑色。L,T,W,H分别代表left，top，width，height值。
	strokeRect(L,T,W,H):绘制带边框的方块-默认是一像素的黑色边框
-设置绘图
	fillstyle:填充颜色（绘制canvas是有序的）
	lineWidth：线宽度，是一个数值
	strokeStyle：边框线的颜色
	
-边界的绘制
	lineJoin：正方形连接点样式 -miter（默认）、round（圆角）、bevel（斜角）
	lineCap：端点样式  -butt（默认）、round（圆角）、square（高度多出为宽的一半的值）

-绘图路径
	beginPath()：   开始的绘制路径
	moveTo（x，y）  移动到x，y点 
	lineTo（m，n）	从x,y点到m,n点画线 
	closePath()：   结束绘制路径，起点和终点闭合
	stroke():       画线
	fill()	        填充 
	rect()          绘制方块   
	clearRect(x,y,width,height)：清除画布     
	save()：        保存路径
	restore():      恢复路径 
	
-画圆
	arc（x，y，半径，起始弧度，结束弧度，旋转方向 ）
	-x,y起始位置
	-弧度与角度关系：弧度=角度*Math.PI/180
	-旋转方向：顺时针（默认：false）、逆时针（true）
	 
-变换
	translate(x,y) :-偏移：从起始点为基准点，移动当前坐标的位置
	rotate()：   -旋转：参数为弧度
	scale(x,y):     -缩放： 
-插入图片
	1、等图片加载完，在执行canvas操作
		-图片预加载：在onload中调用方法
	2、drawImage(oImg,x,y,w,h)
		-oImg:当前图片、x,y坐标、w,h宽高
-设置背景
	createPattern(oImg，平铺方式)
	- 平铺方式为：repeat、repeat-x、repeat-y、no-repeat
-渐变
	1、createLinearGradient(x1,y1,x2,y2) 线性渐变
		-x1,y1渐变的起始点坐标、x2,y2渐变的结束点坐标
	2、addColorStop(x,color) 添加渐变点
		-x值0~1、从0值得color渐变到1值的color
	3、createRadioGradient(x1,y1,r1,x2,y2,r2)
		-放射性渐变
		-参数 第一个圆的坐标和半径，第二个圆的坐标和半径
-文本
	1、strokeText(文字，x,y) 文字边框
	2、fillText(文字，x,y)   文字填充
	3、font -文字大小 :"60px impact"
	4、textAline   -默认是strat跟left一样的效果 end right center
	5、textBaseline  -文字上下文的位置的默认方式：alphabetic /top/bottom/middle
	6、measureText()
		-measureText(str).width:只有宽度，没有高度
-阴影
	1、shadowOffsetX、shadowOffsetY
		-x轴偏移、Y轴偏移
	2、	shadowBlur
		-高斯模糊值
	3、shadowColor
		-阴影颜色
-像素
	1、getImageData(x,y,w,h)：获取图像数据、x,y坐标w,h宽高
		-返回值：width ：一行的像素个数
				 height：一列的像素个数
				 data：一个数组，包含每个像素的rgba四个值，注意每个值都在0~255之间的整数
	2、putImageData(获取图像,x,y) -设置新的图像数据
	3、createImageData(w,h) -生成新的像素矩阵，初始值是全透明的黑色，即（0,0,0,0）


	
 	
		
	
	