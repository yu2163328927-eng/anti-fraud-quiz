/* ==========================================================================
 * 《从绿洲到海岸》专题网页 · 交互脚本
 * 1. 详情弹窗:双璧对照 / 互鉴六维 —— 文字 + 图集 + B 站视频(点击即播)
 * 2. 评论区(Waline)接入:部署服务端后填入 WALINE_SERVER_URL 即可开放
 * ========================================================================== */

// 部署好 Waline 服务端后,把地址填进下面这行(步骤见 README.md);留空则显示接入提示
var WALINE_SERVER_URL = 'https://2eyzbts5rfj8b.cfc-execute.bj.baidubce.com';

/* ---------- 乐器数据(首页与乐器页共用) ---------- */
var INSTRUMENTS = [
  { img: 'assets/img/muqam_dutar.jpg', tag: '弹拨乐器 · 二弦', title: '都塔尔',
    desc: '"都"是"二","塔尔"是"弦"。长颈二弦的弹拨乐器,音色温厚,自弹自唱时常伴左右,是木卡姆世界里最常见的乐器之一。',
    audio: 'assets/audio/dutar.m4a',
    note: '录音:调研团队现场实录 · 图片:Yuet Man Lee(CC BY-SA 4.0,公开授权)' },
  { img: 'assets/img/dim3_m.jpg', tag: '弹拨乐器 · 高音 / 低音', title: '热瓦甫',
    desc: '半球形琴身蒙以皮革,拨弦如珠落玉盘。热瓦甫分高音、低音两种:高音热瓦甫明亮有力,常担任旋律声部;低音热瓦甫体型更大、弦声沉厚,为整个乐队铺底。',
    audio: 'assets/audio/rawap.m4a', label: '高音热瓦甫:',
    audio2: 'assets/audio/rawap_bass.m4a', label2: '低音热瓦甫:',
    note: '录音:调研团队现场实录 · 图片:Sraperfecta Audrey(CC BY-SA 4.0,公开授权)' },
  { img: 'assets/img/inst_satar.jpg', tag: '弓弦乐器 · 十三根弦', title: '萨塔尔',
    desc: '一共十三根弦——一根主奏弦,十二根共鸣弦。弓弦起落间音色苍凉悠远,木卡姆的序曲,常由它缓缓起首。',
    audio: 'assets/audio/satar.m4a',
    note: '录音:调研团队现场实录 · 图片来自网络,侵删' },
  { img: 'assets/img/inst_qalun.jpg', tag: '击弦乐器 · 梯形琴体', title: '卡龙琴',
    desc: '梯形琴体上张满琴弦,演奏者以拨片击弦,音色清亮如流水。它来自遥远的西亚古调,在绿洲上安了家。',
    audio: 'assets/audio/qalun.m4a',
    note: '录音:调研团队现场实录 · 图片:Wikimedia Commons(CC BY-SA 4.0,公开授权)' },
  { img: 'assets/img/inst_dap.jpg', tag: '打击乐器 · 达甫', title: '手鼓',
    desc: '木框蒙皮,以手指与手掌敲击。它是木卡姆的心跳——歌与舞的起落、快慢、情绪,都由这一面鼓来掌控。',
    audio: 'assets/audio/dap.m4a',
    note: '录音:调研团队现场实录 · 图片来自网络,侵删' }
];

function renderInstruments(containerId) {
  var box = document.getElementById(containerId);
  if (!box) return;
  box.innerHTML = INSTRUMENTS.map(function (it) {
    return '<article class="inst-card">' +
      '<img src="' + it.img + '" alt="' + it.title + '">' +
      '<div class="inst-body"><span class="tag">' + it.tag + '</span>' +
      '<h3>' + it.title + '</h3><p>' + it.desc + '</p>' +
      (it.label ? '<p class="inst-audio-label">' + it.label + '</p>' : '') +
      '<audio controls preload="none" src="' + it.audio + '"></audio>' +
      (it.audio2 ? '<p class="inst-audio-label">' + it.label2 + '</p><audio controls preload="none" src="' + it.audio2 + '"></audio>' : '') +
      '<p class="iv-note">' + it.note + '</p></div></article>';
  }).join('');
}

/* ---------- 详情数据 ---------- */
var DETAILS = {
  muqam: {
    kicker: '西域 · 新疆 · 歌、舞、乐一体',
    title: '十二木卡姆',
    paras: [
      '十二木卡姆是维吾尔族大型古典音乐套曲的总称,集歌、舞、乐于一体,共含三百六十首乐曲、四千四百九十二行歌词,被誉为"维吾尔音乐之母"。',
      '每部木卡姆由"琼乃额曼"(大曲)、"达斯坦"(叙事组曲)、"麦西热甫"(歌舞组曲)三部分构成,完整演奏可长达一两个小时。都塔尔、热瓦甫、萨塔尔、艾捷克与手鼓,共同织出它独特的音色。',
      '十六世纪,叶尔羌汗国的阿曼尼莎汗召集宫廷乐师,将散落民间的乐章收集整理,从此这套大曲有了完整的模样。2005 年,"中国新疆维吾尔木卡姆艺术"入选联合国教科文组织"人类口头和非物质遗产代表作名录"。'
    ],
    images: [
      { src: 'assets/img/stage_muqam.jpg', cap: '莎车舞台专场 · 团队自摄' },
      { src: 'assets/img/teahouse_muqam.jpg', cap: '茶馆表演 · 团队自摄' },
      { src: 'assets/img/teahouse_muqam_2.jpg', cap: '茶馆表演 · 团队自摄' },
      { src: 'assets/img/street_kashgar.jpg', cap: '古城街巷 · 团队自摄' },
      { src: 'assets/img/street_kashgar_2.jpg', cap: '古城街巷 · 团队自摄' },
      { src: 'assets/img/muqam_dutar.jpg', cap: '都塔尔 · 公开授权(Yuet Man Lee, CC BY-SA 4.0)' },
      { src: 'assets/img/muqam_xinjiang.jpg', cap: '木卡姆演奏 · 公开授权(Liang Li, CC0)' },
      { src: 'assets/img/muqam_museum.jpg', cap: '木卡姆博物馆 · 公开授权(Muzzleflash, CC0)' }
    ],
    videos: [
      { bvid: 'BV1qB4y1W7r6', title: '《中国新疆之历史印记》· 十二木卡姆', note: '纪录片解说 · 3 分 21 秒' },
      { bvid: 'BV17M4y1e725', title: '十二木卡姆:唱跳着的非遗', note: '解说短片 · 道中华 · 5 分钟' },
      { bvid: 'BV1yu411K7JU', title: '对话十二木卡姆艺术家', note: '访谈解说 · CGTN · 5 分 54 秒' },
      { bvid: 'BV1wq4y1S7KP', title: '《拉克木卡姆·第一达斯坦间奏曲》', note: '官方演奏 · 中央民族乐团 · 5 分 37 秒' }
    ],
    links: [
      { title: '《维吾尔十二木卡姆》完整套曲全系列(01 拉克木卡姆起,共 5 部)', note: '每部约 60 分钟,点击前往 B 站观看', url: 'https://www.bilibili.com/video/BV1Mq4y1e78J/' }
    ]
  },
  yingge: {
    kicker: '南海 · 潮汕 · 舞、武、戏一体',
    title: '英歌舞',
    paras: [
      '英歌舞是潮汕地区流传四百余年的民间舞蹈,集武术、舞蹈、戏剧于一体,表现梁山泊英雄攻打大名府的豪情,被视为扬正压邪、吉祥平安的象征。',
      '表演者勾画水浒英雄脸谱,着武士短打,手执双短棒叩击起舞,配以锣鼓与螺号。队伍少则 24 人、多则 108 人,队形开合有"双龙出海""四虎驱羊"等阵法。',
      '按节奏快慢分三派:普宁快板、潮阳中板、陆丰慢板——"北有安塞腰鼓,南有普宁英歌"。2006 年,英歌(普宁英歌)列入第一批国家级非物质文化遗产名录。'
    ],
    images: [
      { src: 'assets/img/yingge_chaoshan.jpg', cap: '潮汕英歌舞表演 · 公开授权(Zoemonday, CC BY-SA 4.0)' },
      { src: 'assets/img/yingge_1.jpg', cap: '英歌舞现场 · 公开授权(CC0)' },
      { src: 'assets/img/yingge_2.jpg', cap: '英歌舞现场 · 公开授权(CC0)' },
      { src: 'assets/img/yingge_3.jpg', cap: '英歌舞现场 · 公开授权(CC0)' },
      { src: 'assets/img/puning_yingge.jpg', cap: '普宁英歌 · 公开授权(CC BY-SA 2.0)' },
      { src: 'assets/img/yingge_hk.jpg', cap: '英歌舞角色 · 公开授权(CC BY-SA 3.0)' }
    ],
    videos: [
      { bvid: 'BV1tNDSYnERo', title: '努力了四个月,这一刻我是信仰的一部分', note: '纪实解说 · 江寻千 · 5 分 37 秒' },
      { bvid: 'BV1uA411b76K', title: '手绘动画 · 潮汕《英歌》', note: '动画解说 · 4 分 26 秒' },
      { bvid: 'BV13yfzYpEWj', title: '英歌:看完感觉一身正气,过年气氛拉满', note: '共青团中央 · 4 分 45 秒' },
      { bvid: 'BV1kP411j7PP', title: '普宁富美青年英歌舞 · 快板英歌', note: '现场+讲解 · 普宁派代表' },
      { bvid: 'BV16z4y1j7kb', title: '普宁英歌 · 南山英歌等现场合集', note: '现场实录' },
      { bvid: 'BV1P8AZzfEZY', title: '2026 潮汕英歌舞大巡游 · 纯享版', note: '巡游实录 · 30 分钟' }
    ]
  },
  dim1: {
    kicker: '互鉴维度 01',
    title: '情感表达',
    paras: [
      '木卡姆以歌唱承载悲欢:一句旋律可以反复迂回、层层铺陈,把说不尽的心绪都托付给音乐;英歌舞则以武舞宣泄力量:双棒击节、吼声如雷,把浑身的劲道都打进鼓点里。',
      '一者向内倾诉,一者向外迸发——"大漠的歌唱,海边的武舞",构成了两种文化最直观的气质对照。'
    ],
    images: [
      { src: 'assets/img/dim1_m.jpg', cap: '木卡姆弹唱 · 公开授权(CatOnMars, CC BY 4.0)' },
      { src: 'assets/img/dim1_y.jpg', cap: '英歌舞脸谱 · 公开授权(CC BY-SA 3.0)' }
    ],
    videos: []
  },
  dim2: {
    kicker: '互鉴维度 02',
    title: '结构形态',
    paras: [
      '木卡姆是大型套曲:琼乃额曼、达斯坦、麦西热甫三部分环环相扣,一场演出如一部徐徐展开的音乐长卷,讲究起承转合的完整叙事。',
      '英歌舞则是短促锣鼓节奏的循环推进:音乐与舞步紧密绑定,以整齐划一的队形和层层递进的节拍取胜,一场舞就是一场持续加压的鼓点风暴。'
    ],
    images: [
      { src: 'assets/img/dim2_m.jpg', cap: '木卡姆乐器 · 公开授权(John Hill, CC BY-SA 3.0)' },
      { src: 'assets/img/dim2_y.jpg', cap: '英歌舞队形 · 公开授权(CC BY-SA 4.0)' }
    ],
    videos: []
  },
  dim3: {
    kicker: '互鉴维度 03',
    title: '调式音律',
    paras: [
      '木卡姆调式独特,旋律迂回婉转,装饰音密集,音与音之间如丝绸般游走,韵味藏在每一个转弯里。',
      '英歌舞以五声锣鼓为主,重节拍、重力度,一声鼓点就是一次发力,节奏是它全部的语言。'
    ],
    images: [
      { src: 'assets/img/dim3_m.jpg', cap: '热瓦甫弹奏 · 公开授权(Sraperfecta Audrey, CC BY-SA 4.0)' }
    ],
    videos: []
  },
  dim4: {
    kicker: '互鉴维度 04',
    title: '社群功能',
    paras: [
      '木卡姆的麦西热甫让邻里乡民围坐一处、轮流歌舞,打破个体的隔阂;英歌舞以宗族村落为单位组队训练、演出,全村的凝聚力在鼓点中凝结。',
      '二者殊途同归:都以集体参与凝聚社群、传承集体记忆——非遗从来不只是艺术,更是一种共同生活的方式。'
    ],
    images: [
      { src: 'assets/img/dim4_m.jpg', cap: '麦西热甫 · 公开授权(CC BY-SA 2.0)' },
      { src: 'assets/img/dim4_y.jpg', cap: '英歌舞队形 · 公开授权(CC BY-SA 3.0)' }
    ],
    videos: []
  },
  dim5: {
    kicker: '互鉴维度 05',
    title: '活态传承',
    paras: [
      '木卡姆与英歌舞都没有绝对不变的"标准版本":靠口传心授代代相传,版本随地域与艺人流动,允许即兴发挥。',
      '正因如此,每一次演出都是一次再创作——非遗在"没有定本"中保持鲜活,传承人的个性本身就是作品的一部分。'
    ],
    images: [
      { src: 'assets/img/dim5_m.jpg', cap: '喀什麦西热甫表演 · 公开授权(CC BY-SA 2.0)' },
      { src: 'assets/img/dim5_y.jpg', cap: '英歌舞角色 · 公开授权(CC BY-SA 3.0)' }
    ],
    videos: []
  },
  dim6: {
    kicker: '互鉴维度 06',
    title: '共同困境',
    paras: [
      '民俗场景萎缩、年轻人接触减少、传承人老龄化,是两种艺术共同面对的考题。',
      '但也正因如此,记录、传播与创新表达成为这一代人的责任——让大漠的歌唱与海边的武舞,被听见、被看见、被记住。'
    ],
    images: [
      { src: 'assets/img/dim6_m.jpg', cap: '喀什老城街巷 · 公开授权(Radosław Botev, CC BY 3.0)' }
    ],
    videos: []
  }
};

/* ---------- 详情弹窗 ---------- */
function biliEmbed(bvid) {
  return '<iframe src="https://player.bilibili.com/player.html?bvid=' + bvid +
    '&page=1&autoplay=0&danmaku=0" allowfullscreen loading="lazy" title="B 站视频"></iframe>';
}

function openDetail(key) {
  var d = DETAILS[key];
  var modal = document.getElementById('detail-modal');
  var body = document.getElementById('detail-body');
  if (!d || !modal || !body) return;

  var html = '<p class="modal-kicker">' + d.kicker + '</p>' +
    '<h3 id="detail-title">' + d.title + '</h3>' +
    '<div class="modal-paras">' + d.paras.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>';

  if (d.images.length) {
    html += '<h4 class="m-block-title">影像图集</h4><div class="m-gallery">' +
      d.images.map(function (im) {
        return '<figure><img src="' + im.src + '" alt="' + im.cap + '" loading="lazy">' +
          '<figcaption>' + im.cap + '</figcaption></figure>';
      }).join('') + '</div>';
  }

  if (d.videos.length) {
    html += '<h4 class="m-block-title">视频 · 点击即播</h4><div class="m-videos">' +
      d.videos.map(function (v) {
        return '<div class="m-video"><div class="vid-wrap">' + biliEmbed(v.bvid) + '</div>' +
          '<div class="vid-cap"><b>' + v.title + '</b>' + v.note + ' · 来源:B 站(iframe 嵌入)</div></div>';
      }).join('') + '</div>';
  }

  if (d.links && d.links.length) {
    html += '<h4 class="m-block-title">更多视频 · 前往 B 站观看</h4><div class="m-links">' +
      d.links.map(function (l) {
        return '<a class="m-link" href="' + l.url + '" target="_blank" rel="noopener">' +
          '<b>' + l.title + '</b><span>' + l.note + ' →</span></a>';
      }).join('') + '</div>';
  }

  body.innerHTML = html;
  modal.hidden = false;
  modal.querySelector('.modal-panel').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  var modal = document.getElementById('detail-modal');
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.getElementById('detail-body').innerHTML = ''; // 清空 iframe,停止播放
  document.body.style.overflow = '';
}

/* ---------- 初始化 ---------- */
document.addEventListener('DOMContentLoaded', function () {
  // 详情弹窗:绑定卡片点击
  renderInstruments('inst-grid');
  renderInstruments('inst-full');
  document.querySelectorAll('[data-detail]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // 卡片内的链接(如乐器之声)不触发弹窗
      openDetail(el.getAttribute('data-detail'));
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(el.getAttribute('data-detail')); }
    });
  });
  document.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeDetail);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDetail(); });

  // ---------- 评论区(Waline):文化交流 + 意见反馈两个独立线程 ----------
  function initWalineBox(elId, path, placeholder) {
    var box = document.getElementById(elId);
    if (!box) return;
    if (!WALINE_SERVER_URL) {
      box.innerHTML =
        '<div class="waline-pending">' +
        '<b>评论区正在接入中</b><br>' +
        '按 README.md 部署 Waline 服务后,访客即可在这里自由留言(无需注册)。' +
        '</div>';
      return;
    }
    window.Waline.init({
      el: '#' + elId,
      serverURL: WALINE_SERVER_URL,
      lang: 'zh-CN',
      login: 'disable',          // 游客直接留言,无需登录
      meta: ['nick', 'mail'],    // 昵称 + 邮箱(邮箱选填)
      requiredMeta: ['nick'],    // 昵称必填
      placeholder: placeholder,
      pageview: false,
      path: path                 // 留言板与反馈区分开存,互不干扰
    });
  }

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'assets/waline/waline.css';
  document.head.appendChild(link);

  var script = document.createElement('script');
  script.src = 'assets/waline/waline.js';
  script.onload = function () {
    initWalineBox('waline', '/guestbook', '写下你的文化感悟……');
    initWalineBox('waline-feedback', '/feedback', '写下你的建议或反馈……');
  };
  document.head.appendChild(script);

  // ---------- 页签切换 ----------
  var tabs = document.querySelectorAll('.wtab');
  if (tabs.length) {
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) { x.classList.remove('active'); });
        t.classList.add('active');
        var isFb = t.getAttribute('data-tab') === 'fb';
        document.getElementById('tab-chat').hidden = isFb;
        document.getElementById('tab-fb').hidden = !isFb;
      });
    });
  }
});
