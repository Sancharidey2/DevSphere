# Influencer-Management-System
A MERN web application that allows users to manage a list of influencers
# Features

## Search:
A search bar that allows users to search for influencers by name or social media handle.
## Sort:
A dropdown menu that allows users to sort the influencer list by name, social media handle, or number of followers.

## Error handling:
The application should handle errors and display appropriate error messages to the user. 

# Run it Locally
1. Clone the repository
2. create a dev.js file in /server/config folder
   ```
   module.exports = {
    DB_URL : <Your Database URL>
   }  
   ```
3. Copy the above code in dev.js file replacing your database URL
4. cd to /server folder in terminal
5. Run this command
   ```
   npm install
   ```
6. start the server
    ```
    node app.js
   ```
7. cd to "/client/user management" folder in other terminal
8. start the react app
   ```
   npm install
   npm run dev
   ```
# Run the application live
https://hemp-influencer-manager.netlify.app/
