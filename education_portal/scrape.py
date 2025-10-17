import requests
from bs4 import BeautifulSoup
import re
import time
import json
import random

BASE_URL = "https://www.coursicle.com/wm/"
COURSE_LIST_URL = BASE_URL + "courses/"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

def get_all_course_prefixes():
    """Fetches the list of all department prefixes from the main course page."""
    print(f"1. Fetching department prefixes from: {COURSE_LIST_URL}")
    try:
        response = requests.get(COURSE_LIST_URL, headers=HEADERS, timeout=20)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching prefix list: {e}")
        return []

    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all links that point to a department page.
    # On the Coursicle W&M page, these are typically links like /wm/courses/CSCI/
    prefix_links = soup.select('a[href^="/wm/courses/"]')
    
    # Extract the department prefix from the URL
    prefixes = set()
    for link in prefix_links:
        href = link.get('href')
        # The URL is something like /wm/courses/PREFIX/
        match = re.search(r'/wm/courses/([A-Z]+)/$', href)
        if match:
            prefixes.add(match.group(1))
            
    # Add the departments that are listed right on the main page
    # The snippet from the search results shows a lot of them are listed in a paragraph
    # Let's try to grab all capitalized words that could be prefixes
    all_text = soup.find('body').get_text()
    potential_prefixes = re.findall(r'\b[A-Z]{4,}\b', all_text)
    prefixes.update(set(potential_prefixes))
    
    print(f"   Found {len(prefixes)} potential prefixes.")
    return sorted(list(prefixes))

def scrape_department_courses(prefix):
    """Scrapes all courses for a single department prefix."""
    dept_url = f"{BASE_URL}courses/{prefix}/"
    courses = []
    
    try:
        response = requests.get(dept_url, headers=HEADERS, timeout=30)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"   Error fetching {prefix} courses: {e}")
        return []

    soup = BeautifulSoup(response.content, 'html.parser')

    # Look for the main container that holds all the course blocks
    course_list_container = soup.find('div', class_='course-list') 
    if not course_list_container:
        # Fallback for a different layout or if all courses are directly in the main body
        course_list_container = soup
        
    # Find all course blocks/titles. This class name is a typical pattern on the site.
    course_titles = course_list_container.select('.course-listing') 
    if not course_titles:
        course_titles = course_list_container.select('.course-title-link') 


    for course_tag in course_titles:
        try:
            # The full course name is usually in an H2 or similar element
            # We'll rely on the structure of the surrounding card/div to get all details.
            
            # Find the main course name element
            title_text = course_tag.get_text(separator=' ', strip=True)
            
            # Use regex to separate the number and the name
            match = re.match(r'([A-Z]+)\s*(\d+[A-Z]?)\s*-\s*(.+)', title_text)
            
            if match:
                course_prefix = match.group(1)
                course_number = match.group(2)
                course_name = match.group(3)
            else:
                # If regex fails, fall back to a simpler parsing
                parts = title_text.split('-', 1)
                course_num_part = parts[0].strip()
                course_name = parts[1].strip() if len(parts) > 1 else "Unknown Title"
                
                num_match = re.match(r'([A-Z]+)\s*(\d+[A-Z]?)', course_num_part)
                if num_match:
                    course_prefix = num_match.group(1)
                    course_number = num_match.group(2)
                else:
                    course_prefix = prefix # Assume prefix from URL
                    course_number = course_num_part.replace(prefix, '').strip()

            # Find the closest instructor tag (this is highly dependent on HTML structure)
            instructor_tag = course_tag.find_next_sibling('.instructors')
            instructors = instructor_tag.get_text(strip=True) if instructor_tag else "N/A"
            
            # The full course link might contain more info, but for this summary, we'll stop here.
            
            courses.append({
                "prefix": course_prefix,
                "number": course_number,
                "name": course_name,
                "instructors": instructors
            })
            
        except Exception as e:
            # Handle potential errors for malformed course listings
            # print(f"      Error parsing course in {prefix}: {e}")
            continue

    return courses

# --- Main Execution (UPDATED) ---
all_courses_data = []
prefixes = get_all_course_prefixes()

# Add a long initial wait time to respect the server after the first request
print("\nWaiting 5 seconds before starting department scrapes...")
time.sleep(5) 

print("\n2. Scraping courses for each department (this may take a few minutes)...")
for i, prefix in enumerate(prefixes):
    print(f"   ({i+1}/{len(prefixes)}) Scraping {prefix}...")
    dept_courses = scrape_department_courses(prefix)
    all_courses_data.extend(dept_courses)
    
    # CRITICAL: Randomly wait between 3 and 6 seconds
    # This prevents the server from easily detecting a fixed pattern.
    delay = random.uniform(3, 6)
    print(f"   Sleeping {delay:.2f} seconds...")
    time.sleep(delay)

print(f"\n--- Scraping Complete ---")
print(f"Total courses found: {len(all_courses_data)}")

# Ensure this section is UNCOMMENTED to create the JSON file
with open('wm_coursicle_data.json', 'w') as f:
     json.dump(all_courses_data, f, indent=4)
print("\nData written to wm_coursicle_data.json")