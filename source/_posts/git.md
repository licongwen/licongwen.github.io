---
title: git
date: 2016-06-12 19:39:53
tags: git tools
---
最近在学习git与github，把学到的git命令总结如下；
git的三个需要知道区域：工作区、暂存区、版本库。
<!--more-->
git config --global user.name  配置全局的用户名（贡献者名称）
git config --global user.email 配置全局用户名的email
git config --list 查看所有配置

git status   当前repo的状态
git add      将工作区的内容添加到暂存区
git add .    添加当前工作区的所有内容到暂存区
git commit   将暂存区的文件添加到版本库
git commit -a -m "" 直接将工作区的内容添加到版本库

git对比
git diff     比较工作区和暂存区的区别
git diff --cached(--staged)  比较暂存区和版本库的区别
git diff master   比较工作区和版本库的区别

git 撤销操作
git reset HEAD <fifle>  从暂存区撤销回工作区
git checkout -- <fifle> 将工作区的文件撤销回版本区的状态
git commit --amend      将上次提交撤文件销回来并与当前文件合并到一起提交 

git 删除
git rm <fifle.name>    删除暂存区的文件
git rm -f <fifle.name> 删除暂存区和工作区的文件
git rm --cached <fifle.name>  只删除暂存区的文件

git恢复
git checkout commit id <fifle.name>   还原某一个文件
git reset --hard commit id   还原某一个版本
git reset --hard HEAD^       还原到之前一个版本
git reset --hard HEAD~2      还原到之前的2个版本
git reflog        找到每次操作的记录，在回到当前的版本

同步到远程仓库
git remote   获取当前仓库的名字（clone下来自带的名字origin）
git remote -v 当前仓库的名字对应的地址
git push origin master    同步到远程仓库
git clone        克隆github上的仓库
git fetch        从github上获取版本来更新本地仓库，把远端的仓库获取，但并不合并，需要手动合并
git pull         从github上获取版本来更新本地仓库，直接从github上获取直接与本地合并
git merge origin/master   将github和本地上的文件合并

开源项目协作
fork           复制开源项目
pull request   向有权限的人发送合并请求

git 分支
git branch  查看分支
git merged new1  合并new1分支
git branch new1    创建new1分支
git checkout new1  切换到new1分支
git checkout -b new2  创建new2分支并切换到new2分支
git branch --merged     查看已经和master合并的分支
git branch --no--merged 查看没有和master合并的分支
git branch -d new1      删除已经merged的new1分支
git branch -D new2      强制删除没有merged的分支 
git tag                 查看标签
git tag v 1.0           打一个标签


持续更新