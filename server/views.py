from server import server
from flask import render_template

@server.route('/')
@server.route('/index')
def index():
    return render_template('../templates/index.html')