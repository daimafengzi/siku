/*
京东临时9.9减9优惠券
短期活动

活动入口：京东APP首页-京东汽车-屏幕右中部，车主福利
活动网页地址：https://u.jd.com/aK2gU7C

================Loon==============
[Script]
cron "55 59 12 * * *" script-path=https://gitee.com/lxk0301/jd_scripts/raw/master/jd_car_exchange.js, tag=京东临时9.9减9优惠券

 */
const $ = new Env('京东临时9.9减9优惠券');
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
  return new Promise(resolve => {
    $.post(taskUrl('functionId=lite_newBabelAwardCollection'), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} user/exchange/bean API请求失败，请检查网路重试\n`)
        } else {
          console.log(data);
          if (safeGet(data)) {
            data = JSON.parse(data);
            console.log(`【京东临时9.9减9优惠券抢券结果】${JSON.stringify(data.subCodeMsg)}\n`);
			//自行添加通知项目开始
			var str="{"+data.subCodeMsg+"}";
			if(str.indexOf('领取成功') !=-1){
				notify.sendNotify($.name, `京东账号  ${$.nickName || $.UserName}\n【京东临时9.9减9优惠券抢券结果】${JSON.stringify(data.subCodeMsg)}`);
				}
			//自行添加通知项目结束
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

function taskUrl(function_id, body = {}) {
  return {
    url: `https://api.m.jd.com/client.action?functionId=newBabelAwardCollection`,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      'origin': 'https://pro.m.jd.com',
      "Referer": 'https://pro.m.jd.com/mall/active/FtmXeqtCX3QMbM1jJXy89CHzfC8/index.html?utm_campaign=t_1000894247_&utm_term=87981b7c1fa44a0ba8584e80a4dcbe49&utm_medium=tuiguang&tttparams=Ti2jzeyJncHNfYXJlYSI6IjE2XzEzNjJfMTM2NV80NTAwMiIsInByc3RhdGUiOiIwIiwidW5fYXJlYSI6IjE2XzEzNjJfMTM2NV80NTAwMiIsIm1vZGVsIjoiaVBob25lMTAsMyIsImdMYXQiOiIyNS42NjU0MjEiLCJnTG5nIjoiMTE2LjQxODY0IiwibG5nIjoiMTE2LjQ1MTg3MSIsImxhdCI6IjI1LjY2Njk2NS5J9&utm_source=kong&cu=true&un_area=16_1362_1365_45002&lng=116.4518713584913&lat=25.66696509631094',
      "Cookie": cookie,
      "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
    },
    body: "body=%7B%22activityId%22%3A%222KxaKmeh5hQkkGY6PGF6etgSFUp4%22%2C%22gridInfo%22%3A%22%22%2C%22scene%22%3A%221%22%2C%22args%22%3A%22key%3DD48CA99DF62B81DB75BAAD72ECA22151772C8F637AE23981E6223B9E50D87DE59C7CF6E97E9B19ADDC3F08FC0331D060_bingo%2CroleId%3DBE214A61D2B87066E300E3CA25EB622B56FB67596CFA321A2FD40EE7A454D11CF53680EC25F7D50ABFDC03410757D9FD6B7BF6BE848712978BC64AF38733AC7EC8E44C15DB7E6849DA59F90A575C1D2A510C191F42D7E23D7757DD7A2F0F75780497662BBF2A818C909B11062590F15C300660004D6972A6F88388F1C683C15BF07EC5C358BA6860AD75192E71FF34701D9FE07A322BE0EA7A9AB6ED928703866DC7247A83C09E954050FA700CCEF36B_bingo%2CstrengthenKey%3DC19299A3198F36E62250EA422B1983B7C96B54A35FE801EF041A0C694F566314B5A968B2191397A3641C148EDE9FB6B8_bingo%22%2C%22platform%22%3A%221%22%2C%22orgType%22%3A%222%22%2C%22openId%22%3A%22-1%22%2C%22pageClickKey%22%3A%22-1%22%2C%22eid%22%3A%22eidI0b54812328seebAyaukpR4y9zWYzE%2B0sF3mwM9im%2BFgr%2Fg7JR%2F1SPbToIKGk4tiz8UVx%2Byk66RKm2m5ZocaDggzMvWVQecjwDeudH00natktVTNN%22%2C%22fp%22%3A%22-1%22%2C%22shshshfp%22%3A%2260fa8a340ee893575dd535af1701a7fc%22%2C%22shshshfpa%22%3A%229160be3c-f084-b052-a271-89f57cd0721c-1620113231%22%2C%22shshshfpb%22%3A%22splZF4Wonj3lp2HYHAit94g%22%2C%22childActivityUrl%22%3A%22https%253A%252F%252Fprodev.m.jd.com%252Fmall%252Factive%252F2KxaKmeh5hQkkGY6PGF6etgSFUp4%252Findex.html%253Ftttparams%253DINlEYJHfjeyJncHNfYXJlYSI6IjE2XzEzNjJfMTM2NV80NTAwMiIsInByc3RhdGUiOiIwIiwidW5fYXJlYSI6IjE2XzEzNjJfMTM2NV80NTAwMiIsImRMYXQiOiIiLCJnTGF0IjoiMjUuNjY4MjE5IiwiZ0xuZyI6IjExNi40MzAzMTYiLCJsbmciOiIxMTYuNDUxODU4IiwibGF0IjoiMjUuNjY2OTk0IiwiZExuZyI6IiIsIm1vZGVsIjoiaVBob25lMTAsMy9J9%2526_openapp%253D1%2526sid%253D1baaefca253c973e0f03fb1e0584451w%2526un_area%253D16_1362_1365_45002%22%2C%22userArea%22%3A%22-1%22%2C%22client%22%3A%22%22%2C%22clientVersion%22%3A%22%22%2C%22uuid%22%3A%22%22%2C%22osVersion%22%3A%22%22%2C%22brand%22%3A%22%22%2C%22model%22%3A%22%22%2C%22networkType%22%3A%22%22%2C%22jda%22%3A%22-1%22%2C%22pageClick%22%3A%22Babel_Coupon%22%2C%22couponSource%22%3A%22manual%22%2C%22couponSourceDetail%22%3A%22-100%22%2C%22channel%22%3A%22%E9%80%9A%E5%A4%A9%E5%A1%94%E4%BC%9A%E5%9C%BA%22%2C%22batchId%22%3A%22878080629%22%2C%22headArea%22%3A%22af5eee1bfefb75f18157cbefd67a9f770d6f6c6a9e97d67b35185bb9b2234235%22%2C%22siteClient%22%3A%22apple%22%2C%22mitemAddrId%22%3A%22%22%2C%22geo%22%3A%7B%22lng%22%3A%22116.451858%22%2C%22lat%22%3A%2225.666994%22%7D%2C%22addressId%22%3A%222274330971%22%2C%22posLng%22%3A%22116.430316%22%2C%22posLat%22%3A%2225.668219%22%2C%22un_area%22%3A%2216_1362_1365_45002%22%2C%22gps_area%22%3A%2216_1362_1365_45002%22%2C%22homeLng%22%3A%22116.430316%22%2C%22homeLat%22%3A%2225.668219%22%2C%22homeCityLng%22%3A%22%22%2C%22homeCityLat%22%3A%22%22%2C%22focus%22%3A%22%22%2C%22innerAnchor%22%3A%22%22%2C%22cv%22%3A%222.0%22%2C%22log%22%3A%221654592949184~1aT3j7ZDeILMDFueENZWTk5MQ%3D%3D.X052bWxXSnptbl1NeydvWU00GggLSjkvJ19UdXVoQkk9aydfBjApNTQ%2Bdw42ABJwNSlcMBoRGAcMem0%2BEA%3D%3D.4ae6e9b2~1%2C1~5BBB605950992C87919AAEB2EDD44BC5683A06A1~11omrr8~C~TRZNVBQLbWkVG0JfWxYDYhRVAxkBYBoGYhgLeGwdVxhNGxoTUgMUAW8dAWAVC3VgGlUVTRRsGhZeS1gTDAUVG0VCFA4bCAAEAgEACw8FAAUMDgAFBwIbFRRGU1AbAxRFQkBNTVBEUBYVG0FUVxYDG1BXQkBNTUNQFBgbSVJfFA5iDQQdBQwKFQcFGg0VCBoEaxgbU1wTDAUVG1VCFA4bXVcABFJdWlRQUlYNWwZTBVAAXw8BB1dYWgMEDgQBWgcTGhZXSRQLFF1pUVlfUxYVG0ITDAUPDAIEDwYADQ8ADgAVG1xaFA4bXAJUAFcLWAMBDgJYWg4CBwZdDQAHAVFaAQYDUwcPW1cJVAEJDFVQVBYVG1BBVBYDG0VBWm5%2FDWFeWF4KVUYDfm1xeF9FDwBeGxoTWEIbAxRwRkRVXBZyWVlJTEJURBgZcFhSGBYVG1hQQBYDGwcHDgUJDxQdFEdaSxQLbQwICxoCAQFkFRRDWRYDYhRYZlxWV1MABhgKGxoTX3tqGxoTBwEXDBQdFAUIFwYfAhYVGwcHDgUJDxQdFFENXABSBFUMCQ4HV1cBCgcDUgAPDwFUVQwJC1MCAFZYAVQEBgFaWFQTGhZYG2sdFF1WWBQLFFJfX1BXUEBNGxoTV14bAxREFBgbWl8TDBZOChgEGAYbFRRSUGtPGwwTDw0bFRRTUhYDG0RQWFBWVAtLd0BYfXFjWhYVG1tbFA5iCBoBGgRkFRRTWlteGwwTBwIMDQMIBA0NDA8BBUoIeFh%2FYGF4fVwIZnl9f2djc3p7WlxwTnp4BAsfb2xzC1JkUkRdV0YAZ3NVTlVLDn1gCnNHUl9WcFBpe0F9emxeeWMIYFB5Yw1dTk5ZeV1gTHUDd1F1an9YV2dgW31ZQht%2FTmQBd3ZSXVJcAlZ0CmcBeWF4Y3dzZAF6QGNkcU1de3lLd39dfH9ad1N%2FDXlbWU5zaGdYd2xOdXVLWllye3dDZmdaaHNyXRt8QwZTd1NwWHdGQW12QHtEf1lWAXhZf0V8fA9FeVMEBBgAVQUMDVACA0pOFQdPSEp7R2JzUmFhQWd%2FcGJjYXFGRnxqe3xTZ3VeamNjZ1J%2Ff0Z3cGUJYXBjWWFoQWNhZFN4e2BnVWd%2FfHRjYFldeHNgQWJ7aG9ncWZvfHBwBmJ%2FCVFpY2ZdfnVZRmdxXnd4dFN0bHFJUmN%2FaA5ncHFKBEgARgJcCVJcFBgbVEVWFA4bG0s%3D~1tzi8lx%22%2C%22random%22%3A%22zAtaDGRl%22%2C%22floor_id%22%3A%2279330991%22%7D&screen=1125*2172&client=wh5&clientVersion=1.0.0&sid=1baaefca253c973e0f03fb1e0584451w&uuid=&area=16_1362_1365_45002&ext=%7B%22prstate%22%3A%220%22%7D"
  }
}


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
