# web-dist-pro

> 传统模式开发的 web 站点，进行整站所有文件压缩及混淆处理，高级版

## 项目简介

很多公司开发的项目或非 web 前端工程师开发的一些 web 前端页面或系统都不是基于 NodeJS 或当前流行的前端技术栈来开发的，对于这部分人群来说压缩混淆整个 web 站点还是有点难度。

本仓库提供了一个基于 gulp 的简单易用的整站压缩混淆工具，会保持原项目的所有目录结构，递归对所有文件进行压缩和混淆处理。

## 功能特性

- 支持 js 文件混淆及压缩（babel 转译 + uglify 压缩 + javascript-obfuscator 高级混淆）
- 支持 html 文件压缩，内联 script 一并转译与混淆
- 支持 css、html、图片文件压缩
- 保持原项目的所有目录结构和其他格式文件的复制
- 单个文件处理异常时自动降级为原样拷贝，不中断整体构建流程
- 预留 `lastTime` 参数，可只处理某时间点之后修改的文件（增量更新）

## 环境要求

- Node.js（gulp 4 对 Node 版本有要求，可以百度查询学习下）

## 安装

首次使用输入命令安装依赖包：

```bash
npm install
# 或
cnpm install
```

## 使用命令

1. 将需要压缩的站点放在 `src` 目录下；
2. 执行 `npm run build` 命令（即 `gulp build`），结果站点会生成在 `dist` 目录下；
3. 将 `dist` 目录拷贝至 http 服务容器中进行发布访问即可。

## 配置说明

打开 `gulpfile.js` 文件，可按需修改以下常用配置：

| 配置项 | 说明 |
| --- | --- |
| `srcPath` | 需要压缩混淆的根目录，默认 `src` |
| `distPath` | 生成到的目标目录，默认 `dist` |
| `optsObfuscator` | js 高级混淆参数，更多参数参考 [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) |
| `noPipePathDef` / `noPipePath` | 不做压缩混淆、直接原样拷贝的目录 |
| `noCopyPathDef` / `noCopyPath` | 排除不拷贝的目录 |
| `noCopyFileType` | 排除不拷贝的文件类型后缀 |
| `lastTime` | 只处理该时间之后修改的文件（增量更新时使用） |
| `copyright` | 输出文件头部版权信息 |

## 提示

1. gulp4 对 node 版本有要求，可以百度查询学习下。
2. 如果中间有报错，按提示修改相关文件内容，直至无错误提示。
3. 部分如 cesium 等由多个 js 组成的复杂的关联性 lib 不能进行压缩（目前代码中已处理），可修改配置文件中 `noPipePath` 参数或将源文件覆盖至压缩后的文件中。
4. 如果你懂点 javascript 技术，可以打开 `gulpfile.js` 文件，按需修改配置。

## 目录结构

```text
web-dist-pro
├── src/                           # 源站点目录（放入待处理的网站文件）
├── dist/                          # 构建输出目录（构建后生成）
├── gulpfile.js                    # gulp 构建脚本（压缩混淆主逻辑）
├── gulp-javascript-obfuscator.js  # javascript-obfuscator 的 gulp 插件（本地副本）
├── package.json
├── LICENSE                        # Apache-2.0 许可证
└── README.md
```

## 相关仓库

简单的压缩混淆方式：访问 [web-dist](https://github.com/muyao1987/web-dist)，该仓库与本仓库基本相同，没有采用 obfuscator 加密，可以根据需要自行选择。

## 作者

[火星科技](http://marsgis.cn/) - [木遥](https://work.weixin.qq.com/wework_admin/user/h5/qqmail_user_card/vc9b130b6638aebeb7)

## 许可证

[Apache-2.0](LICENSE)
