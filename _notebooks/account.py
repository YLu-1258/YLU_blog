class Account:
    company = "CS61A Bank" # This is a class variable
    interest = 0.02
    def __init__(self, account_holder):
        self.balance = 0 # This is an instance variable
        self.holder = account_holder
    
    def deposit(self, ammount): # This is an instance method
        self.balance = self.balance + ammount
        return self.balance
    
    def withdraw(self, amount):
        if amount > self.balance:
            return "Insufficient funds"
        self.balance = self.balance - amount
        return self.balance
    
    def foo(x): # This is a class method
        return Account.company
    
    def transfer(self, into, amount):
        result = self.withdraw(amount)
        if type(result) == str:
            return result
        else:
            into.deposit(amount)
            return "Transfer Successful"

a = Account("Alex")
a.deposit(50000)

b = Account("Bobby")
b.deposit(10000)

a.transfer(b, 20000)
print(a.balance) # 30000
print(b.balance) # 30000