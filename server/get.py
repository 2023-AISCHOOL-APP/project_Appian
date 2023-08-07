from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 모든 경로에 대해 CORS 허용


@app.route('/test', methods=['GET'])
def receive_data():
    # 클라이언트로부터 전송된 GET 파라미터 받기
    sidos = request.args.get('sidos', 'Unknown')
    sigungus = request.args.get('sigungus', 'Unknown')
    print('가공데이터', sidos, sigungus)

    if sidos == '광주광역시' and sigungus =='광산구':
        name = '농장1'
    else:
        name = '없음'

    # 받은 데이터를 가공하여 응답
    response = {'message': name}
    print('응답데이터', response)
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5022)

    # app.run(debug=True)
