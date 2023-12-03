### Webscrape sa pisanjem svakog posla u zaseban file u komentarima code
# import requests
# from bs4 import BeautifulSoup
# import re
# 
# 
# def clean_filename(filename):
#     # Remove invalid characters from the filename
#     return re.sub(r'[<>:"/\\|?*]', '_', filename)
# 
# 
# def nadji_posao():
#     url = requests.get('https://www.posao.hr/').text
#     soup = BeautifulSoup(url, 'lxml')
#     jobs = soup.find_all('dd', class_="list_jobs_single")
#     istek = soup.find_all('span', class_="location_system date_system")
# 
#     for job, date in zip(jobs, istek):
#         job_title = job.strong.text
#         job_title_cleaned = clean_filename(job_title)
#         content = f"{job_title} {date.text}"
# 
#         with open(f"{job_title_cleaned}.txt", "w") as f:
#             f.write(content)
# 
#         print(content)
# 
# 
# nadji_posao()


#### moj sopstveni kod 
import requests
from bs4 import BeautifulSoup
def nadji_posao():
    url = requests.get('https://www.posao.hr/').text
    soup = BeautifulSoup(url, 'lxml')
    jobs = soup.find_all('dd', class_ = "list_jobs_single")
    istek = soup.find_all('span', class_ = "location_system date_system")
    more_info = soup.find_all('a')
    for job, date in zip(jobs, istek):
         print(f"{job.strong.text} {date.text}")

nadji_posao()


