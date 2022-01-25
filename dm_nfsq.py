# -*- coding: utf8 -*-
import requests
from time import sleep
from json import dumps
from random import uniform
 
#做任务必填
 
#自己的ID
user_id = "WXoSLos5E2Jn_4nI_04sfGNMjthTAY1600711680"
#助力的ID 只需要2个
assistance_user_id = [
    "",
    ""
]
 
 
#可不填
 
#微信推送
token = ""
 
#用于抽奖,查询道具 (可能会过期，没试过)
apitoken = "17d97be9447841b29ae2ece286d8407e0665b44cf4c94eafa12cf0108c8692c1"
 
#############################################
 
header = {
    "actcode": "ACT39912445427025182721600711680",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.17(0x1800112a) NetType/WIFI Language/zh_CN"
}
 
#任务列表 助力1 助力2 签到 访问商店 观看视频 领取助力奖励
tasklist = [{
        "url": "https://nongfuwaterpro.kifa.site/api/v1/goldtiger/specialuserassistance",
        "data": {
                "user_id": user_id,
                "assistance_user_id": assistance_user_id[0]
        }
}, {
        "url": "https://nongfuwaterpro.kifa.site/api/v1/goldtiger/specialuserassistance",
        "data": {
                "user_id": user_id,
                "assistance_user_id": assistance_user_id[1]
        }
}, {
        "url": "https://nongfuwaterpro.kifa.site/api/v1/goldtiger/usersign",
        "data": {
                "user_id": user_id
        }
}, {
        "url": "https://nongfuwaterpro.kifa.site/api/v1/goldtiger/userviewshop",
        "data": {
                "user_id": user_id
        }
}, {
        "url": "https://nongfuwaterpro.kifa.site/api/v1/goldtiger/userviewvideo",
        "data": {
                "url": "https://cdn.geement.com/sfiles/NongFu/JinHuWater/video.mov",
                "user_id": user_id
        }
}, {
        "url": "https://nongfuwaterpro.kifa.site/api/v1/goldtiger/completeassistancetask",
        "data": {
                "user_id": user_id
        }
}]
 
#日志推送至微信
def Send(senddata):
    url = "http://www.pushplus.plus/send/"
    data = {
        "token": token,
        "title": "农夫山泉任务",
        "content": senddata
    }
    headers = {'Content-Type':'application/json'}
    res = requests.post(url,data=dumps(data).encode(encoding='utf-8'),headers=headers)
    print(res.text)
 
#任务请求
def task(url,data):
    res = requests.post(url,headers=header,data=data).json()
    if res['success'] :
        return([True,res['data']])
    else:
        return([False,res['msg']])
 
#执行任务
def do_task():
    for i in tasklist:
        result = task(i['url'],i['data'])
        if result[0]:
            print(f"任务成功:{result[1]}")
        else:
            print(f"任务失败:{result[1]}")
        sleep(float('%.1f' % uniform(1,3)))
 
#检查助力结果中有无金虎水
def check():
    url = "https://nongfuwaterpro.kifa.site/api/v1/goldtiger/assistancewinlogs"
    data = {
        "user_id": user_id
    }
    res = requests.get(url,headers=header,data=data).json()
    if res['success'] :
        return([True,"金虎水" in res['data']])
    else:
        return([False,res['msg']])
 
#执行检查结果
def do_check():
    result = check()
    if result[0]:
        if result[1] :
            tiger = "助力结果中有金虎水，请查看"
            #Send(tiger)
        else:
            tiger = "助力结果中没有金虎水"
             
        print(f"检查成功:{tiger}")
    else:
        print(f"检查失败:{result[1]}")
         
#抽奖
def luck():
    url = "https://gateway.jmhd8.com/geement.act.lottery/api/v1/act/luck"
    header['apitoken'] =  apitoken
    header['content-type'] =  "application/json"
    data = {
        "code":"SCENE-202112141751413893661600711680",
        "scene_code":"SCENE-202112141751413893661600711680",
        "seniority_coupon":[
            {
                "sen_code":"SEN39912392052451573761600711680",
                "sen_consume_count":1
            }
        ]
    }
    res = requests.post(url,headers=header,data=dumps(data)).json()
 
    if res['success'] :
        return([True,res['data']['win_prize_info']['prize_level'],res['data']['win_prize_info']['prize_name']])
    else:
        return([False,res['msg']])
 
     
#去抽奖
def do_luck():
    while True:
        result = luck()
        if result[0]:           
            print(f"抽奖成功:获得{result[1]}-{result[2]}")
            sleep(float('%.1f' % uniform(2,5)))
        else:
            print(f"抽奖失败:{result[1]}")
            break
 
#获取已有道具
def get_prop_count():
    url = "https://gateway.jmhd8.com/geement.usercenter/api/v1/user/seniority?sencodes=SEN39912387395264184321600711680,SEN39912388659175751681600711680,SEN39912389412850237441600711680,SEN39912390071733452801600711680,SEN39912390735230402561600711680"
    header['apitoken'] =  apitoken
    header['content-type'] =  "application/x-www-form-urlencoded"
    res = requests.get(url,headers=header).json()
    if res['success'] :
        print("您现在拥有的道具为:")
        for i in res['data']:
            if i['sen_code'] == "SEN39912388659175751681600711680":
                prop_name = "衣服"
            if i['sen_code'] == "SEN39912389412850237441600711680":
                prop_name = "虎头鞋"
            if i['sen_code'] == "SEN39912390071733452801600711680":
                prop_name = "围巾"
            count = i['total_count']
            print(f"\t{prop_name}:{count}个")
             
    else:
        print(f"获取失败:{res['msg']}")
         
def main():
    do_task()      #做任务
    #do_luck()       #抽奖
    do_check()     #检查结果有无金虎水
    #get_prop_count()#获取拥有道具数量
     
def main_handler(event, context):
    return main()
 
if __name__ == '__main__':
    main()