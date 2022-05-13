# Term Project: Water Map & Scheduler

## Section 1: Introduction 
### 1.1 Project Specific Details
* Project Name:
  * Water Map & Scheduler
* Team members & Division of labour:
  * Manuel Quezada (mquezad1) - Frontend
  * Maya Fleischer (mfleisc1) - Frontend
  * Christopher Pellinger (cpelling) - Backend
  * Emily Hinds (ehinds3) - Backend
* Total estimated time to complete the project: 
  * 100 hours

### 1.2 Purpose
* What problem does your project try to solve?
  * The goal of this project is to improve access to water and encourage regular water drinking by college students. It aims to target Brown students and make use of sustainable water sources. The project would be able to remind a user of the need to drink water and help them identify the nearest water access point. It also shows people how much water they should be drinking in a day. By allowing people to find publicly accessible water it will also allow people to utilise reusable water bottles reducing plastic waste, improve hygiene and make people’s lives easier. 
* Who does this problem affect? How?
  * Many college students forget to drink water and fill up their water bottles and they do not know of all the sustainable water sources around them. Many people buy and refrigerate bottled water because it is “easier”. They are not aware of the water options around them and we hope to show these options and encourage this behaviour.
* Why and how does your project help solve this problem?
  * Our project will provide a map-based application where users will be able to submit and find locations where one can find access to public water. This would be better than existing approaches such as WeTap because we’ll include indoor data as well, such as the water bottle fillers in Faunce.
There will also be functionality to rate the quality and standard of the water location. This will ensure that the locations are real locations and the community feedback will improve the quality of the application.
Users can choose ro register with the website in which case they can receive updates throughout the day reminding them of their water drinking goals and where and when they can fill up their water bottles.
* Why choose to solve this problem over others?
  * We think that increasing access to free clean water is extremely important and a right everyone should have. In Paris there is an amazing public water system, along with an app similar to the one we are describing. We want to create this app to improve access to free clean water. We would like to reduce waste from plastic water bottles.

### 1.3 Intended Audience and Intended Use
* Who are your intended end-users?
  * Our intended end-users will be anyone who frequents Brown’s campus. THis could be expanded later but for now and for simplicity it will be limited to Brown.
* How will the app fit into the lives of your users?
  * This project will be best for personal use and we anticipate that users will use it anytime they find themselves in a situation where they cannot find access to water or they would like help reminding themselves of their water drinking habits.
  * They can connect and find the best water and find out about new locations near them that have clean drinking water.

### 1.4 External Stakeholders
* Managers/owners of public water sources (water fountains or bottle filling stations)
  * The increased use or demand of these locations could put them under pressure. Drinking water locations would require upkeep for things such as replacing the filters and funding the water.
* Direct competitors
  * Other apps/websites/projects who attempt to provide the same service, such as WeTap that we mentioned earlier.
* Water-providing private companies might feel threatened due to the decrease in sales
  * We encourage these organisations to support us in the attempt of giving access to public water to those most in need.

### 1.5 Scope and User Stories
* What our app is NOT doing:
  * Actively tracking a user’s location
  * Providing the service anywhere other than on or near Brown’s campus
* What are your app’s user stories?
  * User can find places to refill their reusable water bottle
  * User can create and log into a personal account
   * They can specify their general routine, water bottle size and goal water intake
  * Users can submit their own locations and comment/rate already existing locations
  * Users can be routed to the closest water locations or any water location of their choosing
  * Users can see how much water they should have consumer and monitor this throughout the day
  * They can input when and where they fill up their bottle

### 1.6 Definitions and Acronyms
None

## Section 2: Overall Description
### 2.1 User Needs
**Stakeholders + Gathering Requirements**
* A user will need to find water access quickly and somewhere that is not far out of the way. It is important that it is not far to walk, not out of the way of where the user is going, and that there will be little to no waiting time.
* There is very little signage and navigation to current water locations so users must rely on local knowledge or other forms of navigation. Googling and other map applications (such as Apple Maps, Waze and Google Maps) do not have very good data for water locations. Many users rely on map apps for many things and there is currently no good map application for water locations.
* It is less useful in a place that is well known to the user (such as Brown students on College hill), but it would be very useful and relevant for someone who did not know the area. It would also be exciting if we were to expand to larger areas as the number of users and people for whom the app is helpful would increase.
* In a place that is somewhat unfamiliar to a user this product could be used multiple times in a day. It can be part of planning a day or a trip and/or can be used when the need arises. The context will be when out and about in a new place - when visiting a friend or child at university, when trying to find the highest standard of public restroom or when looking for clean and reliable drinking water.
* The owners/managers of water locations would perhaps like to have special profiles to monitor their location, view and respond to feedback and to keep the condition, levels of business and other data about their location current.

### 2.2 Assumptions and dependencies
* What software and other technology does your project rely on?
  * Java, React JS, HTML, CSS, SQLite3, Google Maps API
* What non-technical dependencies does your project rely on?
  * The application relies on users to improve and keep the data current.
  * The public water access needs to remain available and of a high enough standard that users will use them.
* What normative assumptions are you making?
  * We are assuming that people will use a web app rather than asking around or using a map or another way of gathering information.
  * People have a goal of drinking sufficient water throughout the day and struggle to do this.
  * People will check the website throughout the day.
* Financial dependencies
  * Continued access to IntelliJ through Brown, internet costs, potential costs of any APIs used.

## Section 3: System Features and Requirements
### 3.1 Risks
**Stakeholder Risks**
* **Unfair outcomes**: language may be an issue in this application as we are writing the application for an English speaking user. It may be a good idea to look into translation functionality for a future version of the project.
* **Identity representation**: the application may be used more by people who rely on and are more familiar with other map applications already and who have internet access. The identity of these people will be who represents the application.
* **Data manipulation**: the data will be updated by users and so there is the chance of incorrect data being imputed. However, with a high enough number of users this will be able to self-regulate.
* **Disproportionate benefits**: we do not expect our application to disproportionately benefit one group over others, though some stakeholders may not feel like all of their needs are being met.
* **Publicly accessible data**: the data that will be publicly accessible will be information about water locations, which is not particularly sensitive. The information about users will be on an opt-in basis.
* **Non-consensual data harvesting**: users will have to agree to sharing their data before they use the application. 
* **Blackbox algorithms**: our algorithms are fairly straightforward and the inner-workings of the program will be provided to users (professors and TAs) who can then pass it on to students 
* **Community wellbeing**: we expect only positive benefits to community wellbeing, as we hope the app helps people find clean, reliable and easily accessible water and restrooms. 
* **Inefficient use of resource**s: we do not expect out app to inefficiently use any resources as it does not contain an excessive amount of data

**External risks**
* **Social context**: the application aims to help anyone find access to water locations, however it may be used more by people who rely on and are more familiar with other map applications already. It can help visitors to a place but also local people who struggle to find access to clean water and restrooms.
* **Environmental harms**: Although some of our technical dependencies still rely on unsustainable energy (such as fossil fuels) in some place and, as previously stated, like any computing project, our app relies on a global supply chain supported by cheap labour in “developing” countries, our project will also have a positive impact in encouraging reusable water bottles and advocating for sustainable water locations.

### 3.2 Data Requirements 
* The user will need to give a name and an email address to make an account. This data will need to be stored somewhere (as a list of users) and able to be easily retrieved when a user tries to log in or make a new profile.
* We will also need to store data of all the existing water locations and all the comments and ratings that the location has received. The data would have different types of water locations as well as their physical location.
* All of this data needs to be visible on the UI and needs to be retrieved quickly and efficiently from any device anywhere geographically.

### 3.3 System Features 
Instructions for using the GUI:
* To run the website open 3 terminals:
  * In the first, `cd` into `backend` and run `mvn package && ./run –gui`
  * In the second, `cd` into `frontend` and run `node server.js`
  * In the third, `cd` into frontend and run `npm start`
* This should run the website.
  * Once on the website, there will be a navigation bar with different pages.  Home, About, Map, Contact and Sign up and Log in.
  * To use the page, a user needs to make a profile.
  * After a profile is created, the user can edit their information by clicking on their name in the top right corner.  They can also add schedule information (or log out).  The schedule is used in the recommendations of the closest water fountain. 
  * The Map page can be used to find a place to fill up a water bottle.  The user can either look for a filling station based on their location or they can ask for a recommendation based on where their schedule says they should be.
    * By schedule: If there is no available schedule information (none relevant to the time of day), it will report that and give the option for the user to find a fountain by searching using location.  If there is available information, it will find the location of the relevant event and give 3 suggested fountains near you.
    * By location: It will give 3 suggested fountains near you.
 * The user can search for a building or click on a pin on the map to see the water fountains available at that building.
 * If a fountain is selected, the reviews and ratings for that fountain will be displayed.  The current user can add a review for the fountain and give a star rating.

We will organise our code into packages based on frontend and backend:
* `frontend` package: 
  * `components`
    * React functional components that are reused throughout the website, for example the Bottom Bar and the Navigation Bar.
  * `main-pages`
    * React functional components that make up the structure of the website. All files are functional components that return a JSX element. Firebase is used for Authentication and sqlite3 is used for storing data.
    * This contains a page for each of the main pages of the website, namely Home, About, Map and Contact.  It also has pages for UserProfile and Schedule.
    * The Maps pages uses the Google Maps Api and the Contact page uses a node.js server for the sending of emails.
  * `App.js`
    * Initialises Firebase and sets up a BrowserRouter for Main.js. 
    * Firebase is used for user authentication.
  * `Main.js`
    * Sets up the React Router paths for all of our components. Specifically, it uses React.Routes and React.Route.
* `backend` package
  * NOT DONE YET

### 3.4 Functional Requirements 
**3.4.1 API and Database connections****
* Google Maps API
* Database that we create and maintain of water bottles on campus and buildings at Brown
* Database of user emails, passwords, class/activity start and end times, locations, water bottle size

**3.4.2 Map visualisation**
* This will be a map of campus with buildings that can be clicked on. Once a building is clicked on you can view a drop down of all of the building’s water filling stations.

**3.4.3 User profiles/login**
* Users can login and create a profile. This information will be stored in a database. When creating their profile, they can input their activity start and end times, as well as the location from a dropdown of Brown buildings.

**3.4.4 Rating/comments**
* Can rate on temp, taste, and accessibility/functionality. Will appear as star ratings.

### 3.5 Testing Plan 
**3.5.1 Backend/Database Testing**
* This will be done with JUnit. Testing folder can be found [here](https://github.com/cs0320-s2022/term-project-cpelling-ehinds3-mfleisc1-mquezad1/tree/master/backend/src/test/java/edu/brown/cs/student/main).

### 3.6 External Interface Requirements
* Users will interact with the app via a web page. It will require the use of a mouse to navigate the screen, or an accepted alternative that works on a desktop. This web page will require an active internet connection, and access to the location of the user (if this information is not wanted to given the user can manually input their location)

### 3.7 Non-functional Requirements
* **Performance**: given that someone would like to be able to identify and rate a location with ease and quickly, it is important that our site be reliable and fast. The user should not have to wait for anything to load or be changed and all updates should seem seamless.
* **Security**: users will have profiles which will contain information (although limited) about them, such as name and email address and - by way of where the locations they have visited/rated are - their location. It is of critical importance that our program has good security and that this information cannot be leaked or accessed by a third-party. 
* **Privacy**: since signing up for the site will be voluntary, we need to ensure privacy is of a standard accepted by our users. We will aim for the highest standard of privacy.
* **UI**: to get users to want to use our application, we need to have a UI that is logical, easy to use and somewhat attractive. This is part of what will bring users in and keep their attention.
