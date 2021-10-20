/*
签到免单
短期活动
脚本更改参照：MM豆豆
活动路径：https://signfree.jd.com/?activityId=PiuLvM8vamONsWzC0wqBGQ&lng=116.451748&lat=25.667077&sid=538d4cff455fbcd0a48217f9612cca1w&un_area=16_1362_1365_45002&utm_source=iosapp&utm_medium=liteshare&utm_campaign=t_335139774&utm_term=Qqfriends&ad_od=share&utm_user=plusmember
================Loon==============
[Script]
cron "3 1-23/12 * * *" script-path=https://gitee.com/lxk0301/jd_scripts/raw/master/jd_car_exchange.js, tag=签到免单

 */
const $ = new Env('签到免单');
const moment = require('moment');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let jdNotify = false;//是否关闭通知，false打开通知推送，true关闭通知推送
const randomCount = $.isNode() ? 1 : 1;//运行2次。相隔1秒一次
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
  };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action?';
let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }
  //await wait(50000)延时50000毫秒
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
  await TotalBean()
}

function showMsg() {
  return new Promise(resolve => {
    $.msg($.name, '', `【京东账号${$.index}】${$.nickName}\n${message}`);
    resolve()
  })
}

function TotalBean() {
	return new Promise(async resolve => {
		const options = {
			"url": `https://api.m.jd.com/?functionId=signFreeHome&body={%22linkId%22:%22PiuLvM8vamONsWzC0wqBGQ%22}&t=1634366231525&appid=activities_platform&client=H5&clientVersion=1.0.0&h5st=20211016143711647%3B6757289765640134%3B9cca1%3Btk02w78391b3018nByl3hGPr3zJ9B2F5PFAnWb8e%2BIfxQMYHnNuDG%2FWhFWH4xcExN7Nt2p1u7Vg4fTapGXcFn3iRDvV9%3B0dce837abd9e94a960d8fdcb4d82d9958f6692dc9892c8f75273ab53f0ab2729%3B3.0%3B1634366231647`,
			"headers": {
				"Accept": "application/json,text/plain, */*",
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept-Encoding": "gzip, deflate, br",
				"Accept-Language": "zh-cn",
				"Connection": "keep-alive",
				"Cookie": cookie,
				"Referer": "https://signfree.jd.com/?activityId=PiuLvM8vamONsWzC0wqBGQ&lng=117.020205&lat=25.074926&sid=3347d4988324d948d7e998cb7b7cdbbw&un_area=16_1362_44319_55501",
				"User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
			}
		}
		$.get(options, (err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`);
					console.log(`${$.name} API请求失败，请检查网路重试`)
				} else {
					if (safeGet(data)) {
						data = JSON.parse(data);
						data = JSON.stringify(data.data.signFreeOrderInfoList);
						//console.log(data);//打印出需要签到的物品详情。
						data = JSON.parse(data);
						//console.log(data);
						var obj1 = eval(data);  
						//console.log(obj1[0].orderId);
						//console.log(obj1[1].orderId);
						//console.log(obj1[2].orderId);
						for (let i = 0; i < 3; i++) {
							//测试开始签到
							const optionss = {
								"url": `https://api.m.jd.com/`,
								"headers": {
									"Accept": "application/json,text/plain, */*",
									"Content-Type": "application/x-www-form-urlencoded",
									"Accept-Encoding": "gzip, deflate, br",
									"Accept-Language": "zh-cn",
									"Connection": "keep-alive",
									"Cookie": cookie,
									"Referer": "https://signfree.jd.com/?activityId=PiuLvM8vamONsWzC0wqBGQ&lng=117.020205&lat=25.074926&sid=3347d4988324d948d7e998cb7b7cdbbw&un_area=16_1362_44319_55501",
									"User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
								},
								body: "functionId=signFreeSignIn&body=%7B%22linkId%22%3A%22PiuLvM8vamONsWzC0wqBGQ%22%2C%22orderId%22%3A"+[obj1[i].orderId]+"%7D&t=1634355472032&appid=activities_platform&client=H5&clientVersion=1.0.0"
							}
							$.post(optionss, (err, resp, data) => {
							  try {
								if (err) {
								  console.log(`${JSON.stringify(err)}`);
								  console.log(`${$.name} user/exchange/bean API请求失败，请检查网路重试\n`)
								} else {
								//console.log(data);
								  if (safeGet(data)) {
									data = JSON.parse(data);
									//console.log(optionss.body);//输出body看看获取的orderId是否正确
									console.log(`${obj1[i].productName}\n 需要签到总天数：${obj1[i].needSignDays}\n 已经签到天数：${obj1[i].hasSignDays}\n 签到返还金额：${obj1[i].freeAmount}\n 结果：${JSON.stringify(data)}\n`);
									var str="{"+data+"}";
									if(str.indexOf('"success":true') !=-1){
										notify.sendNotify($.name, `京东账号  ${$.index}】${$.nickName}\n ${obj1[i].productName}\n 需要签到总天数：${obj1[i].needSignDays}\n 已经签到天数：${obj1[i].hasSignDays}\n 签到返还金额：${obj1[i].freeAmount}\n 结果：`+"签到成功，请手动查看！");
										}else{
										notify.sendNotify($.name, `京东账号  ${$.index}】${$.nickName}\n${obj1[i].productName}\n 需要签到总天数：${obj1[i].needSignDays}\n 已经签到天数：${obj1[i].hasSignDays}\n 签到返还金额：${obj1[i].freeAmount}\n  结果：${JSON.stringify(data.errMsg)}`);
										}
								  }
								}
							  } catch (e) {
								$.logErr(e, resp)
							  } finally {
								resolve();
							  }
							})
							//测试开启签到结束		
													}
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
			}
			finally {
				resolve();
			}
		}
		//这里写签到数据
		
		)
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
/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { console.log('done!'); s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
function dateFtt(fmt, date) { var o = { "M+": date.getMonth() + 1, "d+": date.getDate(), "h+": date.getHours(), "m+": date.getMinutes(), "s+": date.getSeconds(), "q+": Math.floor((date.getMonth() + 3) / 3), "S": date.getMilliseconds() }; if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)); for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); return fmt }
/*****************************************************************************/