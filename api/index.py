from flask import Flask, request, jsonify
from openai import OpenAI
import os
import  json
from http.server import BaseHTTPRequestHandler

app = Flask(__name__)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def diagnose(input_text):
    new_prompt = input_text + "Describe what condition I may have, and recommend treatments/medicines, and provide links to helpful articles regarding the subject."
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": new_prompt}
            ]
        )
        return completion.choices[0].message.content.strip()
    except Exception as e:
        print(f"OpenAI API error: {str(e)}")
        return str(e)

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/diagnose':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            input_text = data.get('input', '')
            output_text = diagnose(input_text)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'output': output_text}).encode())
        else:
            self.send_error(404)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
        self.end_headers()

# This is for local development
if __name__ == '__main__':
    from flask import Flask, request, jsonify
    app = Flask(__name__)
    
    @app.route('/api/diagnose', methods=['POST'])
    def flask_diagnose():
        data = request.json
        input_text = data.get('input', '')
        output_text = diagnose(input_text)
        return jsonify({'output': output_text})
    
    app.run(debug=True, port=5328)