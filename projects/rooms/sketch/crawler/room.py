class Room:
    def __init__(self, price, size):
        self.price = price
        self.size = size

    def printRoom(self):
        printMessage = f"price:{self.price} size:{self.size}"
        printMessage.strip()
        print(printMessage)
