import http.server
import socketserver
import os
PORT = 8000
STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
os.chdir(STATIC_DIR)
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # 允许跨域和防缓存
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
Handler = CustomHandler
Handler.extensions_map.update({
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
})
print(f"[*] 腾冲福溪塔 Web 服务启动中，监听端口: {PORT}, 托管目录: {STATIC_DIR}")
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
