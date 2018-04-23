import time
from bs4 import BeautifulSoup
import pandas as pd
from selenium import webdriver
from splinter import Browser


def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    return Browser("chrome", **executable_path, headless=False)


def scrape():
    browser = init_browser()
    listings = {}

    url = "https://mars.nasa.gov/news/"
    browser.visit(url)
    time.sleep(1)

    html = browser.html
    soup = BeautifulSoup(html, "html.parser")

    listings["news_title"] = soup.find('div', class_="content_title").getText()
    
    url1 = "https://twitter.com/marswxreport?lang=en"
    browser.visit(url1)
    html = browser.html
    soup = BeautifulSoup(html, "html.parser")

    listings["mars_weather"] = soup.find('div', class_='js-tweet-text-container').get_text()
    
    return listings
