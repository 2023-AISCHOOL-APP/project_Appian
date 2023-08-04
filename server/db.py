# oracledb 라이브러리 사용!!
# -> 우리 데이터베이스에는 안됨 -> cx_oracle
# Ctrl + Shift + P
# Python 인터프리터 선택
# 안되면 python 설치
# pip3 install oracledb
# pip3 install cx_oracle

# import oracledb
import cx_Oracle
import os
os.environ['NLS_LANG'] = '.UTF8'

cx_Oracle.init_oracle_client('instantclient_11_2')

# 1. Connection 생성
conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')

# 2. Cursor 생성
curs = conn.cursor()

# 3. SQL 전송
# sql = "insert into member_cm values ('im', '40', '010-5678-1234')"
# conn.commit()

# 4. SQL 수신
sql = "select * from farm"
curs.execute(sql)
result = curs.fetchall()
print(result)


# 5. 통로 닫기
curs.close()
conn.close()

