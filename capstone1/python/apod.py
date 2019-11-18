from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import pymysql.cursors


def main():

    conn = pymysql.connect(host='localhost',
                           user='root',
                           password='Ironman3000!',
                           db='starstarstar',
                           charset='utf8'
                           )

    url = "http://wouldyoulike.org/apod/"
    content = ""
    content_media = ""
    time = ""
    title = ""

    html = urlopen(url).read()
    soup = BeautifulSoup(html, "html.parser")  # 기본 파서

    h3 = soup.find("h3")
    a = h3.find("a")
    url = a["href"]
    html = urlopen(url).read()
    soup = BeautifulSoup(html, "html.parser")

    result = soup.find('div', class_='span12 column_container td-post-content')

    for tag in result.find_all('p'):
        content = content + tag.text + "\n"

    result = soup.find('div', class_='td-post-text-content')
    result = result.find('figure')
    media = result.find('img')
    if (media == None):
        media = result.find('iframe')
        content_media = media["src"]
    else:
        content_media = media["src"]

    result = soup.find('header')
    h1 = result.find('h1')
    title = h1.text
    print(title)

    result = soup.find('time')
    time = result.text

    try:
        with conn.cursor() as cursor:
            sql = 'UPDATE apod SET title = %s , time = %s , content = %s , content_media = %s WHERE id = 1 LIMIT 1;'
            cursor.execute(sql, (title, time, content, content_media))
        conn.commit()
    finally:
        conn.close()


if __name__ == '__main__':
    main()
