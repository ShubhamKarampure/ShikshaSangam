import warnings
warnings.filterwarnings("ignore")
import os
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from dotenv import load_dotenv
import json
import sys
from time import sleep



#url = "https://www.linkedin.com/in/laxmimerit"  # profile to scrape
global driver
global wait
global url
global profile_data

def login():
    driver.get('https://www.linkedin.com/login')
    try:
        wait.until(EC.title_contains("LinkedIn Login"))
    except TimeoutException:
        print("Error: Not on login page")
        return

    email = wait.until(EC.presence_of_element_located((By.ID, 'username')))
    email.send_keys(os.environ['EMAIL'])

    password = driver.find_element(By.ID, 'password')
    password.send_keys(os.environ['PASSWORD'])
    password.submit()
    sleep(10)

    try:
        wait.until(EC.url_contains("/feed/"))
    except TimeoutException:
        print("Error: Login failed or page not redirected")

def scrape_name_headline():
    driver.get(url)
    sleep(4)
    try:
        wait.until(EC.presence_of_element_located((By.XPATH, "//h1[contains(@class, 'inline') and contains(@class, 't-24') and contains(@class, 'v-align-middle')]")))
    except TimeoutException:
        print("Error: Could not load profile page or invalid URL")

    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'lxml')

    try:
        name_element = driver.find_element(By.XPATH, "//h1[contains(@class, 'inline') and contains(@class, 't-24') and contains(@class, 'v-align-middle')]")
        name = name_element.text.strip()
        profile_data['name'] = name
    except Exception as e:
        print(e)
        profile_data['name'] = ""

    profile_data['url'] = url

    try:
        headline = soup.find('div', {'class': 'text-body-medium break-words'})
        profile_data['headline'] = headline.get_text().strip() if headline else ""
        #print("Headline fetched ", profile_data)
    except Exception as e:
        print(e)
        profile_data['headline'] = ""

def scrape_pfp_banner():
    try:
        page_source = driver.page_source  # gets all the html code
        soup = BeautifulSoup(page_source, 'lxml') # parse
    except Exception as e:
        print(e)

    try:
        image_div = soup.find('div', {'class': 'ph5 pb5'})
        image_tag = image_div.find('img', {'class' : 'eAySjWxRIVwfeKiCJmmtKAIeoYVYeQqjWtbXywxM pv-top-card-profile-picture__image--show evi-image ember-view'})
        pfp_uri = image_tag.get('src')
    except Exception as e:
        print(e)
        pfp_uri=""
    profile_data['pfp'] = pfp_uri

    try:
        image_tag = soup.find('img', {'id': "profile-background-image-target-image"})
        banner_uri = image_tag.get('src')
    except Exception as e:
        print(e)
        banner_uri = ""
    profile_data['banner'] = banner_uri
    

def get_all_sections_list():
    try:
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, 'lxml')
        sleep(1)
        return soup.find_all('section', {'class': 'artdeco-card pv-profile-card break-words mt2'})
    except Exception as e:
        print(e)
        return

def scrape_about(sections):
    try:
        about_section = next((sec for sec in sections if sec.find('div', {'id': 'about'})), None)
        sleep(1)
        if not about_section:
            print("No About section found")
            profile_data['about'] = ""
            return
        try:
            about = about_section.find('div', class_='display-flex ph5 pv3')
            profile_data['about'] = about.get_text().strip() if about else ""
            #print('ABOUT DONE                  = \n', profile_data['about'])
        except Exception as e:
            print(e)
            profile_data['about'] = ""
    except Exception as e:
        print(e)
        profile_data['about'] = ""
    
def get_exp(exp):
    exp_dict = {}

    # Extract company name
    try:
        name_container = exp.find('div', {'class': 'display-flex flex-wrap align-items-center full-height'})
        name = name_container.find('span', {'class': 'visually-hidden'}).get_text().strip() if name_container else ""
    except AttributeError:
        name = ""
    exp_dict['company_name'] = name

    # Extract duration
    try:
        duration_container = exp.find('span', {'class': 't-14 t-normal'})
        duration = duration_container.find('span', {'class': 'visually-hidden'}).get_text().strip() if duration_container else ""
    except AttributeError:
        duration = ""
    exp_dict['duration'] = duration

    # get the company logo
    try:
        image_tag = exp.find('img', {'class': 'ivm-view-attr__img--centered EntityPhoto-square-3 evi-image lazy-image ember-view'})
        logo = image_tag.get('src')
    except:
        logo = ""
    exp_dict['logo'] = logo  

    # Extract designations
    designations = exp.find_all('div', {'class': 'QWgWuJFyWtIGGkmTNbugMvqsjRBAqyTAs xnYBuCyIHRgKsOsTWqdiBTWAoLWvUlw'}) or []
    item_list = []

    for position in designations:
        spans = position.find_all('span', {'class': 'visually-hidden'})
        item_dict = {
            'designation': spans[0].get_text().strip() if len(spans) > 0 else "",
            'duration': spans[1].get_text().strip() if len(spans) > 1 else "",
            'location': spans[2].get_text().strip() if len(spans) > 2 else "",
            'projects': spans[3].get_text().strip() if len(spans) > 3 else ""
        }
        item_list.append(item_dict)

    exp_dict['designations'] = item_list

    return exp_dict


def scrape_experience(sections):
    try:
        experience_section = next((sec for sec in sections if sec.find('div', {'id': 'experience'})), None)
        sleep(1)
        if not experience_section:
            print("No Experience section found")
            profile_data['experience'] = []
            return

        try:
            experiences = experience_section.find_all('div', {'class': 'QWgWuJFyWtIGGkmTNbugMvqsjRBAqyTAs VpNeetMslzHSoNeFDsSpLgMZsZtaWgtcfFkw QVSvlhFvYQRVapSBOuBKjbkkoeGbJdXZxHfoU'})
            profile_data['experience'] = [get_exp(exp) for exp in experiences]
            #print('EXPERIENCE DONE                   =\n',profile_data['experience'])
        except Exception as e:
            print(e)
            profile_data['experience'] = []
    except Exception as e:
        print(e)
        profile_data['experience'] = []


def get_project(item):
    spans = item.find_all('span', {'class': 'visually-hidden'})

    item_dict = {
        'project_name': spans[0].get_text().strip() if len(spans) > 0 else "",
        'duration': spans[1].get_text().strip() if len(spans) > 1 else "",
        'description': spans[2].get_text().strip() if len(spans) > 2 else "",
    }
    return item_dict


def scrape_projects():
    try:
        # Wait for the 'See All Projects' button and click it
        view_all_projects_button = wait.until(EC.element_to_be_clickable((By.ID, "navigation-index-see-all-projects")))
        view_all_projects_button.click()
        sleep(4)
    except TimeoutException:
        print("Failed to find the 'See All Projects' button.")
        profile_data['projects'] = []
        return

    try:
        # Wait for the projects section to load
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'section.artdeco-card.pb3')))
    except TimeoutException:
        print("Failed to load the projects section.")
        profile_data['projects'] = []
        return

    # Parse the page source for project details
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'lxml')

    projects_section = soup.find('section', {'class': 'artdeco-card pb3'})
    items = projects_section.find_all('div', {'class': 'QWgWuJFyWtIGGkmTNbugMvqsjRBAqyTAs VpNeetMslzHSoNeFDsSpLgMZsZtaWgtcfFkw QVSvlhFvYQRVapSBOuBKjbkkoeGbJdXZxHfoU'}) if projects_section else []

    profile_data['projects'] = [get_project(item) for item in items]
    #print('PROJECT DONE                    =\n',profile_data['projects'])

    # Navigate back to the main profile page
    driver.back()
    sleep(4)


def get_skills(item):
    spans = item.find_all('span', {'class': 'visually-hidden'})
    return spans[0].get_text().strip() if spans else ""


def scrape_skills():
    try:
        # Wait for the 'Show All Skills' link and click it
        view_all_skills_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//a[contains(@id, 'navigation-index-Show-all-') and contains(@id, '-skills')]"))
        )
        view_all_skills_link.click()
        sleep(4)
    except TimeoutException:
        print("Failed to find or click the 'Show All Skills' link.")
        profile_data['skills'] = []
        return

    try:
        # Wait for the skills section to load
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'section.artdeco-card.pb3')))
    except TimeoutException:
        print("Failed to load the skills section.")
        profile_data['skills'] = []
        return

    # Parse the page source for skills
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'lxml')

    skills_section = soup.find('section', {'class': 'artdeco-card pb3'})
    items = skills_section.find_all('div', {'class': 'QWgWuJFyWtIGGkmTNbugMvqsjRBAqyTAs VpNeetMslzHSoNeFDsSpLgMZsZtaWgtcfFkw QVSvlhFvYQRVapSBOuBKjbkkoeGbJdXZxHfoU'}) if skills_section else []

    profile_data['skills'] = [get_skills(item) for item in items]
    #print('Skills done             =\n',profile_data['skills'])

    # Navigate back to the main profile page
    driver.back()
    sleep(4)

def scrape_linkedin_profile(driver, wait, profile_url):
    global profile_data
    global url

    url = profile_url
    profile_data = {}  # Dictionary to store profile data
    sections = None  # Sections in LinkedIn (e.g., about section, experience section, etc.)

    try:
        driver.get(profile_url)
        scrape_name_headline()
        scrape_pfp_banner()
        sections = get_all_sections_list()
        scrape_about(sections)
        scrape_experience(sections)
        scrape_projects()
        scrape_skills()
    except TimeoutException:
        print(f"Timeout while scraping {profile_url}. Ensure the URL is correct or handle CAPTCHA.")
    except Exception as e:
        print(f"Error occurred while scraping {profile_url}: {e}")
    finally:
        return profile_data
    
def save_profile_data_to_json(data, file_name="profile_datas.json"):
    try:
        # Convert Python dictionary to a JSON string and save it to a file
        with open(file_name, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, indent=4, ensure_ascii=False)
        print(f"Profile data saved to {file_name}")
    except Exception as e:
        print(f"An error occurred while saving JSON: {e}")

def scrape_multiple_profiles(profile_urls):
    load_dotenv(override=True)
    
    global driver
    global wait
    results = []
    driver = webdriver.Chrome()  # Start a new browser window
    wait = WebDriverWait(driver, 10)  # WebDriverWait instance with a 10-second timeout

    try:
        login()  # Perform login once
        for url in profile_urls:
            print(f"Scraping URL: {url}")
            profile_data = scrape_linkedin_profile(driver, wait, url)
            results.append(profile_data)
    except Exception as e:
        print(f"Error during scraping multiple profiles: {e}")
    finally:
        driver.quit()  # Ensure the driver is closed properly
    save_profile_data_to_json(results, 'testing_data.json')
    return results


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scraper.py <LinkedIn_Profile_URL1> <LinkedIn_Profile_URL2> ...")
        sys.exit(1)

    profile_urls = sys.argv[1:]  # Accept multiple URLs from command-line arguments
    scraped_data = scrape_multiple_profiles(profile_urls)

    # Optionally save the scraped data to a JSON file
    with open("scraped_profiles.json", "w") as file:
        json.dump(scraped_data, file, indent=4)

    print("Scraping completed. Results saved to scraped_profiles.json")





# def scrape_linkedin_profile(profile_url):
#     load_dotenv(override=True)
#     global driver
#     global wait
#     global profile_data
#     global url

#     url = profile_url

#     driver = webdriver.Chrome()  # start a new window with chrome web browser
#     wait = WebDriverWait(driver, 10)  # WebDriverWait instance with a 10-second timeout
#     profile_data = {}  # dictionary to store profile data
#     sections = None # sections in linkedin (eg about section, experience section, etc)
#     try:
#         login()
#         scrape_name_headline()
#         scrape_pfp_banner()
#         sections = get_all_sections_list()
#         #print('sections = ',sections)
#         scrape_about(sections)
#         scrape_experience(sections)
#         scrape_projects()
#         scrape_skills()
#         # print("Profile_data = ", profile_data)
#     except TimeoutException:
#         print("Timed out waiting for a page element. Ensure that the provided URL is correct or maybe a wild captcha appeared.")
#     except Exception as e:
#         print(f"An error occurred: {e}")
#     finally:
#         driver.quit()
#         #save_profile_data_to_json(profile_data)  # Saves the JSON file in the same directory
#         return profile_data

# if __name__ == "__main__":
#     if len(sys.argv) < 2:
#         print("Usage: python scraper.py <LinkedIn_Profile_URL>")
#         sys.exit(1)
#     profile_urls = sys.argv[1]
#     scrape_linkedin_profile(profile_urls)   # is exported and can be imported to other python files






























# import warnings
# warnings.filterwarnings("ignore")
# import os
# from bs4 import BeautifulSoup
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# import time
# from time import sleep

# from dotenv import load_dotenv
# load_dotenv()

# url = "https://www.linkedin.com/in/laxmimerit" # profile to scrape
# driver = webdriver.Chrome() # start a new window with chrome web browser
# global soup
# time.sleep(1)
# profile_data = {}  # here we will store the data

# def login(): # credentials in .env
#   driver.get('https://www.linkedin.com/login')
#   time.sleep(3)

#   if(driver.title!='LinkedIn Login, Sign in | LinkedIn'):
#     print('Error not on login page')
#     return
  
#   email = driver.find_element(By.ID, 'username')
#   email.send_keys(os.environ['EMAIL'])

#   password = driver.find_element(By.ID, 'password')
#   password.send_keys(os.environ['PASSWORD'])

#   password.submit()   # now the screen should be on https://www.linkedin.com/feed/
#   time.sleep(3)

    
# def scrape_name_headline():
#   driver.get(url)  # goes to the profile page
#   time.sleep(3)
#   if driver.title == 'LinkedIn':
#     print('Error Please provide a proper linkedin profile url')
#     return
#   page_source = driver.page_source  # gets all the html code
#   time.sleep(3)
#   soup = BeautifulSoup(page_source, 'lxml') # parse
#   name = driver.find_element(By.XPATH, "//h1[contains(@class, 'inline') and contains(@class, 't-24') and contains(@class, 'v-align-middle')]").text
#   time.sleep(3)

#   #print('name = ',name)

#   name = name.strip() # remove extra spaces and stuff

#   profile_data['name'] = name
#   profile_data['url'] = url

#   headline = soup.find('div', {'class': 'text-body-medium break-words'})
#   sleep(2)
#   headline = headline.get_text().strip()

#   profile_data['headline'] = headline
#   print('headline fetched')

# def get_all_sections_list():
#   page_source = driver.page_source
#   soup = BeautifulSoup(page_source, 'lxml')
#   sleep(1)

#   return soup.find_all('section', {'class': 'artdeco-card pv-profile-card break-words mt2'})  # get all the sections



# def scrape_about(sections):  # should still be on the profile page
#     for sec in sections:
#       if sec.find('div', {'id': 'about'}): 
#         about = sec
    
#     if not about:
#       print('No about section')
#       profile_data['about'] = ""
#       return
    
#     about = about.find('div', class_='display-flex ph5 pv3') # div contains about data
#     sleep(1)
#     about = about.get_text().strip()

#     profile_data['about'] = about

# def get_exp(exp):
#   exp_dict = {}

#   name = exp.find('div', {'class': 'display-flex flex-wrap align-items-center full-height'}) # div containing name
#   name = name.find('span', {'class': 'visually-hidden'})  # span containing name
#   name = name.get_text().strip()  # get name from html like code

#   duration = exp.find('span', {'class': 't-14 t-normal'})  # div containing duration
#   duration = duration.find('span', {'class': 'visually-hidden'})  # span containing duration
#   duration = duration.get_text().strip() # get duration data

#   exp_dict['company_name'] = name
#   exp_dict['duration'] = duration

#   designations = exp.find_all('div', {'class': 'fPLNkfiTqBJivqMiXLaRuObcmlUMZsDPkIAVk yCpXOOXwXcJnFOsCoYTsmMdAvLcplVbgNCBU'}) # find all designations of person within the company

#   item_list = []
#   for position in designations:
#       spans = position.find_all('span', {'class': 'visually-hidden'}) # gets the list of spans containing the required data

#       item_dict = {}
#       item_dict['designation'] = spans[0].get_text().strip()
#       item_dict['duration'] = spans[1].get_text().strip()
#       item_dict['location'] = spans[2].get_text().strip()

#       try:
#           item_dict['projects'] = spans[3].get_text().strip()  # if this span exists store the data
#       except:
#           item_dict['projects'] = ""

#       item_list.append(item_dict)

#   exp_dict['designations'] = item_list
#   return exp_dict

# def scrape_experience(sections):
#   for sec in sections:
#     if sec.find('div', {'id': 'experience'}):  # find the experience section
#       experience = sec
  
#   if not experience:
#     print('No experience found')
#     profile_data['experience'] = ""
#     return
  
#   experience = experience.find_all('div', {'class': 'fPLNkfiTqBJivqMiXLaRuObcmlUMZsDPkIAVk SeRILEEOfWLelfcuceiLywOjAamlMoEkmnTdFk itGgYIXPpfAaqNrUDXHQVkGSUXMzldwQtdzM'})
#   item_list = []
#   for exp in experience:  
#     item_list.append(get_exp(exp))
  
#   profile_data['experience'] = item_list


# def get_project(item):
#   spans = item.find_all('span', {'class': 'visually-hidden'})

#   item_dict = {}
#   item_dict['project_name'] = spans[0].get_text().strip()
#   item_dict['duration'] = spans[1].get_text().strip()
#   item_dict['description'] = spans[2].get_text().strip()

#   return item_dict

# def scrape_projects():
#   driver.find_element(By.ID, "navigation-index-see-all-projects").click()
#   sleep(4)
#   page_source = driver.page_source
#   soup = BeautifulSoup(page_source, 'lxml')
#   sleep(1)

#   soup = soup.find('section', {'class': 'artdeco-card pb3'})
#   items = soup.find_all('div', {'class': 'fPLNkfiTqBJivqMiXLaRuObcmlUMZsDPkIAVk SeRILEEOfWLelfcuceiLywOjAamlMoEkmnTdFk itGgYIXPpfAaqNrUDXHQVkGSUXMzldwQtdzM'})
#   item_list = []
#   for item in items:
#     item_list.append(get_project(item))

#   profile_data['projects'] = item_list
#   driver.back()
#   sleep(4)

# def get_skills(item):
#     spans = item.find_all('span', {'class': 'visually-hidden'})
#     skill = spans[0].get_text().strip()
#     return skill

# def scrape_skills():
#   try:
#     view_all_skills_link = driver.find_element(
#         By.XPATH, "//a[contains(@id, 'navigation-index-Show-all-') and contains(@id, '-skills')]"
#     )
#     view_all_skills_link.click()
#     sleep(4)
#     print("Successfully clicked the 'Show All Skills' link.")
#   except Exception as e:
#     print("Failed to find or click the link:", e)

#   page_source = driver.page_source
#   soup = BeautifulSoup(page_source, 'lxml')
#   sleep(1)

#   soup = soup.find('section', {'class': 'artdeco-card pb3'}) # gets the section containing all skills
#   items = soup.find_all('div', {'class': 'fPLNkfiTqBJivqMiXLaRuObcmlUMZsDPkIAVk SeRILEEOfWLelfcuceiLywOjAamlMoEkmnTdFk itGgYIXPpfAaqNrUDXHQVkGSUXMzldwQtdzM'})

#   skill_list = []
#   for item in items:
#     skill_list.append(get_skills(item))
  
#   profile_data['skills'] = skill_list
#   driver.back()
#   sleep(4)



# sections = None

# login()
# scrape_name_headline()
# sections = get_all_sections_list()
# scrape_about(sections)
# scrape_experience(sections)
# scrape_projects()
# scrape_skills()
# print('Profile_data = ',profile_data)
