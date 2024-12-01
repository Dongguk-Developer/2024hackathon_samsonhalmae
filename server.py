from flask import Flask, request, jsonify, send_from_directory
import json
import os

app = Flask(__name__, static_folder='static')

@app.route('/register', methods=['POST'])
def register():
    user = request.get_json()
    try:
        with open('Users.json', 'r+', encoding='utf-8') as file:
            data = json.load(file)
            data.update(user)
            file.seek(0)
            json.dump(data, file, ensure_ascii=False, indent=4)
        return jsonify({"message": "User registered successfully"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    credentials = request.get_json()
    phone = credentials.get('phone')
    password = credentials.get('password')

    try:
        with open('Users.json', 'r', encoding='utf-8') as file:
            users = json.load(file)
            for name, user in users.items():
                if user['PhoneNumber'] == phone and user['password'] == password:
                    return jsonify({"message": "Login successful", "name": name}), 200
        return jsonify({"message": "Invalid phone number or password"}), 401
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')
    results = [] 
    return jsonify({"results": results})

@app.route('/basket', methods=['GET'])
def get_basket():
    try:
        with open('Market.json', 'r', encoding='utf-8') as file:    #basket example
            market_data = json.load(file)
        basket = []
        store = "점포1"
        item = "당근"
        quantity = 8
        weight_per_item = 120
        if market_data[store][item]['재고'] >= quantity:
            basket.append({
                "store": store,
                "item": item,
                "price_per_gram": market_data[store][item]['그람당 가격'],
                "stock": market_data[store][item]['재고'],
                "quantity": quantity,
                "total_weight": quantity * weight_per_item,
                "total_price": quantity * weight_per_item * market_data[store][item]['그람당 가격']
            })
        return jsonify({"basket": basket}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5500)
