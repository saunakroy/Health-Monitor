from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)
client = OpenAI()


@app.route('/api/hello', methods=['GET'])
def hello_world():
    return "Hello, World!"


@app.route('/api/diagnose', methods=['POST'])
def diagnose():
    data = request.json
    input_text = data.get('input', '')
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": input_text}
        ]
    )
    return jsonify({'output': completion.choices[0].message.content})


if __name__ == '__main__':
    app.run(port=5328)


# completion = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {"role": "user", "content": input_text}
#     ]
# )

# print(completion.choices[0].message.content)
