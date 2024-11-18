from flask import Flask

app = Flask(__name__, static_folder='frontend')

@app.route('/')
def serve_index():
    # Serve the index.html file from the frontend folder
    return send_from_directory('frontend', 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    # Serve any other static files (like CSS, JS) from the frontend folder
    return send_from_directory('frontend', path)

if __name__ == '__main__':
    # Specify port 8000
    app.run(host='0.0.0.0', port=8000)
