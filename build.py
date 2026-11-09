import base64, json, os
R = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(R, 'assets')
img = {}
for f in sorted(os.listdir(A)):
    n, ext = os.path.splitext(f)
    if ext not in ('.jpg', '.png'):
        continue
    mime = 'image/jpeg' if ext == '.jpg' else 'image/png'
    img[n] = f'data:{mime};base64,' + base64.b64encode(open(os.path.join(A, f), 'rb').read()).decode()
src = lambda f: open(os.path.join(R, 'src', f), encoding='utf-8').read()
html = src('index.html')
html = html.replace('/*CSS*/', src('style.css'))
html = html.replace('/*IMG*/', json.dumps(img))
html = html.replace('/*JS*/', '\n'.join(src(f) for f in ['core.js', 'glass.js', 'client.js', 'admin.js', 'main.js']))
open(os.path.join(R, 'index.html'), 'w', encoding='utf-8').write(html)
print(round(len(html) / 1024), 'KB')
