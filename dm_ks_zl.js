/*
快手化肥助力
循环助力

[Script]
cron "30 0 1,8,15,22,29 * *" script-path=https://github.com/daimafengzi/siku.git, tag=快手化肥助力
*/
const $ = new Env('快手化肥助力')
let cookieArr = [];
let KS_SHARECODEArr = [], message, allMessage = '';
if ($.isNode()) {
  if (process.env.KS_COOKIE && process.env.KS_COOKIE.indexOf('\n') > -1) {
      KS_COOKIEs = process.env.KS_COOKIE.split('\n');
  } else {
      KS_COOKIEs = process.env.KS_COOKIE.split()
  };
  Object.keys(KS_COOKIEs).forEach((item) => {
        if (KS_COOKIEs[item]) {
          cookieArr.push(KS_COOKIEs[item])
        }
      })
} else {
   cookieArr.push($.getdata('cookie_ks'));
   $.getjson('cookies_ks', []).forEach(cookie => cookieArr.push(cookie));
}
//获取助力码
if ($.isNode()) {
  if (process.env.KS_SHARECODE && process.env.KS_SHARECODE.indexOf('&') > -1) {
      KS_SHARECODEs = process.env.KS_SHARECODE.split('&');
  } else {
      KS_SHARECODEs = process.env.KS_SHARECODE.split()
  };
  Object.keys(KS_SHARECODEs).forEach((item) => {
        if (KS_SHARECODEs[item]) {
          KS_SHARECODEArr.push(KS_SHARECODEs[item])
        }
      })
} else {
   KS_SHARECODEArr.push($.getdata('KS_SHARECODE'));
   $.getjson('ks_sharecode', []).forEach(sharecode => KS_SHARECODEArr.push(sharecode));
}
//获取助力码结束
let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie();
   $.done()
} else {
!(async() => {
  $.oldName = $.name;
 if(!cookieArr[0]){
      $.msg($.name, '【提示】🉐登录快手pp获取cookie',"", {"open-url": "https://live.kuaishou.com/fission/offkwai/index?cc=share_copylink&kpf=IPHONE&traceId=27&fid=1570609569&code=3429390431&shareMethod=token&kpn=KUAISHOU&subBiz=INVITE_CODE&shareId=1000517297081&shareToken=X-1oTjAy1OkMhgQk_AO&platform=copylink&shareMode=app&shareObjectId=3429390431"});
      return
  }
  if ($.isNode()){
	  zhanghao = cookieArr.length
      console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}=============\n`)
	   console.log(`============ 共计${zhanghao}个账号，将进行循环助力  =============\n`)
	   console.log(`-------------------------\n\n默认第一次助力作者。`);
	   await getAuthorShareCode();
  }
//默认第一次助力作者
function getAuthorShareCode() {
    return new Promise(resolve => {
        $.get({
            url: "https://cdn.daimafengzi.com/ks.json",
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        }, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
			//console.log(data);
			//拆分助力码
			var regex = /\s+|,|@|#/;
			var datals = data.split(regex);
			//console.log(KS_SHARECODEVals[0]);
			//console.log(KS_SHARECODEVals[1]);
			fid = datals[0]
			shareObjectId = datals[1]
		  //拆分助力码结束
		  //账号循环
			for (let i = 0; i < cookieArr.length; i++) {
				if (cookieArr[i]) {
				  cookieVal = cookieArr[i];
				  $.index = i + 1;
				//console.log(fid);
				//console.log(shareObjectId);
				console.log(`-------------------------\n\n默认第一次助力作者。【账号${$.index}】开始助力作者`);
				 await officialSign();
				 await(10000);
			   }
			 }
		  //账号循环结束
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

//默认第一次助力作者结束
//助力码循环开始
	 for (let ix = 0; ix < KS_SHARECODEArr.length; ix++) {
		if (KS_SHARECODEArr[ix]) {
		  KS_SHARECODEVal = KS_SHARECODEArr[ix];
		  console.log(`---------------------------------\n\n第：${ix + 1} 个助力码为：${KS_SHARECODEVal}`)
		  //拆分助力码
			var regex = /\s+|,|@|#/;
			var KS_SHARECODEVals = KS_SHARECODEVal.split(regex);
			console.log(KS_SHARECODEVals[0]);
			console.log(KS_SHARECODEVals[1]);
			fid = KS_SHARECODEVals[0]
			shareObjectId = KS_SHARECODEVals[1]
		  //拆分助力码结束
		  //账号循环
			for (let i = 0; i < cookieArr.length; i++) {
				if (cookieArr[i]) {
				  cookieVal = cookieArr[i];
				  $.index = i + 1;
				   console.log(`-------------------------\n\n【账号${$.index}】开始助力第：${ix + 1} 个助力码${KS_SHARECODEVal}`)
				 await officialSign();
				 await(30000);
				 await officialSign2();
			   }
			 }
		  //账号循环结束
		  $.indexs = ix + 1;
	   }
	 }

//助力码循环结束
})().catch((e) => $.logErr(e))
    .finally(() => {
      $.name = $.oldName;
      $.done();
    })
}
function  officialSign() {
   return new Promise((resolve, reject) => {
	 let signurl = {
		url: 'https://ug-fission.kuaishou.com/rest/n/darwin/orchard/overview',
	    headers: {Cookie: cookieVal.replace('kpn=NEBULA', 'kpn=KUAISHOU'),'Content-Type': 'application/json;charset=utf-8'},
        body: '{"fid":"'+fid+'","cc":"share_copylink","followRefer":"151","shareMethod":"TOKEN","sharePosition":"MANURE_AID_INVITE_BUTTON","kpn":"NEBULA","subBiz":"OD_MANURE_SHARE","shareId":"16767952005430","source":"PASSPHRASE_BACK","shareMode":"APP","originShareId":"16767952005430","enableWK":"1","layoutType":"4","shareObjectId":"'+shareObjectId+'","shareUrlOpened":"0","hyId":"orchard","timestamp":"'+Date.now()+'"}'
   }
    $.post(signurl, (error, response, data) => {
		console.log(data);
		//console.log("化肥助力");
       resolve()
      })
   })
 }

function  officialSign2() {
   return new Promise((resolve, reject) => {
	 let signurl = {
		url: 'https://ug-fission.kuaishou.com/rest/n/darwin/orchard/overview',
	    headers: {Cookie: cookieVal.replace('kpn=NEBULA', 'kpn=KUAISHOU'),'Content-Type': 'application/json;charset=utf-8'},
        body: '{"fid":"'+fid+'","cc":"share_copylink","followRefer":"151","shareMethod":"TOKEN","sharePosition":"WATER_AID_INVITE_BUTTON","kpn":"NEBULA","subBiz":"OD_WATER_SHARE","shareId":"16767950760790","source":"PASSPHRASE_BACK","shareMode":"APP","originShareId":"16767950760790","enableWK":"1","layoutType":"4","shareObjectId":"'+shareObjectId+'","shareUrlOpened":"0","hyId":"orchard","timestamp":"'+Date.now()+'"}'
   }
    $.post(signurl, (error, response, data) => {
		console.log(data);
		//console.log("水滴助力");
       resolve()
      })
   })
 }


function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
