from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "user", "content": "I'm experiencing a headache, a runny nose, and my body feels sensitive all over. What illness could I have and how could I remedy it?"}
  ]
)

print(completion.choices[0].message.content)