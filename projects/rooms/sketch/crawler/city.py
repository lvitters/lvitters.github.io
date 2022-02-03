import requests
import pprint
import re
import json
import jsonpickle
import time
import random
from json import JSONEncoder
from bs4 import BeautifulSoup

#own class
from room import Room

class City:
    def __init__(self, name, code):
        self.name = name
        self.code = code
        self.rooms = []
        self.maxPageNumber = 0

    def getMaxPageNumber(self):
        #get html into python object
        max_URL = 'https://www.wg-gesucht.de/wg-zimmer-in-' + self.name + '.' + str(self.code) + '.0.1.0.html?offer_filter=1&city_id=' + str(self.code) + '&noDeact=1&categories%5B%5D=0&rent_types%5B%5D=2'
        headers = {'content-type':'text'}
        max_page = requests.get(max_URL, headers = headers)

        #create soup object
        max_soup = BeautifulSoup(max_page.content, 'html.parser')

        #find unordered list (ul) for pagination
        max_result = max_soup.find('ul', class_='pagination pagination-sm')

        #get second to last li element
        self.maxPageNumber = int(max_result.findAll('li')[-2].text)

        print('number of pages: ' + str(self.maxPageNumber))

    
    def getInfo(self):
        #for each page until maxPageNumber
        for x in range(self.maxPageNumber):

            #bypass captcha, it can't be that easy???
            time.sleep(random.randint(10,20))
            
            #reset roomCounter
            roomCounter = 0

            #get html into phyton objects
            URL = 'https://www.wg-gesucht.de/wg-zimmer-in-' + self.name + '.' + str(self.code) + '.0.1.' + str(x) + '.html?category=0&city_id=' + str(self.code) + '&rent_type=0&noDeact=1&img=1&rent_types%5B0%5D=2'
            headers = {'content-type':'text'}
            page = requests.get(URL, headers = headers)

            #create soup object
            soup = BeautifulSoup(page.content, 'html.parser')

            #find all divs with certain class name
            results = soup.findAll('div', class_= 'row noprint middle')

            #for each result get the price and the size
            for result in results:
                price = result.find('div', class_= 'col-xs-3').text
                price = int(re.search(r'\d+', price).group())
                size = result.find('div', class_= 'col-xs-3 text-right').text
                size = int(re.search(r'\d+', size).group())
                
                #get rid of outliers
                if price >= 100 and size >= 5:
                    self.rooms.append(Room(price, size))
                    roomCounter += 1

            #print number of rooms from each page
            print('getting ' + str(roomCounter) + ' rooms from page ' + str(x+1))

    
    def printAllRooms(self):
        for x in self.rooms:
            x.printRoom()

        print('number of rooms: ' + str(len(self.rooms)))


    def dumpToJSON(self):
        #encode objects into JSON string
        jsonString = jsonpickle.encode(self.rooms, unpicklable = False)

        #open file
        jsonFile = open('data/' + str(self.name) + '.json', 'w')
        
        #write JSON string to file and close file
        jsonFile.write(jsonString)
        jsonFile.close()