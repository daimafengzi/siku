/*
京东健康9.9减9.89优惠券
短期活动

活动入口：京东APP首页-京东汽车-屏幕右中部，车主福利
活动网页地址：https://u.jd.com/aK2gU7C

================Loon==============
[Script]
cron "55 59 12 * * *" script-path=https://gitee.com/lxk0301/jd_scripts/raw/master/jd_car_exchange.js, tag=京东健康9.9减9.89优惠券

 */
const $ = new Env('京东健康9.9减9.89优惠券');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const randomCount = $.isNode() ? 1 : 1;//运行2次。相隔1秒一次
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
let shijian=Date.now();//定义时间
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
  };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }
  for (let j = 0; j < randomCount; ++j)
    for (let i = 0; i < cookiesArr.length; i++) {
      if (cookiesArr[i]) {
        cookie = cookiesArr[i];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        $.index = i + 1;
        console.log(`*********京东账号${$.index} ${$.UserName}*********`)
        $.isLogin = true;
        $.nickName = '';
        message = '';
        await jdCar();
      }
    }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

async function jdCar() {
  await exchange()
}

function showMsg() {
  return new Promise(resolve => {
    $.msg($.name, '', `【京东账号${$.index}】${$.nickName}\n${message}`);
    resolve()
  })
}

function exchange() {
  return new Promise(async resolve => {
		const options = {
			"url": `https://api.m.jd.com/client.action?body=%7B%22activity%22%3A%22DEkYTisCipS8mShAk7kTTitphiv%22%2C%22bagKey%22%3A%22oOwnaPwriMNZUPbrFdmArgpDFs1xdg%22%2C%22receiveStatus%22%3A%220%22%2C%22areaSrvInfo%22%3A%220_0_2_0-0-3%22%2C%22srv%22%3A%22%7B%5C%22bord%5C%22%3A%5C%220%5C%22%2C%5C%22bagkey%5C%22%3A%5C%2286717%5C%22%2C%5C%22fno%5C%22%3A%5C%220-0-3%5C%22%2C%5C%22mid%5C%22%3A%5C%2267314179%5C%22%2C%5C%22typ%5C%22%3A%5C%22t2%5C%22%2C%5C%22bi2%5C%22%3A%5C%222%5C%22%2C%5C%22bid%5C%22%3A%5C%220%5C%22%2C%5C%22aid%5C%22%3A%5C%2201033029%5C%22%7D%22%2C%22bagId%22%3A%2286717%22%2C%22riskParam%22%3A%7B%22platform%22%3A%223%22%2C%22orgType%22%3A%222%22%2C%22openId%22%3A%22-1%22%2C%22pageClickKey%22%3A%22Babel_LuckyBagGet%22%2C%22eid%22%3A%222K2R5LUAOZLJEGUOKOLKJESKGW3PNC4WENTZX5J3AD5DGPJ43PVTJAKCCDGRSW4T4L3TEYIMPXYCCZLESFIBSEINQU%22%2C%22fp%22%3A%2247e20dca20780a1f6d0c396b8c7ab8fa%22%2C%22shshshfp%22%3A%22ceb39aaa9337529ef76d2a44d0f36bee%22%2C%22shshshfpa%22%3A%2251ffb3d7-f639-517a-db55-de017de82f24-1593939396%22%2C%22shshshfpb%22%3A%22pXq9bWYgnr90io6zFeE2x5g%3D%3D%22%2C%22childActivityUrl%22%3A%22https%253A%252F%252Fh5.m.jd.com%252FbabelDiy%252FZeus%252FYawmWMpPeshD99GbdJcDVJGiwuB%252Findex.html%253FactivityId%253DDEkYTisCipS8mShAk7kTTitphiv%2526isFloat%253D1%2526time%253D2021-11-25%2526key%253DoOwnaPwriMNZUPbrFdmArgpDFs1xdg%2526login%253D1%2526receiveStatus%253D0%2526style%253D2%2526srv%253D%25257B%252522bord%252522%25253A%2525220%252522%25252C%252522bagkey%252522%25253A%25252286717%252522%25252C%252522fno%252522%25253A%2525220-0-3%252522%25252C%252522mid%252522%25253A%25252267314179%252522%25252C%252522typ%252522%25253A%252522t2%252522%25252C%252522bi2%252522%25253A%2525222%252522%25252C%252522bid%252522%25253A%2525220%252522%25252C%252522aid%252522%25253A%25252201033029%252522%25257D%2526areaSrvInfo%253D0_0_2_0-0-3%2526bagId%253D86717%2526windowStyle%253D0%2526customStyle%253D%25257B%252522textFontSize%252522%25253A%25252254%252522%25252C%252522availableText%252522%25253A%252522%2525E6%252581%2525AD%2525E5%252596%25259C%2525E4%2525BD%2525A0%2525E8%2525A2%2525AB%2525E5%2525B9%2525B8%2525E8%2525BF%252590%2525E7%2525A4%2525BC%2525E5%25258C%252585%2525E7%2525A0%2525B8%2525E4%2525B8%2525AD%252522%25252C%252522windowBgPic%252522%25253A%252522http%25253A%25252F%25252Fm.360buyimg.com%25252Fbabel%25252Fjfs%25252Ft1%25252F181562%25252F40%25252F1542%25252F245078%25252F608a6e64Eb19ff57c%25252Fa76b99b9c9fc0fd0.png%252522%25252C%252522receivedText%252522%25253A%252522%2525E6%252581%2525AD%2525E5%252596%25259C%2525E4%2525BD%2525A0%2525E8%25258E%2525B7%2525E5%2525BE%252597%252522%25252C%252522buttonPic%252522%25253A%252522http%25253A%25252F%25252Fm.360buyimg.com%25252Fbabel%25252Fjfs%25252Ft1%25252F182898%25252F32%25252F1505%25252F30650%25252F608a6e71E1a1533ee%25252F973ffdb4a1fca59f.png%252522%25252C%252522textColor%252522%25253A%252522%252523ffffff%252522%25257D%2526moduleId%253Dundefined%2526isUniversal%253D1%2526siteName%253Djdlite%22%7D%7D&screen=1125*2172&client=wh5&clientVersion=1.0.0&sid=bb5717a7dd43e1bd196c373fee18c15w&uuid=15939393960041822512964.912.1637817486719&functionId=lite_babelReceiveLuckyBag4Site&_=1637817502221&callback=jsonp2`,
			"headers": {
				"Accept": "application/json,text/plain, */*",
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept-Encoding": "gzip, deflate, br",
				"Accept-Language": "zh-cn",
				"Connection": "keep-alive",
				"Cookie": cookie,
				"Referer": " https://h5.m.jd.com/",
				"User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
			}
		}
	$.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
			console.log(data);//打印出需要签到的物品详情。
            if (data['retcode'] === 1001) {
              $.isLogin = false; //cookie过期
              return;
            }
            if (data['retcode'] === 0 && data.data && data.data.hasOwnProperty("userInfo")) {
              $.nickName = data.data.userInfo.baseInfo.nickname;
            }
          } else {
            console.log('京东服务器返回空数据');
          }
        }
      } catch (e) {
        $.logErr(e)
      } finally {
        resolve();
      }
    })//$.get(options, (err, resp, data) => {
	})//return new Promise(async resolve => {
}//最后的大括号

function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 13) {
              $.isLogin = false; //cookie过期
              return
            }
            if (data['retcode'] === 0) {
              $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
            } else {
              $.nickName = $.UserName
            }
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
