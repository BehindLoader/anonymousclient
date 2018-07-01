from server import server, settings
from flask import render_template, send_file, jsonify
from os import path
import requests

# @server.route('/')
# @server.route('/index')
@server.route('/<string:board>')
@server.route('/<string:board>/<int:thread>')
def index(board = 'b', thread = 0):
    site = dict(
        title = settings.SITE_HEADER,
        board = board,
        thread = thread
    )
    return render_template(
        'index.html',
        site = site
    )

@server.route('/api/boards')
def get_boards():
    r = requests.get('http://2ch.hk/makaba/mobile.fcgi?task=get_boards')
    return jsonify( r.json() )

@server.route('/api/get/<string:board>')
def get_thread_list(board = 'b'):
    r = requests.get('http://2ch.hk/%s/catalog.json' % board)
    return jsonify( r.json()['threads'] )

@server.route('/src/<path:filename>')
def get_static(filename):
    """
    returns static file
    """
    return send_file( path.join(settings.STATIC_FOLDER, filename) )