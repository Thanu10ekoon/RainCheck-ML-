from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# Set up Selenium WebDriver
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run without opening a browser
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920,1080")

# Automatically manage ChromeDriver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# Navigate to the AccuWeather page
url = "https://www.accuweather.com/en/lk/colombo/311399/current-weather/311399"
driver.get(url)

try:
    # Wait until the Dew Point section is present
    wait = WebDriverWait(driver, 10)
    
    # Find the element containing "Dew Point"
    dew_point_label = wait.until(EC.presence_of_element_located(
        (By.XPATH, "//div[contains(text(), 'Dew Point')]")
    ))

    # Get the value next to the label
    dew_point_value = dew_point_label.find_element(By.XPATH, "following-sibling::div").text

    print("Dew Point in Colombo:", dew_point_value)
except Exception as e:
    print("Dew Point not found on the page.", e)

# Close browser
driver.quit()
