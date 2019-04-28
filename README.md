# 安全教育平台助手前端

[![构建状态](https://dev.tencent.com/badges/huggy_/safetree_web/26573/build.svg)](https://dev.tencent.com/u/huggy_/p/safetree_web/ci/job)
## [Demo](https://anquan.huggy.moe)
[![Screenshot 2019-04-24 at 12.01.42 AM.png](https://i.loli.net/2019/04/24/5cbf37073d9a9.png)](https://i.loli.net/2019/04/24/5cbf37073d9a9.png)

    
使用 [vuetifyjs](https://vuetifyjs.com) 和 [nuxtjs](https://nuxtjs.org) 构成的简易前端


# 特点
- 支持自动完成手机端登录任务
- 支持自动完成每学期已授课的作业以及专题作业
- 支持自动重置学生密码为123456
- **`快`**

# 待完成 （以下都是无限期拖延 #TODOLIST）
- 点击登录即可自动完成（不需要选中未完成的作业）
- 前端优化
- 后端争取改好开源
- 针对地区专题作业提供个找专题id的工具


如果有地区的专题作业 可以新建个issue来添加 或者向我发邮件

服务端包括了一些我个人抓取的 安全教育平台客户端私有api 而且代码而且写得很烂 暂时不适合开源


研究登录之类的可以看我之前的 [gist](https://gist.github.com/xiao201261/e623f93b7bcb93dddcf24cef6f0713ad) 要寻找无地区限制的登录请抓客户端api


## 生成版本号 (参照JENKINSFILE)
    node genbuild.js GIT_COMMIT_HASH

## 调试
    yarn dev

## 打包

    yarn generate
    
# Licence
MIT

