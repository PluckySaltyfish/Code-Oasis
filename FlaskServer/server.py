from flask import Flask, jsonify, request,send_from_directory,make_response,render_template
import sys
def start(host="0.0.0.0",
          port=6666,
          debug=True):
    app = Flask(__name__)
    @app.route('/')
    def index():
        return 'hello world'

    app.run(debug=debug, host=host, port=port, use_reloader=False,threaded=True)
if __name__ == "__main__":
    start()

