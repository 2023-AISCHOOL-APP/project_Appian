# 웹 마이크로프레임워크 : flask
# 오류 -> No module -> terminal 다음과 같이
# pip install flask
# Ctrl + Shift + p
# Flask : routing, run
# render_template : templates directory 안의 html 문서 호출
# request : 외부에서 오는 data 수신시 필요
from flask import Flask, render_template, request, Response, jsonify
import json
from functools import wraps
from flask_cors import CORS
import db

app = Flask(__name__)
CORS(app)


# 한글깨짐 방지
def as_json(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        res = f(*args, **kwargs)
        res = json.dumps(res, ensure_ascii=False).encode('utf8')
        return Response(res, content_type='application/json; charset=utf-8')
    return decorated_function


@app.route('/')
def index():
    return '<h1>Hello World!<h1>'

@app.route('/login')
def login():
    login_id = 'nayeho'
    return f'{login_id}님 환영합니다'

@app.route('/lee')
def lee():
    return render_template('index.html')

@app.route('/react-send-data')
def getData():
    return 

# money 페이지에서는 GET방식으로 전송받음
@app.route('/money', methods = ['GET', 'POST'])
def money():

    # GET 방식 데이터 수신 : request.args['키값']
    # POST 방식 데이터 수신 : request.form['키값']
    # POST 방식 File 수신 : request.file['키값']
    money = request.args['money']

    return f'입금된 급액은 {money}입니다'

@app.route('/result', methods = ['GET'])
@as_json
def result():
    resList = []
    res = db.result

    for a in res:
        resList.append({"farm_num":a[0], "use_id":a[1], "farm_type":a[2], "farm_title": a[3], "farm_sector":a[4], "sidos":a[5], "sigungus":a[6], "farm_address":a[7], "lental_area":a[8], "price":a[9], "lantitude":a[10], "longitude":a[11], "lental_type":a[12], "app_startDate":a[13], "app_endDate":a[14], "lental_startDate":a[15], "lental_endDate":a[16], "description":a[17]})

    return resList

@app.route('/test', methods = ['GET'])
def test():

    data = request.json
    print('Received data:', data)

    name = data.get('name', 'Unknown')
    response = {'message':f'Hello, {name}!'}
    return jsonify(response)

   
    # return 'test'




    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5022)