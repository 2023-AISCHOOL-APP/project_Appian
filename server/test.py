import cx_Oracle

cx_Oracle.init_oracle_client('instantclient_11_2')


from flask import Flask, render_template, request, Response, jsonify
import json
from functools import wraps
from flask_cors import CORS

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



@app.route('/test', methods=['GET'])
@as_json
def test():
    # 클라이언트로부터 전송된 GET 파라미터 받기
    sidos = request.args.get('sidos', 'Unknown')
    sigungus = request.args.get('sigungus', 'Unknown')
    print('가공데이터', sidos, sigungus)


    # 1. Connection 생성
    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')

    # 2. Cursor 생성
    curs = conn.cursor()

    # 3. SQL 전송
    # sql = "insert into member_cm values ('im', '40', '010-5678-1234')"
    # conn.commit()

    # 4. SQL 수신
    sql = f"select * from farm where sidos='{sidos}' and sigungus='{sigungus}'"

    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)


    # 5. 통로 닫기
    curs.close()
    conn.close()


    resList = []

    for a in res:
        resList.append({"farm_num":a[0], "use_id":a[1], "farm_type":a[2], "farm_title": a[3], "farm_sector":a[4], "sidos":a[5], "sigungus":a[6], "farm_address":a[7], "lental_area":a[8], "price":a[9], "lantitude":a[10], "longitude":a[11], "lental_type":a[12], "app_startDate":a[13], "app_endDate":a[14], "lental_startDate":a[15], "lental_endDate":a[16], "description":a[17]})

    # 받은 데이터를 가공하여 응답
    response = resList
    print('응답데이터', response)
    return json.dumps(response, ensure_ascii=False)
    # return jsonify(response)

if __name__ == '__main__':
    # app.run(debug=True)

    app.run(host='0.0.0.0', port=5022)