import cx_Oracle
import os
from datetime import datetime
from flask import Flask, render_template, request, Response, jsonify
from flask import Flask, send_from_directory

import json
from functools import wraps
from flask_cors import CORS

today = datetime.now().strftime('%Y-%m-%d')

cx_Oracle.init_oracle_client('instantclient_11_2')

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


# 이미지 파일이 저장된 디렉토리의 경로 설정
UPLOAD_FOLDER = './content_img'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# 이미지 파일 제공을 위한 라우트 설정
@app.route('/content_img/<filename>')
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# ==================== 로그인 ==================== #
@app.route('/login', methods=['POST'])
@as_json
def login():
    print('# ==================== 로그인 ==================== #')
    data2 = request.json
    data = data2.get('form', {})
    user_id = data.get('user_id', 'Unknown')
    user_password = data.get('user_password', 'Unknown')
    print('받은데이터:', data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = f"select user_id, user_nick, user_type from member where user_id = '{user_id}' and user_password = '{user_password}'"
    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)

    resList = []

    if not res:
        result = False
    else:
        for a in res:
            resList.append({"user_id":a[0], "user_nick":a[1], "user_type":a[2]})
        result = resList

    curs.close()
    conn.close()
    print('응답메시지: ', result)

    return result


# ==================== 회원가입 아이디 중복 체크 ==================== #
@app.route('/id_check', methods=['POST'])
@as_json
def id_check():
    print('# ==================== 회원가입 아이디 중복 체크 ==================== #')
    data = request.json
    user_id = data.get('user_id', 'Unknown')
    print('받은데이터:', data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = f"select * from member where user_id = '{user_id}'"

    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)

    if not res:
        result = False
    else:
        result = True

    curs.close()
    conn.close()
    print('응답메시지: ', result)

    return result


# ==================== 회원가입 닉네임 중복 체크 ==================== #
@app.route('/nick_check', methods=['POST'])
@as_json
def nick_check():
    print('# ==================== 회원가입 닉네임 중복 체크 ==================== #')
    data = request.json
    user_nick = data.get('user_nick', 'Unknown')
    print('받은데이터:', data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = f"select * from member where user_nick = '{user_nick}'"

    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)

    if not res:
        result = False
    else:
        result = True

    curs.close()
    conn.close()
    print('응답메시지: ', result)

    return result


# ==================== 회원가입 이메일 중복 체크 ==================== #
@app.route('/email_check', methods=['POST'])
@as_json
def email_check():
    print('# ==================== 회원가입 이메일 중복 체크 ==================== #')
    data = request.json
    user_email = data.get('user_email', 'Unknown')
    print('받은데이터:', data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = f"select * from member where user_email = '{user_email}'"

    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)

    if not res:
        result = False
    else:
        result = True

    curs.close()
    conn.close()
    print('응답메시지: ', result)


    return result



# ==================== 회원 가입 데이터 넣기 ==================== #
@app.route('/add_id', methods=['POST'])
def add_id():
    print('# ==================== 회원 가입 데이터 넣기 ==================== #')
    data = request.json
    user_data = data.get('form', {})
    user_id = user_data.get('user_id', 'Unknown')
    user_password = user_data.get('user_password', 'Unknown')
    user_name = user_data.get('user_name', 'Unknown')
    user_nick = user_data.get('user_nick', 'Unknown')
    user_email = user_data.get('user_email', 'Unknown')
    user_phone = user_data.get('user_phone', 'Unknown')
    user_address = user_data.get('user_address', 'Unknown')

    print('받은데이터:', user_data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = (
            f"INSERT INTO member (user_id, user_password, user_name, user_nick, user_email, user_phone, user_address, user_type)"
            f"VALUES ('{user_id}', '{user_password}', '{user_name}', '{user_nick}', '{user_email}', '{user_phone}', '{user_address}', 0)"
        )
    curs.execute(sql)

    print('sql문', sql)
    conn.commit()

    curs.close()
    conn.close()

    response = 'success'
    print(response)
    return response

    


# ==================== 텃밭 추가 ==================== #
@app.route('/add_farm', methods=['POST'])
def add_farm():
    print('# ==================== 텃밭 추가 ==================== #')

    UPLOAD_FOLDER = './farm_img'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    def save_image(file, farm_num):
        filename = f"{farm_num}_{file.filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return filename
    
    user_id = request.form.get('user_id')
    content_title = request.form.get('content_title')
    contents = request.form.get('contents')
    image = request.files['content_img']

    if image:
        conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
        curs = conn.cursor()

        sql = (
            f"INSERT INTO farm (farm_num, user_id, farm_type, contents, farm_title, farm_sector, farm_address, lental_area) "
            f"VALUES (farm_seq.NEXTVAL, '{content_title}', '{user_id}', '{contents}', NULL, '{today}')"
        )
        curs.execute(sql)
        conn.commit()

        curs.execute("SELECT content_seq.currval FROM DUAL")
        content_num = curs.fetchone()[0]

        saved_filename = save_image(image, content_num)

        update_sql = (
            f"UPDATE content SET content_img = '{saved_filename}' WHERE content_num = {content_num}"
        )
        curs.execute(update_sql)
        print(update_sql)
        conn.commit()

        curs.close()
        conn.close()

        response = {'message': 'Content added successfully'}
        return jsonify(response), 200
    else:
        response = {'error': 'Image not found'}
        return jsonify(response), 400


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
@app.route('/add_content', methods=['POST'])
def add_content():
    print('# ==================== 자랑하기 글 추가 ==================== #')

    UPLOAD_FOLDER = './content_img'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    def save_image(file, content_num):
        filename = f"{content_num}_{file.filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return filename
    
    user_id = request.form.get('user_id')
    content_title = request.form.get('content_title')
    contents = request.form.get('contents')
    image = request.files['content_img']

    if image:
        conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
        curs = conn.cursor()

        sql = (
            f"INSERT INTO content (content_num, content_title, user_id, contents, content_img, content_day) "
            f"VALUES (content_seq.NEXTVAL, '{content_title}', '{user_id}', '{contents}', NULL, '{today}')"
        )
        curs.execute(sql)
        conn.commit()

        curs.execute("SELECT content_seq.currval FROM DUAL")
        content_num = curs.fetchone()[0]

        saved_filename = save_image(image, content_num)

        update_sql = (
            f"UPDATE content SET content_img = '{saved_filename}' WHERE content_num = {content_num}"
        )
        curs.execute(update_sql)
        print(update_sql)
        conn.commit()

        curs.close()
        conn.close()

        response = {'message': 'Content added successfully'}
        return jsonify(response), 200
    else:
        response = {'error': 'Image not found'}
        return jsonify(response), 400


# ==================== 자랑하기 게시판 ==================== #
@app.route('/content', methods=['GET', 'POST'])
@as_json
def content():
    print('# ==================== 자랑하기 게시판 ==================== #')
    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    sql = "SELECT * FROM content ORDER BY content_num DESC"
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
                        "content_day":a[5]
                        })
    return resList


# ==================== 댓글 달기 ==================== #
@app.route('/content_comment', methods=['GET','POST'])
def content_comment():
    print('# ==================== 댓글 달기 ==================== #')
    data = request.json
    user_id = data.get('user_id', 'Unknown')
    content_num = data.get('content_num', 'Unknown')
    content_comment = data.get('content_comment', 'Unknown')

    print('받은데이터:', data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = (
            f"INSERT INTO member (content_comment_num, user_id, content_num, content_comment, content_comment_day)"
            f"VALUES (content_seq.NEXTVAL, '{user_id}', '{content_num}', '{content_comment}', '{today}')"
        )
    curs.execute(sql)

    print('sql문', sql)
    conn.commit()

    curs.close()
    conn.close()

    response = 'success'
    print(response)
    return response


if __name__ == '__main__':
    # app.run(debug=True)

    app.run(host='0.0.0.0', port=5022)