import http.server,socketserver

port = 8080
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("",port),Handler) as http_server:
    http_server.serve_forever()
