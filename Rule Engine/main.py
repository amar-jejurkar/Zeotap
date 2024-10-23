from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()






# AST Node base class
class ASTNode:
    def evaluate(self, context):
        raise NotImplementedError("This method should be implemented by subclasses")

# Operand Node
class OperandNode(ASTNode):
    def __init__(self, attribute, operator, value):
        self.attribute = attribute
        self.operator = operator
        self.value = value

    def evaluate(self, context):
        user_value = context[self.attribute]

        if self.operator == ">":
            return user_value > self.value
        elif self.operator == "<":
            return user_value < self.value
        elif self.operator == "==":
            return user_value == self.value
        elif self.operator == "!=":
            return user_value != self.value
        else:
            raise ValueError(f"Unknown operator {self.operator}")

# Operator Node
class OperatorNode(ASTNode):
    def __init__(self, operator, left, right=None):
        self.operator = operator
        self.left = left
        self.right = right

    def evaluate(self, context):
        if self.operator == "AND":
            return self.left.evaluate(context) and self.right.evaluate(context)
        elif self.operator == "OR":
            return self.left.evaluate(context) or self.right.evaluate(context)
        elif self.operator == "NOT":
            return not self.left.evaluate(context)
        else:
            raise ValueError(f"Unknown operator {self.operator}")

# Pydantic model for user input
class UserInput(BaseModel):
    age: int
    department: str
    income: float
    spend: float

# Endpoint to check eligibility
@app.post("/check-eligibility")
def check_eligibility(user: UserInput):
    # Define the rule using AST
    rule = OperatorNode(
        "AND",
        OperandNode("age", ">", 18),
        OperatorNode(
            "AND",
            OperandNode("income", ">", 50000),
            OperandNode("spend", "<", 10000)
        )
    )

    # Evaluate the rule with user data
    is_eligible = rule.evaluate(user.dict())
    
    return {"eligible": is_eligible}

url = 'http://localhost:3000/form'

response = requests.get(url)
if response.status_code == 200:
    # Parse the JSON data
    data = response.json()
    print("Data fetched successfully!")
    print(data)
else:
    print(f"Failed to retrieve data. Status code: {response.status_code}")


# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


