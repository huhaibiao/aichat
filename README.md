<!--
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-03-28 15:47:00
 * @Description: 
-->
# 项目

ai chat

# 体验地址：（欢迎友好提问哈，小服务器希望大家体验一下）

http://18.216.251.165/ai-chat

目前 账号：huhaibiao 密码是：1

界面介绍：

![chat界面](./docs/01.jpeg)

# 安装包

`pnpm i 或者 npm i `

# 运行

`pnpm dev/start`

# 测试用账户

merchant1
merchant1

# 打包构建

`pnpm build`

# 迭代说明

- 移动端布局的问题：包括横屏底部显示问题 ✅
- 移动端向上滑问题，在有键盘弹出和无弹出的情况下，并不能出现往前的内容（偶现）
- 生成唯一 sessionId ✅
- 移动端一键复制
- 夜间模式

- 回复框，等待过程加入动画 ✅
- 回复框，等待的时候这个框的宽度最好缩短点 ✅

- 对话的数据结构
- 清除历史记录功能
- 光标显示功能 ✅
- 代码优化 +1 回复 loading 动画
- markdown 解析器组件
- 对话带时间戳

- 更换 ws 域名 ✅
- 登录功能 ✅
- ws 携带 token ✅
- 状态组建化
- 登录组建化，目前是半组建化，适配移动和 pc ✅
- 打包自动更新版本号，规则，3 次为一小更新，✅

- build 推送提交远程
- 区分 build 和 dev 环境 ✅


- 显示时间 辅助函数 ✅

- 兼容两种接收数据的方式，一种是post一次返回，一种是websocket实时返回
- 修复提交按钮bug ✅
- 多次提问不受限制，3/m，openai限制 ✅
- 修复提交弹出对话 ✅
- 解决提交按钮默认传参问题 ✅
- 修复了光标问题 ✅
- 更新登陆密码 ✅
- 修复终止按钮显示问题 ✅
- 多人同时提问 ✅
- 可共享问题 ✅

- 问题和答案


ai聊天页面，欢迎大家友好提问和使用

前端开源地址：

https://github.com/huhaibiao/aichat

后端开源地址：

https://github.com/huhaibiao/openai-api

体验链接目前在前端开源readme介绍中

前端功能：

界面优化

流式打字机效果

后端服务：

多人提问

逻辑闭环

共享聊天提问