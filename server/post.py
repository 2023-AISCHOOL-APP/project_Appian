from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 모든 경로에 대해 CORS 허용


@app.route('/api/data', methods=['POST'])
def receive_data():
    # 클라이언트로부터 전송된 JSON 데이터 받기
    data = request.json

    # 받은 데이터 확인
    print('받은데이터:', data)

    # 받은 데이터를 가공하여 응답
    name = data.get('farm_num', 'Unknown')
    print('가공데이터', name)
    
    if name == 'test':
        name2 = '농장1'
    else:
        name2 = '없음'

    response = {'message': name2}
    print('응답데이터', response)

    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5022)

    # app.run(debug=True)
