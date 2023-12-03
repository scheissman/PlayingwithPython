import tkinter as tk
from bs4 import BeautifulSoup
import requests

def vodostaj():
    url = 'https://mvodostaji.voda.hr/Home/PregledVodostajaPostaje?sektorID=2&bpID=15&postajaID=715'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    vodostaj = soup.find("span", class_="")
    water_level_label.config(text=f"Vodostaj Drava - Osijek  {vodostaj.text}")

app = tk.Tk()
app.title("Water Level App")

water_level_label = tk.Label(app, text="")
water_level_label.pack(pady=10)

vodostaj()

app.mainloop()
