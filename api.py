from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample REST API endpoint for getting a list of items
@app.route('/items', methods=['GET'])
def get_items():
    return jsonify({'items': []})

# Sample REST API endpoint for creating an item
@app.route('/items', methods=['POST'])
def create_item():
    new_item = request.json
    return jsonify(new_item), 201

# Sample REST API endpoint for getting a single item
@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    return jsonify({'item': {'id': item_id}})

# Sample REST API endpoint for updating an item
@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    updated_item = request.json
    return jsonify(updated_item)

# Sample REST API endpoint for deleting an item
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    return jsonify({'message': 'Item deleted'}), 204

if __name__ == '__main__':
    app.run(debug=True)