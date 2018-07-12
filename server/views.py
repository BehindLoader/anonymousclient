# -*- coding: utf-8 -*-
from server import server, settings
from flask import render_template, send_file, jsonify
from os import path
import requests

@server.route('/')
@server.route('/index')
@server.route('/<string:board>')
@server.route('/<string:board>/<int:thread>')
@server.route('/<string:board>/<int:thread>/<int:answer>')
def index(board = '', thread = 0, answer = 0):
    site = dict(
        title = settings.SITE_HEADER,
        board = board,
        thread = thread,
        answer = answer,
    )
    return render_template(
        'index.html',
        site = site
    )

@server.route('/api/boards')
def get_boards():
    # r = requests.get('http://2ch.hk/makaba/mobile.fcgi?task=get_boards')
    # response = []
    # for x in r.json():
    #     response.append(dict(
    #         name = x,
    #         boards = r.json()[x]
    #     ))
    # return jsonify( response )
    response = []
    response.append(dict(id = 'b', name = 'Бред'))
    response.append(dict(id = 'pr', name = 'Программирование'))
    response.append(dict(id = 'soc', name = 'Общение'))
    return jsonify(response)

@server.route('/api/get/<string:board>')
def get_thread_list(board = 'b'):
    r = requests.get('http://2ch.hk/%s/catalog.json' % board)
    return jsonify( r.json()['threads'] )

@server.route('/api/get/<string:board>/<int:thread>')
def get_thread_posts(board = 'b', thread = 0):
    r = requests.get('http://2ch.hk/%s/res/%s.json' % (board, thread))
    return jsonify( r.json()['threads'][0]['posts'] )

@server.route('/src/<path:filename>')
def get_static(filename):
    """
    returns static file
    """
    return send_file( path.join(settings.STATIC_FOLDER, filename) )