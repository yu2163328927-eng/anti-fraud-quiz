# 从绿洲到海岸 · 专题网页

「从绿洲到海岸」——十二木卡姆 × 英歌舞文化互鉴专题网页,纯静态页面 + Waline 第三方评论,无后端、零运维成本。

## 项目结构

```
web/
├── index.html          # 首页:首屏、双璧对照、互鉴六维(点击卡片看详情弹窗)
├── research.html       # 调研资料:文字纪实、实地影像、田野访谈、英歌舞影像
├── guestbook.html      # 互动留言(Waline 评论)
├── instruments.html    # 乐器之声:六件乐器实录音频 + 介绍 + 图片
├── css/style.css       # 全局样式(简约人文 · 非遗氛围)
├── js/main.js          # 脚本(详情弹窗数据 + 评论区,唯一需配置处:WALINE_SERVER_URL)
└── assets/img/         # 图片素材(实地抽帧 + Wikimedia Commons)
```

## 一、本地预览

直接双击 `index.html` 即可浏览(评论区未接入时显示提示,其余功能全部正常)。

或起一个本地服务(体验与线上一致):

```bash
cd web
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 二、部署上线

### 方案 A:GitHub Pages(推荐,免费)

1. 把整个 `web/` 目录的内容提交并推送到 GitHub 仓库(当前所在仓库已开启 Pages,推送后即可访问);
2. 访问地址:`https://<你的用户名>.github.io/<仓库名>/web/`;
3. 想让它在根域名下(如 `xxx.github.io` 直接打开本页):新建一个仓库,只放 `web/` 里的内容,push 后在仓库 Settings → Pages 里选择 main 分支根目录即可;
4. 想绑定自己的域名:Settings → Pages → Custom domain 填域名,再到域名服务商加一条 CNAME 记录即可(免费域名可用 `xxx.gitee.io` 或学校提供的域名空间)。

> 注意:视频素材体积大,不建议直接传进仓库(仓库限 100MB/文件、1GB 总量)。建议把纪录片传到 B 站后,用官方嵌入代码放进页面(需要时再说,我来加)。

### 方案 B:Vercel / Netlify(免费,拖拽即可)

- Vercel:注册登录后,把 `web/` 文件夹直接拖进部署页,几秒钟获得 `https://xxx.vercel.app` 访问地址。

## 三、接入 Waline 评论区(已完成部署,本节为记录)

**当前方案:百度云 CFC(函数计算)+ MongoDB Atlas 免费档**,服务地址 `https://2eyzbts5rfj8b.cfc-execute.bj.baidubce.com`,已填入 `js/main.js`。评论管理后台:`https://2eyzbts5rfj8b.cfc-execute.bj.baidubce.com/ui`(首次访问注册管理员账号)。

### 部署记录(重搭时照着做)

1. **数据库**:MongoDB Atlas M0 免费集群,数据库用户 `waline`,Network Access 放行 `0.0.0.0/0`;分片主机名与副本集名可用 `nslookup -type=SRV/-type=TXT _mongodb._tcp.<集群名>.mongodb.net` 查。
2. **函数**:百度云 CFC → 创建函数(事件函数,Node.js 22,超时 300 秒)→ HTTP 触发器(URL `/{path+}`,方法全选,身份认证"不验证")→ 上传 ZIP → 填环境变量(10 条):
   `MONGO_HOST`(三主机 JSON 数组)、`MONGO_PORT`(`[27017,27017,27017]`)、`MONGO_DB`=`waline`、`MONGO_USER`、`MONGO_PASSWORD`、`MONGO_REPLICASET`、`MONGO_AUTHSOURCE`=`admin`、`MONGO_OPT_SSL`=`true`、`SITE_NAME`、`SITE_URL`。
3. **部署包**(桌面 `waline-cfc/` 目录)踩过的坑,均已处理:
   - `@waline/vercel` 钉在 `1.41.6`;npm overrides:`jsdom`→`26.1.0`、`html-encoding-sniffer`→`4.0.0`(避开 ESM 包,CFC 的 Node 22 不支持 require(esm))、`better-sqlite3`→占位包(避开本机缺编译工具,SQLite 用不到)
   - `node_modules/@waline/vercel/src/config/adapter.js` 打了超时补丁(连接池 15s、驱动 15~20s,跨境连接够用)
   - `index.js` 必须用官方 starter 的**无 return** 写法:`cfcExpress.proxy(server, event, context);` 不带 return,否则 CFC 返回异常
4. **重新打包**:桌面 `waline-cfc/` 修改后,把目录内所有文件打成根层级 zip → CFC 函数代码页上传覆盖。注意 CFC 新用户免费额度仅 3 个月,长期使用需留意计费。

> 体感:国内访问快且稳;评论数据存境外 Atlas,提交/加载约 1~2 秒。

## 四、图片素材与版权说明

| 图片 | 来源 | 许可 |
|------|------|------|
| hero_kashgar / stage_muqam / teahouse_muqam / teahouse_muqam_2 / street_kashgar / street_kashgar_2 / interview_1 / interview_2 / interview_3 | 调研团队自摄(新疆喀什/莎车,视频抽帧) | 自有版权 |
| interview_0 | 用户提供(桌面 174ee77...jpg) | 自有版权 |
| muqam_xinjiang | Wikimedia Commons:《El muqam uyghur del Xinjiang.jpg》 | CC0(摄影:Liang Li) |
| muqam_dutar | Wikimedia Commons:《Dutar inside Muqam Uyghur Cuisine.jpg》 | CC BY-SA 4.0(摄影:Yuet Man Lee,页面已标注) |
| muqam_museum | Wikimedia Commons:《Hami Muqam Museum.jpg》 | CC0(摄影:Muzzleflash) |
| yingge_1 / yingge_2 / yingge_3 | Wikimedia Commons:《Yingge Dance 1/2/3.jpg》 | CC0(可自由使用) |
| yingge_chaoshan | Wikimedia Commons:《潮汕英歌舞表演.jpg》 | CC BY-SA 4.0(摄影:Zoemonday,需署名,页面已标注) |
| puning_yingge | Wikimedia Commons:《Puning-YingGe.jpg》 | CC BY-SA 2.0 |
| yingge_hk | Wikimedia Commons:《HK YinggeDance SnakePlayer.JPG》 | CC BY-SA 3.0 |
| dim1_m ~ dim6_m / dim1_y ~ dim5_y | Wikimedia Commons(互鉴六维配图,10 张,来源与许可见各图注) | CC BY / CC BY-SA 系列 |

## 五、视频素材(B 站嵌入)

视频均通过 B 站官方播放器 iframe 嵌入,点击即播,无需登录;数据写在 `js/main.js` 的 `DETAILS` 对象里,想替换视频改 `bvid` 即可。当前已接入:木卡姆 4 个嵌入(CCTV 纪录片片段、道中华解说、CGTN 访谈、中央民族乐团演奏)+ 1 个外部链接(《维吾尔十二木卡姆》完整套曲全系列,跳转 B 站观看),英歌舞 6 个嵌入(江寻千纪实、手绘动画解说、共青团中央、快板英歌讲解、现场合集、2026 大巡游)。

## 六、后续待办

- [ ] 纪录片《从绿洲到海岸》成片上线(B 站嵌入)
- [ ] 潮汕英歌舞实地素材采集与并置对照
- [ ] 部署 Waline 后开放评论区(见第三节)
- [ ] 按需新增「关于我们」页(用户暂缓,未做)
