from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user = data.get("user")
    anime = data.get("anime")

    print(user)
    print(anime)

    return jsonify({"message": "ok"})

if __name__ == "__main__":
    app.run(debug=True)