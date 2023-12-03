import requests
from bs4 import BeautifulSoup

url = "https://www.megamillions.com/Winning-Numbers/Previous-Drawings.aspx"

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Parse the HTML content of the page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the element that contains the winning numbers
    winning_numbers_element = soup.find('div', class_='winning-numbers-list')

    # Extract the winning numbers
    if winning_numbers_element:
        winning_numbers = winning_numbers_element.text.strip()
        print(f"Winning Numbers: {winning_numbers}")
    else:
        print("Couldn't find winning numbers on the page.")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
