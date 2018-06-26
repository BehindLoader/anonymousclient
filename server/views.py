from server import server, settings
from flask import render_template, send_file, jsonify
from os import path
import requests

# @server.route('/')
# @server.route('/index')
@server.route('/<string:board>')
def index(board = 'b'):
    site = dict(
        title = settings.SITE_HEADER,
        board = board
    )
    return render_template(
        'index.html',
        site = site
    )

@server.route('/api/boards')
def get_boards():
    r = requests.get('http://2ch.hk/makaba/mobile.fcgi?task=get_boards')
    return jsonify( r.json() )

@server.route('/src/<path:filename>')
def get_static(filename):
    """
    returns static file
    """
    return send_file( path.join(settings.STATIC_FOLDER, filename) )