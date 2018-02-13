---
title: '[译]用HTTP缓存头信息提高应用的性能'
date: 2018-02-13 08:57:43
tags:
---
今天看到一篇英文文章，觉得挺好的，原文链接在<a href="https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers#http-cache-headers">这里</a>,就想着试试看能不能翻译下，顺便巩固下英语能力。翻译的不准确的话还请见谅。

<!--more-->
现代的开发者有各种各样的技术和科技可以用来提升应用的性能和用户体验。经常最被忽视的一项技术就是HTTP缓存。
HTTP缓存是所有现代Web浏览器中普遍采用的规范，使其在Web应用程序中的实现变得简单。适当使用这些标准可以大大提高应用程序的响应时间，减少服务器负载。然而，不正确的缓存可以让使用者看到过时的内容和难以调式的问题。本文讨论HTTP缓存的细节，以及在何种情况下采用基于HTTP缓存头的策略。

# 综述
HTTP缓存发生时，浏览器在本地存储网页资源的副本以便下次资源被需要的时候能更快的检索到。当应用程序提供资源时，它可以将缓存头附加到指定所需缓存行为的响应中。
<img src='img/yi1.jpg' alt="图片"/>
当一个项目被完全缓存后，浏览器可能不会选择和服务器通信并且使用在本地存储的副本。
<img scr="https://github.com/licongwen/licongwen.github.io/tree/master/images/yi1.jpg" alt="图片"/>
例如：一旦你的应用的css样式表被缓存到本地，浏览器在使用的会话期间就没有必要再一次下载css样式表。这对于很多有用的类型来说是正确的，比如javascript文件，图片和一些不经常改变的动态文件。在这些情况下，用户浏览器在本地缓存此文件是有益的，每当再次请求资源时，都会使用该副本。使用HTTP缓存头的应用程序能够控制此缓存行为并减轻服务器端负载。

# HTTP 缓存头
有两类主要的缓存头，Cache-Control和Expires

## Cache-Control

**没有设置cach-control头信息，其他任何缓存头将不会有效果**

Cache-Control头是最重要的头信息，因为它有效地“打开”浏览器中的缓存。有了这个头信息，并设置一个有效值就可以开启缓存，浏览器就可以指定缓存文件多长时间。没有这个缓存头，浏览器随后的每次请求中在一次请求文件。

**public**资源不仅可以终端浏览器中被缓存，还可以在任何服务其他用户的中间代理(intermediate proxies )中被缓存。
```javascript
Cache-Control:public
```
**private**资源绕过中间代理，只能在客服端被缓存
```javascript
Cache-Control:private
```
Cache-Control头信息的值是组合值，指明资源是公共的或者私有的，也指明了缓存在过期之前最长的有效时间。max-age的值被用来指明资源可以缓存的时间。
```javascript
Cache-Control:public,max-age=32536000
```
当缓存头启动客户端缓存并设置最大缓存时间，Expires头用来指定一个特殊的时间，指明资源不在有效。

## Expires

当和Cache-Control头一起设置时，Expires简单的设置一个时间指明该资源不在有效。从这个日期开始，浏览器将缓存一个新的资源副本。在此之前，浏览器将使用本地副本：
**如果Expires和max-age都设置了值，那么max-age的优先级更高**
```javascript
Cache-Control:public
Expires:Mon,25 Jun 2012 21:31:12 GM
```
当Cache-Control和Expires告诉浏览器什么时候去下次请求网络资源，还有其他一些头信息怎么样去请求网络上的资源。这些类型的请求称为条件请求。

# 条件请求(Conditional requests)

条件请求是指浏览器可以询问服务器是否有资源的更新副本。浏览器将发送一些关于它所缓存的资源的信息，服务器将决定是否应该返回更新的内容或浏览器的副本是最新的。对于后者，返回的HTTP状态为304（not modified）。
<img src="" alt="图片"/>
虽然条件请求确实是一个网络请求，但是未修改的资源返回一个空的响应体-从而节省了将资源返回到最终客户端的成本。后端的服务器还常常能够快速的确定资源的最后修改日期，不需要访问自身的资源从而节省传输时间。

## Time-based

一个time-based条件请求保证
为了启用条件请求，应用程序通过Last-Modified响应头来指明最后的修改时间。
```javascript
Cache-Control:public,max-age=31536000
Last-Modified:Mon,03 Jan 2011 17:45:57 GMT
```
下次浏览器请求资源时，请求仅仅会查看自请求头信息的Last-Modified-Since字段值，查看资源的内容在这个时间后是否有改变。
```javascript
If-Modified-Since:Mon ,03 Jan 201117:45:57 GMT
```
如果请求的资源自从Mon ,03 Jan 201117:45:57 GMT时间段都没有改变，服务器就会返回一个空的响应体和响应码304。

## Content-based
ETag(或者Entity Tag)和Last-Modified头有着相似的工作方式，唯一不同的是ETag的值是资源内容的编码（比如MD5hash值）。ETag可以让服务器判断缓存的资源的内容和最新的资源内容有没有不同的地方。

**当最后一个修改日期难以确定时，此标记非常有用**
```javascript
Cache-Control:public ,max-age=31536000
ETag:"15f0fff99ed5aae4edffdd6496d7131f"
```
在随后的浏览器请求中，If-None-Match请求头被发送，它的值是上一次请求资源的ETag值。
```javascript
If-None-Match:"15f0fff99ed5aae4edffdd6496d7131f"
```
有了If-Modified-Since头信息，如果最新的资源有相同的ETag值，表明资源的值和浏览器缓存的值相同，然后HTTP状态码304就被返回了。
