from typing import Any, Union

response1: dict[str, Any] = {"Marco": "Polo", "Answer": 42}
response2: dict[str, Union[str, int]] = {"Marco": "Polo", "Answer": 42}
response3: dict[str, str | int] = {"Marco": "Polo", "Answer": 42}

print(response1)
print(response2)
print(response3)