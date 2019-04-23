# 安全教育平台助手前端

[![构建状态](https://dev.tencent.com/badges/huggy_/safetree_web/26573/build.svg)](https://dev.tencent.com/u/huggy_/p/safetree_web/ci/job)
## [Demo](https://anquan.huggy.moe)
[![Screenshot 2019-04-24 at 12.01.42 AM.png](https://i.loli.net/2019/04/24/5cbf37073d9a9.png)](https://i.loli.net/2019/04/24/5cbf37073d9a9.png)


使用 [vuetifyjs](https://vuetifyjs.com) 和 [nuxtjs](https://nuxtjs.org) 构成的简易前端

可以输入用户名以及密码 然后选中用户 然后自动做题
所以是很简易的前端了 ~~没有什么特色功能~~

如果有地区的专题作业 可以新建个issue来添加 或者向我发邮件

服务端包括了一些我个人抓取的 安全教育平台客户端私有api 而且代码而且写得很烂 暂时不适合开源


研究登录之类的可以看我之前的 [gist](https://gist.github.com/xiao201261/e623f93b7bcb93dddcf24cef6f0713ad) 无地区限制的登录请抓客户端api


## 生成版本号
    node genbuild.js GIT_COMMIT_HASH

## 调试
    yarn dev

## 打包

    yarn generate
    
# Licence
MIT

