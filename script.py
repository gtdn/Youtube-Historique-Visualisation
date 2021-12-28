import urllib.request
import json, requests

def getResponse(url):

    try:
        operUrl = urllib.request.urlopen(url)
        data = operUrl.read()
        jsonData = json.loads(data)
        error = False
    except Exception as e:
        error = True
        print(e, ", url return :",operUrl.getcode())

    return (error,jsonData)

with open('data/history/watch-history_2.json') as f:
    data = json.load(f)

dataFile =  "data/temporaryDatas.json"
with open(dataFile) as f:
    previousData = json.load(f)

apiKey = 'AIzaSyBZ-BcTFC8CFSfr4O5k_MrzpfuGw7j2H3U'
debut = 4001
fin = 8000
datasRetour = []
error = False
for i,d in enumerate(data):
    if error==False:
        if i >= debut and i <= fin:
            try:
                video_id = d['titleUrl'][32:]
                url = "https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id="+video_id+"&key="+apiKey
                error, jsonData = getResponse(url)
                jsonData["date"] = d['time']
                datasRetour.append(jsonData)
            except  Exception as e:
                print('error type :',e,' during iteration :',i)
    else:
        print('error during : ',i,'code error : ',error)
        break;

datasRetour = previousData + datasRetour
datasJson = json.dumps(datasRetour, ensure_ascii=False, indent=4)
with open(dataFile, 'w') as f:
    f.write(datasJson)
