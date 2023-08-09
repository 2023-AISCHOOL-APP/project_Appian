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


@app.route('/add', methods=['POST'])
@as_json
def add():
    sido = request.args.get('sido', 'Unknown')
    sigungu = request.args.get('sigungu', 'Unknown')
    print('받은데이터', sido, sigungu)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    # 3. SQL 전송
    # farm_num	use_id	farm_type	farm_title	farm_sector	sidos	sigungus	farm_address	lental_area	price	lantitude	longitude	lental_type	app_startDate	app_endDate	lental_startDate	lental_endDate	description
 
    # CREATE SEQUENCE farm_seq
    # START WITH 1
    # INCREMENT BY 1
    # NOCACHE;
    
    #  INSERT INTO farm (farm_num, column1, column2) 
    # VALUES (farm_seq.NEXTVAL, '값', '값1');

    sql = "insert into farm values ('farm_num', '40', '010-5678-1234')"
    conn.commit()

    curs.close()
    conn.close()


# ==================== 텃밭구하기 ==================== #
@app.route('/farm', methods=['GET'])
@as_json
def farm():
    print('# ==================== 텃밭구하기 ==================== #')
    # 클라이언트로부터 전송된 GET 파라미터 받기
    sido = request.args.get('sido', 'Unknown')
    sigungu = request.args.get('sigungu', 'Unknown')
    print('받은데이터: ', sido, sigungu)


    # 1. Connection 생성
    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')

    # 2. Cursor 생성
    curs = conn.cursor()

    # 3. SQL 전송
    # sql = "insert into member_cm values ('im', '40', '010-5678-1234')"
    # conn.commit()

    # curs.close()
    # conn.close()


    # 4. SQL 수신
    if sido == 'Unknown' or sigungu == 'Unknown':
        sql = "select * from farm where sidos like '%광주광역시%' and sigungus like '%광산구%'"
    else:
        sql = f"select * from farm where sidos like '%{sido}%' and sigungus like '%{sigungu}%'"

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
    # response = resList
    return resList
    # print('응답데이터', response)
    # return json.dumps(response, ensure_ascii=False)
    # return jsonify(response)

# ==================== 자랑하기 글 추가 ==================== #
@app.route('/add_content', methods=['GET', 'POST'])
@as_json
def add_content():
    print('# ==================== 자랑하기 글 추가 ==================== #')
    content_title = request.args.get('content_title', 'Unknown')
    # user_id = request.args.get('user_id', 'Unknown')
    contents = request.args.get('contents', 'Unknown')
    # content_img = request.args.get('content_img', 'Unknown')
    print('받은데이터: ')

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = "insert into content values (content_seq.NEXTVAL,'{content_title}', '{contents}', '{image_path}')"
    conn.commit()
   
    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)
    curs.close()
    conn.close()
    return res


# ==================== 자랑하기 게시판 ==================== #
@app.route('/content', methods=['GET', 'POST'])
@as_json
def content():
    print('# ==================== 자랑하기 게시판 ==================== #')
    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    sql = "select * from content"
    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답 :', res)
    curs.close()
    conn.close()
    resList = []
    for a in res:
        resList.append({"content_num":a[0],
                        "content_title":a[1], 
                        "user_id":a[2],
                        "contents":a[3], 
                        "content_img": a[4], 
                        "write_time":a[5]
                        })
    return resList


if __name__ == '__main__':
    # app.run(debug=True)

    app.run(host='0.0.0.0', port=5022)