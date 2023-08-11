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

    
# ==================== 공지사항 ==================== #
@app.route('/notice', methods=['GET'])
def notice():
    print('# ==================== 공지사항 ==================== #')
    notice_title = request.args.get('notice_title', 'Unknown')
    notice_contents = request.args.get('notice_contents', 'Unknown')
    print('받은데이터', notice_title, notice_contents)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    
    if notice_contents == "":
        sql2 = f"select * from notice ORDER BY notice_num DESC"
        curs.execute(sql2)
        res = curs.fetchall()
        curs.close()
        conn.close()
        resList = []
        for a in res:
            resList.append({"notice_num":a[0],
                            "notice_title":a[1], 
                            "notice_contents":a[2],
                            "notice_day":a[3],
                            })
        print('보낸데이터', resList)
        return resList
    else:
        sql = (
            f"INSERT INTO notice (notice_num, notice_title, notice_contents, notice_day)"
            f"VALUES (content_comment_seq.NEXTVAL, '{notice_title}', '{notice_contents}', '{today}')"
        )

        curs.execute(sql)
        sql2 = f"select * from notice ORDER BY notice_num DESC"
        curs.execute(sql2)
        res = curs.fetchall()
        curs.close()
        conn.commit()
        conn.close()
        resList = []
        for a in res:
            resList.append({"notice_num":a[0],
                            "notice_title":a[1], 
                            "notice_contents":a[2],
                            "notice_day":a[3],
                            })
        print('보낸데이터', resList)
        return resList


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
    
    farm_title = request.form.get('farm_title')
    farm_type = request.form.get('farm_type')
    farm_address = request.form.get('farm_address')
    farm_price = request.form.get('farm_price')
    lantitude = request.form.get('lantitude')
    longitude = request.form.get('longitude')
    user_id	= request.form.get('user_id')
    lental_area	= request.form.get('lental_area')
    farm_sector	= request.form.get('farm_sector')
    lental_type	= request.form.get('lental_type')
    startDate	= request.form.get('startDate')
    endDate	= request.form.get('endDate')
    lental_startDate = request.form.get('lental_startDate')
    lental_endDate = request.form.get('lental_endDate')
    description = request.form.get('description')
    image = request.form.get('farm_img')

    if image:
        conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
        curs = conn.cursor()

        sql = (
            f"INSERT INTO content (farm_num, farm_title, farm_type, farm_address, farm_price, lantitude, longitude, user_id, lental_area, farm_sector, lental_type, startDate, endDate, lental_startDate, lental_endDate, description, farm_img, farm_day)"
            f"VALUES (farm_seq.NEXTVAL, '{farm_title}', '{farm_type}', '{farm_address}', '{farm_price}', '{lantitude}', '{longitude}', '{user_id}', '{lental_area}', '{farm_sector}', '{lental_type}', '{startDate}', '{endDate}', '{lental_startDate}', '{lental_endDate}', '{description}', NULL, '{today}')"
        )
        curs.execute(sql)
        conn.commit()

        curs.execute("SELECT farm_seq.currval FROM DUAL")
        farm_num = curs.fetchone()[0]

        saved_filename = save_image(image, farm_num)

        update_sql = (
            f"UPDATE farm SET farm_img = '{saved_filename}' WHERE farm_num = {farm_num}"
        )
        curs.execute(update_sql)
        print(update_sql)
        conn.commit()

        curs.close()
        conn.close()

        response = {'message': 'farm added successfully'}
        return jsonify(response), 200
    else:
        response = {'error': 'Image not found'}
        return jsonify(response), 400


# ==================== 텃밭구하기 ==================== #
@app.route('/farm', methods=['GET'])
@as_json
def farm():
    print('# ==================== 텃밭구하기 ==================== #')
    sido = request.args.get('sido', 'Unknown')
    sigungu = request.args.get('sigungu', 'Unknown')
    print('받은데이터: ', sido, sigungu)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    if sido == 'Unknown' or sigungu == 'Unknown':
        sql = "select farm_num, farm_title, farm_type, farm_address, farm_price, lantitude, longitude, farm.user_id, lental_area, farm_sector, lental_type, startDate, endDate, lental_startDate, lental_endDate, description, farm_img, farm_day, user_name, user_nick, user_email, user_phone from farm INNER JOIN member ON farm.user_id = member.user_id where farm_address like '%광주광역시%' and farm_address like '%광산구%'"
        
    else:
        sql = f"select farm_num, farm_title, farm_type, farm_address, farm_price, lantitude, longitude, farm.user_id, lental_area, farm_sector, lental_type, startDate, endDate, lental_startDate, lental_endDate, description, farm_img, farm_day, user_name, user_nick, user_email, user_phone from farm INNER JOIN member ON farm.user_id = member.user_id where farm_address like '%{sido}%' and farm_address like '%{sigungu}%'"
    print(sql)
    curs.execute(sql)
    res = curs.fetchall()
    print('db에서 나온 데이터', res)

    curs.close()
    conn.close()


    resList = []

    for a in res:
        resList.append({"farm_num":a[0], 
                        "farm_title":a[1], 
                        "farm_type":a[2], 
                        "farm_address": a[3], 
                        "farm_price":a[4], 
                        "lantitude":a[5], 
                        "longitude":a[6], 
                        "user_id":a[7], 
                        "lental_area":a[8], 
                        "farm_sector":a[9], 
                        "lental_type":a[10], 
                        "startDate":a[11], 
                        "endDate":a[12], 
                        "lental_startDate":a[13], 
                        "lental_endDate":a[14],
                        "description":a[15],
                        "farm_img":a[16],
                        "farm_day":a[17],
                        "user_name":a[18],
                        "user_nick":a[19],
                        "user_email":a[20],
                        "user_phone":a[21]
                        })
    print(resList)
    return resList


# ==================== 자랑하기 글 추가 ==================== #
@app.route('/add_content', methods=['POST'])
def add_content():
    print('# ==================== 자랑하기 글 추가 ==================== #')

    UPLOAD_FOLDER = './content_img'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    def save_image(file, content_num):
        filename = f"{content_num}_{file.filename}"  # 수정: content_num만 사용하도록 변경
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return filename
    
    user_nick = request.form.get('user_nick')
    content_title = request.form.get('content_title')
    contents = request.form.get('contents')
    image = request.files['content_img']

    if image:
        conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
        curs = conn.cursor()

        sql = (
            f"INSERT INTO content (content_num, content_title, user_nick, contents, content_img, content_day) "
            f"VALUES (content_seq.NEXTVAL, '{content_title}', '{user_nick}', '{contents}', NULL, '{today}')"
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
                        "user_nick":a[2],
                        "contents":a[3], 
                        "content_img": a[4], 
                        "content_day":a[5]
                        })
    return resList


# ==================== 댓글 달기 ==================== #
@app.route('/content_comment', methods=['GET'])
def content_comment():
    print('# ==================== 댓글 달기 ==================== #')
    user_nick = request.args.get('user_nick', 'Unknown')
    content_num = request.args.get('content_num', 'Unknown')
    content_comment = request.args.get('content_comment', 'Unknown')
    print('받은데이터', user_nick, content_num, content_comment)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    
    if content_comment == "":
        sql2 = f"select * from content_comment where content_num = '{content_num}' ORDER BY content_comment_num DESC"
        curs.execute(sql2)
        res = curs.fetchall()
        curs.close()
        conn.close()
        resList = []
        for a in res:
            resList.append({"content_comment_num":a[0],
                            "user_nick":a[1], 
                            "content_num":a[2],
                            "content_comment":a[3], 
                            "content_comment_day": a[4]
                            })
        print('보낸데이터', resList)
        return resList
    else:
        sql = (
            f"INSERT INTO content_comment (content_comment_num, user_nick, content_num, content_comment, content_comment_day)"
            f"VALUES (content_comment_seq.NEXTVAL, '{user_nick}', '{content_num}', '{content_comment}', '{today}')"
        )

        curs.execute(sql)
        sql2 = f"select * from content_comment where content_num = '{content_num}' ORDER BY content_num DESC"
        curs.execute(sql2)
        res = curs.fetchall()
        curs.close()
        conn.commit()
        conn.close()
        resList = []
        for a in res:
            resList.append({"content_comment_num":a[0],
                            "user_nick":a[1], 
                            "content_num":a[2],
                            "content_comment":a[3], 
                            "content_comment_day": a[4]
                            })
        print('보낸데이터', resList)
        return resList
    

# # ==================== 농장 상세페이지 ==================== #
# @app.route('/detail', methods=['GET'])
# @as_json
# def detail():
#     print('# ==================== 농장 상세페이지 ==================== #')
#     farm_num = request.args.get('farm_num', 'Unknown')
#     print('받은데이터', farm_num)


#     conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')

#     curs = conn.cursor()

#     sql = f"SELECT farm_num, farm.user_id, farm_type, farm_title, farm_address, lental_area, farm_price, lantitude, Longitude, lental_type, startDate, endDate, lental_startDate, lental_endDate, description, user_name, user_nick, user_phone, user_email FROM farm INNER JOIN member ON farm.user_id = member.user_id where farm_num = '{farm_num}'"
            
#     curs.execute(sql)
#     res = curs.fetchall()
#     print('sql응답', res)

#     curs.close()
#     conn.close()

#     resList = []

#     for a in res:
#         resList.append({"farm_num":a[0], "farm.user_id":a[1], "farm_type":a[2], "farm_title": a[3], "farm_address":a[4], "lental_area":a[5], "farm_price":a[6], "lantitude":a[7], "Longitude":a[8], "lental_type":a[9], "startDate":a[10], "endDate":a[11], "lental_startDate":a[12], "lental_endDate":a[13], "description":a[14], "user_name":a[15], "user_nick":a[16], "user_phone":a[17], "user_email":a[18]})

#     return resList


# ==================== 지혜님 테스트 ==================== #
@app.route('/detail2', methods=['GET'])
@as_json
def detail2():
    print('# ==================== 지혜님 테스트 ==================== #')
    farm_num = request.args.get('farm_num', 'Unknown')
    print('받은데이터', farm_num)


    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')

    curs = conn.cursor()

    sql = f"SELECT farm_num, farm.user_id, farm_type, farm_title, farm_address, lental_area, farm_price, lantitude, Longitude, lental_type, startDate, endDate, lental_startDate, lental_endDate, description, user_name, user_nick, user_phone, user_email FROM farm INNER JOIN member ON farm.user_id = member.user_id where farm_num = '{farm_num}'"
            
    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)

    curs.close()
    conn.close()

    resList = []

    for a in res:
        resList.append({"farm_num":a[0], "farm.user_id":a[1], "farm_type":a[2], "farm_title": a[3], "farm_address":a[4], "lental_area":a[5], "farm_price":a[6], "lantitude":a[7], "Longitude":a[8], "lental_type":a[9], "startDate":a[10], "endDate":a[11], "lental_startDate":a[12], "lental_endDate":a[13], "description":a[14], "user_name":a[15], "user_nick":a[16], "user_phone":a[17], "user_email":a[18]})

    return resList

# ==================== 삭제 페이지 ==================== #
@app.route('/delete', methods=['GET'])
@as_json
def delete():
    print('# ==================== 삭제 페이지 ==================== #')
    content_num = request.args.get('content_num', 'Unknown')
    content_comment_num = request.args.get('content_comment_num', 'Unknown')
    print('받은데이터', content_num, content_comment_num)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    if content_num != 'Unknown':
        print('자랑하기 글 삭제')
        sql = f"delete from content_comment where content_num = '{content_num}'"
        curs.execute(sql)
        conn.commit()
        print('sql문',sql)
        sql = f"delete from content where content_num = '{content_num}'"
        curs.execute(sql)
        conn.commit()
        print('sql문',sql)
        sql2 = "select * from content"
        curs.execute(sql2)
        res = curs.fetchall()
        curs.close()
        conn.close()
        resList = []
        for a in res:
            resList.append({"content_num":a[0],
                            "content_title":a[1], 
                            "user_nick":a[2],
                            "content_img":a[3], 
                            "contents": a[4],
                            "content_day": a[5]
                            })
        print('보낸데이터', resList)
        return resList
        
    elif content_comment_num != 'Unknown':
        print('자랑하기 댓글 삭제')
        sql = f"delete from content_comment where content_comment_num = {content_comment_num}"
        print('sql문',sql)
        curs.execute(sql)
        sql2 = "select * from content_comment"
        curs.execute(sql2)
        res = curs.fetchall()
        curs.close()
        conn.close()
        resList = []
        for a in res:
            resList.append({"content_comment_num":a[0],
                            "user_nick":a[1], 
                            "content_num":a[2],
                            "content_comment":a[3], 
                            "content_comment_day": a[4]
                            })
        print('보낸데이터', resList)
        return resList

  
    
if __name__ == '__main__':
    # app.run(debug=True)

    app.run(host='0.0.0.0', port=5022)