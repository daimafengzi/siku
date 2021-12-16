/*
export XMLY_SPEED_COOKIE='{"Cookie":"xz_jkd_appkey=替换的CK"}'

多账号用&隔开
*/
// [task_local]
// */60 * * * * http://47.101.146.160/scripts/jkd.js, tag=快手极速版, img-url=circles.hexagongrid.fill.system, enabled=true

const $ = new Env('快手极速版');
const notify = $.isNode() ? require('./sendNotify') : '';
let XMLY_SPEED_COOKIEArr = [],message, allMessage = '';
let XMLY_SPEED_COOKIE= $.isNode() ? (process.env.XMLY_SPEED_COOKIE ? process.env.XMLY_SPEED_COOKIE : "") : ($.getdata('XMLY_SPEED_COOKIE') ? $.getdata('XMLY_SPEED_COOKIE') : "")
let XMLY_SPEED_COOKIEs = ""
$.signinfo = {}
const logs =0;
let time = new Date().getTime()

var timestamp = Math.round(new Date().getTime()/1000).toString();
!(async () => {
      if($.isNode()){
          if (process.env.XMLY_SPEED_COOKIE && process.env.XMLY_SPEED_COOKIE.indexOf('&') > -1) {
            XMLY_SPEED_COOKIEArr = process.env.XMLY_SPEED_COOKIE.split('&');
            console.log(`您选择的是用"&"隔开\n`)
        } else {
            XMLY_SPEED_COOKIEs = [process.env.XMLY_SPEED_COOKIE]
        };
        Object.keys(XMLY_SPEED_COOKIEs).forEach((item) => {
        if (XMLY_SPEED_COOKIEs[item]) {
            XMLY_SPEED_COOKIEArr.push(XMLY_SPEED_COOKIEs[item])
        }
    })
          console.log(`共${XMLY_SPEED_COOKIEArr.length}个cookie`)
	        for (let k = 0; k < XMLY_SPEED_COOKIEArr.length; k++) {
                XMLY_SPEED_COOKIE = XMLY_SPEED_COOKIEArr[k]
                $.index = k + 1;
          console.log(`\n开始【快手极速版${$.index}】`)
          //$.log(XMLY_SPEED_COOKIEs)
		//await ptqdchaxun()
		//await txqiandao()
	        }
      }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

//执行普通签到
function ptqiandao() {
  return new Promise((resolve, reject) => {
    const url = {
      url: `https://hybrid.ximalaya.com/web-activity/signIn/action?aid=8&ts=${time}&_sonic=0&impl=com.gemd.iting&_sonic=0`,
      headers: { Cookie: XMLY_SPEED_COOKIEs }
    }
    url.headers['Accept'] = 'application/json, text/plain, */*'
    url.headers['Accept-Encoding'] = 'gzip, deflate, br'
    url.headers['Accept-Language'] = 'zh-cn'
    url.headers['Connection'] = 'keep-alive'
    url.headers['Host'] = 'hybrid.ximalaya.com'
    url.headers['User-Agent'] =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 iting/6.6.45 kdtunion_iting/1.0 iting(main)/6.6.45/ios_1'
    $.post(url, (error, response, data) => {
      try {
        $.signinfo.sign = JSON.parse(response.body)
        resolve()
      } catch (e) {
		message += `签到结果: 失败`, `说明: ${e}\n\n`
        console.log(`❌ ${$.name} ptqiandao - 签到失败: ${e}`)
        console.log(`❌ ${$.name} ptqiandao - response: ${JSON.stringify(response)}`)
        resolve()
      }
    })
  })
}

function ptqdchaxun() {
  return new Promise((resolve, reject) => {
    const url = { url: `https://m.ximalaya.com/starwar/lottery/check-in/record`, headers: { Cookie: XMLY_SPEED_COOKIEs } }
    url.headers['Accept'] = `application/json, text/plain, */*`
    url.headers['Accept-Encoding'] = `gzip, deflate, br`
    url.headers['Accept-Language'] = `zh-cn`
    url.headers['Connection'] = `keep-alive`
    url.headers['Content-Type'] = `application/json;charset=utf-8`
    url.headers['Host'] = `m.ximalaya.com`
    url.headers['User-Agent'] =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 iting/6.6.45 kdtunion_iting/1.0 iting(main)/6.6.45/ios_1'
    $.get(url, (error, response, data) => {
      try {
        $.signinfo.info = JSON.parse(data)
		//$.signinfo.info = JSON.stringify(data.body)
		//console.log(`${$.signinfo.info.continuousDays}`)
		let subTitle = ''
		let detail = ''
		if ($.signinfo.info.isTickedToday == false) {
		txqiandao();
		if ($.signinfo.sign.data.status == 0) {
		  subTitle = '签到: 成功'
		  detail = `当前连签: ${$.signinfo.info.continuousDays + 1}天, 积分: ${$.signinfo.info.awardAmount}`
		} else if ($.signinfo.sign.data.msg != undefined) {
		  subTitle = '签到: 失败'
		  detail = `说明: ${$.signinfo.sign.data.msg}`
		} else {
		  subTitle = '签到: 失败'
		  detail = `说明: Cookie失效`
		}
		  } else {
			subTitle = `重复签到`
			detail = `当前连签: ${$.signinfo.info.continuousDays}天, 积分: ${$.signinfo.info.awardAmount}`
		  }
		 console.log(`普通版签到：${subTitle} ${detail}`)
		 message += `普通版签到：${subTitle} ${detail}`
      } catch (e) {
        $.msg($.name, `获取签到信息: 失败`, `说明: ${e}`)
        $.log(`❌ ${$.name} ptqdchaxun - 获取签到信息失败: ${e}`)
        $.log(`❌ ${$.name} ptqdchaxun - response: ${JSON.stringify(response)}`)
        resolve()
      }
    })
  })
}

//执行提现签到
function txqiandao() {
  return new Promise((resolve, reject) => {
    const url = {
      "url": `https://m.ximalaya.com/speed/task-center/check-in/check`,
      "headers": {
				"Host": "mwsa.ximalaya.com",
				"Accept": "application/json,text/plain, */*",
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept-Encoding": "gzip, deflate, br",
				"Accept-Language": "zh-Hans-CN;q=1",
				"Connection": "keep-alive",
				"Cookie": "domain=.ximalaya.com; path=/; channel=ios-b1; impl=com.ximalaya.tingLite; 1&_device=iPhone&57705536-AA77-4A01-A630-9A4D462669E4&2.3.10; XUM=57705536-AA77-4A01-A630-9A4D462669E4; device_model=iPhone X; c-oper=%E6%9C%AA%E7%9F%A5; net-mode=WIFI; ip=2408:854a:7450:1066:3b20:6e65:742d:6d6f; res=1125%2C2436; NSUP=; ainr=0; XD=mM/H065qlpooAmCIYhzNt+Wp9YTRC5+SnDxUkkCEZoKJOelrmzKOt/aJosXvnOxVYN6dkXe6NOfJvwUyRJjy0Q==; displayMode=0; boot_mark=1637867486.334196; update_mark=1581094806.475319416; idfa=8FEF3DD0-AF87-4090-8131-BD85F6060405; idfaLimit=1; 1&_token=318612638&8A4A68D0140C2670DADE6CF597D16A333F9CD0C5678C73809059CA0449103524ACFE3231FE3E20M7676ADE436AD960_",
				"Referer": "https://m.ximalaya.com/growth-ssr-speed-welfare-center/page/welfare",
				"User-Agent": "ting_v2.3.10_c5(CFNetwork, iOS 15.1, iPhone10,3) ;xmly(lite)/2.3.10/ios_1",
				"Content-Length": "keep-alive",
				"X-Requested-With": "XMLHttpRequest"
			},
		body: "%20%20%22checkData%22%20%3A%20%22SjGA7cH5DsrtNNRXFUMuX69tD907XYbXGLhopmsvEK33iEvtbPHEeAOfK51HyjBHdeSY4ytQh8psUqmN1YPVsJYqniT65E5Bzn4mxkncTvF6J64o5bmhLOkVTsPEjEZNu%2B43kjsIjh6U1yfXyLCrlbUFVsI%2B0uTj74EaPZkbCzQ%3D%22%2C%20%20%22makeUp%22%20%3A%20false"
        }
    $.post(url, (error, response, data) => {
      try {
        //$.signinfo.txsign = JSON.parse(response.body)
		$.signinfo.txsign = JSON.stringify(response.body)
		console.log(`${$.signinfo.txsign}`)
        resolve()
      } catch (e) {
		message += `签到结果: 失败`, `说明: ${e}\n\n`
        console.log(`❌ ${$.name} ptqiandao - 签到失败: ${e}`)
        console.log(`❌ ${$.name} ptqiandao - response: ${JSON.stringify(response)}`)
        resolve()
      }
    })
  })
}

//通知类通用脚本
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("&chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("&chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("&"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^&/.test(t)){const[,s,i]=/^&(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^&/.test(e)){const[,i,r]=/^&(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
