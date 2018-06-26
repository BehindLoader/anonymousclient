from os import path

from flask import Flask

server = Flask(__name__)
server.template_folder = path.abspath('./templates/')
server.static_folder = path.abspath('./static/')

from server import views