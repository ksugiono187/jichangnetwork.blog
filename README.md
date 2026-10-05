# 机场网络 · jichangnetwork.blog

## 当前维护位置

本网站后续直接维护在 `C:\Users\user\Desktop\博客\jichangnetwork.blog`，GitHub 仓库为 [ksugiono187/jichangnetwork.blog](https://github.com/ksugiono187/jichangnetwork.blog)，主分支 `main`。正式域名为 `https://jichangnetwork.blog`。修改源文件或资料后，重新生成并检查 `dist`，将同一次更新一起提交到仓库。Codex输出目录只保留交付副本。

本机Sites登记文件保留在本地，不参与GitHub发布；GitHub工作流只发布 `dist`。

黑金资讯杂志风格的选购博客，首页采用原创网络主视觉、本期策划、专题封面与品牌图鉴；电脑为三列品牌目录，品牌卡片独立分层。29个品牌：暮光第三、大佬云第四，无忧及后续品牌顺延；原28个品牌的推广链接与11个优惠码保持不变。

## 内容

- 29份品牌指南：价格速览、服务配置、适用需求、付款方式、优惠及可展开来源。
- 123篇原创文章：36篇独立选购方法、87篇基于品牌数据的套餐研究。
- 24个独立研究专题：每页含3节原创分析、比较表、明确标注的情景案例、行动清单、资料来源和3篇递进阅读；34篇短指南新增具体工作记录与案例，2篇现有长文保留。
- 套餐并排对比、预算选购工具、全站搜索、收藏、最近浏览和RSS；全站搜索已收录完整专题正文，收藏和最近阅读支持专题。
- 文章库每页12篇，支持关键词、专题、内容类型共同筛选；文章正文含阅读要点、分节目录、涉及套餐表格与相关阅读。手机底部快捷导航、折叠目录和容器内表格横向滚动。
- 独立TDK、jichangnetwork.blog canonical、结构化数据、站点地图、robots.txt和CNAME。

## 本地预览

安装Node.js 22或更新版本。本项目无需安装第三方依赖。

```text
npm run build
npm run check
npm start
```

打开终端显示的本地地址。直接双击HTML不支持读取搜索索引等交互，请使用本地预览服务。

## 上传GitHub并上线

1. 将本目录的内容同步到已指定的仓库 `ksugiono187/jichangnetwork.blog`；保留`.github`文件夹。
2. 默认分支设置为`main`。
3. 在仓库Settings → Pages，将Source设为GitHub Actions。已包含发布流程。
4. 在Pages中填写自定义域名`jichangnetwork.blog`，按照GitHub官方说明在域名服务商配置DNS，等待域名验证，再启用HTTPS。
5. 建议先按GitHub说明验证域名所有权，再接入生产域名。

本地文件已配置正式域名和对应仓库。GitHub资料上传与域名DNS、HTTPS配置分开处理；是否上线以实际部署结果为准。

官方说明：[自定义Pages工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)、[自定义域名管理](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。

`.openai/hosting.json`保留本次Sites登记信息。在线预览发布被当前环境的自动审批拦截，尚未完成；本地预览和文件包可正常使用。GitHub发布只读取`dist`，不需要Sites权限，也不会改变旧站。

## 数据与编辑

`data/brands.json`保存原始品牌顺序、推广入口、优惠码和参考套餐；`data/profiles.mjs`保存新版品牌分析；`data/guides.mjs`保存36篇选购方法与24个专题；`data/articles.mjs`由结构化资料组织87篇品牌研究。`data/magazine-editorial.mjs`保存本期策划、24个专题导读与两篇重点长文；`scripts/magazine.mjs`和`assets/magazine.css`负责杂志版首页、专题及阅读视觉。

报价沿用2026-10-03转录记录，每个套餐保留原始资料日期。2026-10-05重新复查28来源页与28面板公开配置，访问成功不表示现价、结账优惠或实际表现已确认。`data/public-review.json`保存本轮访问证据。

Firefly、极连云仍存在套餐归属疑点。飞V容量可信度与可信云当前状态也未解决；自动选购已排除这些品牌，以及活动小包和未知周期的年包。灵动云70GB/年保留为年度总额，不写成70GB/月。

未复制旧域名Bing验证或IndexNow密钥。新域名应单独完成站长工具验证；本站没有承诺搜索排名或收录时间。

更正页面目前只生成本地草稿，未连接公开联系渠道。收藏、历史与对比记录保存在当前浏览器，不跨设备同步。

## 更新

内容修改后重新执行`npm run build`及`npm run check`。要复查公开来源可执行`node scripts/verify-public.mjs`，它只检查访问与公开身份，不会自动更新价格。

如果参考数据改变，应同时检查原始日期、付款周期、额度周期、归属和正文计算，然后重新发布。

## 搜索与站点地图

首页主关键词为“机场推荐”。所有页面分别生成Title、Description和与内容相关的Keywords；另含canonical、Open Graph、Twitter摘要、JSON-LD与RSS。`dist/sitemap.xml`是站点地图索引，包含页面、品牌、文章、专题四份子地图；`dist/tdk.csv`可查看全站TDK，`dist/seo-report.json`记录可索引页面和提交状态。

Bing站点验证与提交需要正式域名可访问及站长账号。没有验证令牌，不伪造Bing验证文件，不宣称已提交或已收录。详见SEO交付说明.md。

大佬云保留站长提供的完整官方入口；四张套餐和优惠截图只用于此品牌。转录6项套餐与dly888新用户首次订阅7折公告，全站优惠码合计12个。初云23元档顶部130GB与正文120GB有差异，不参加容量匹配；43元300GB、73元600GB月付参与参考匹配。96元年付款及99元78GB、199元160GB按量包分别记录，不混作月付。套餐、优惠与服务说明均由站长提供并确认，完整可见内容已整理为文字。网站及下载包不包含资料照片或原图入口。

## 杂志版设计

首页使用原创黑金网络主视觉，WebP约154KB。长文采用暖白纸面，手机正文16px，桌面正文约17px；目录、阅读提要与品牌资料来源可展开。24个专题具有独立导读，并推荐先理解问题、再进入具体品牌方案的阅读路径。两篇重点长文分别讨论实际流量成本与年付决策，保留原URL。完整设计与主视觉生成说明见“杂志版设计说明.md”。

## 黑金精修版

全站背景使用本地SVG光线纹理，配合深黑底色与香槟金色。首页明确品牌图鉴、选购指南和三种付款场景入口；29份品牌简介、123篇文章标题与摘要、24个专题导读均已精修。专题按文章实际内容关联，并与文章库筛选使用同一规则。`data/refined-editorial.mjs`保存新版文案，`articleTopicIds`整理主次专题。原始品牌数据、推广链接与优惠资料不变。
