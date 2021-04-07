#own class
from city import City

#create city object with city id number from wg-gesucht.de
#in descending order of number of inhabitants
#city = City("Berlin", 8)
#city = City("Hamburg", 55)
#city = City("Munchen", 90)
#city = City("Koln", 73)
#city = City("Frankfurt-am-Main", 41)
#city = City("Stuttgart", 124)
#city = City("Dusseldorf", 30)
#city = City("Dortmund", 26)
#city = City("Essen", 35)
#city = City("Leipzig", 77)
city = City("Bremen", 17)

city.getMaxPageNumber()
city.getInfo()
city.printAllRooms()
city.dumpToJSON()