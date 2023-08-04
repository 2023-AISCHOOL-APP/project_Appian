# 웹 마이크로프레임워크 : flask
# 오류 -> No module -> terminal 다음과 같이
# pip install flask
# Ctrl + Shift + p
# Flask : routing, run
# render_template : templates directory 안의 html 문서 호출
# request : 외부에서 오는 data 수신시 필요
from flask import Flask, render_template, request
from flask_cors import CORS
import json
from flask import Response
from functools import wraps
import db

app = Flask(__name__)
CORS(app)
app.config['JOSON_AS_ASCII'] = False

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
    res = db.result

    for data in res:
        print(data[0],data[1])

    return "SUCCESS"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5022)