# Password-Safe-Using-Python-and-SQL
With our ever increasing demand and dependence on the internet, various threats that are convoluted with it , We need to be secured and have safer access to the Internet!, which requires us to put more and more complex and unique passwords which makes it difficult to remember all of them with accuracy and hence comes a need of the password management system that does all that for you, saving the passwords at your local system away from all the internet thieves , So to play our part as a responsible student , we saw a problem and tried rectifying it with our novel idea “CredSafe” 





## INSTALLATION GUIDE
This program doesn’t require any external libraries apart from sql_lite3
 		Command to install the same is : 
>> Open Command Prompt 
>> type in pip install db-sqlite3 
>> it will automatically install if required or will upgrade to the latest  version. 

When you will first run the program at your local system it will first show a runtime error that can be easily dealt with the following steps:

To initially create the tables that will be storing your data, 
Open the source code , delete the comments of lines :  

# creating table
Line 19
'''
c.execute("CREATE TABLE mailpass (acc text, email text, user text, pass text)")
'''
con_mail = sqlite3.connect('login_system.db') # password in the begining 

c_mail = con_mail.cursor()
Line 27

'''
c_mail.execute("CREATE TABLE mainlogin (login text)")
'''

After deleting the comments , run the program. 





2.  Add Comments to the same lines,  
# creating table
Line 19
'''
c.execute("CREATE TABLE mailpass (acc text, email text, user text, pass text)")
'''
con_mail = sqlite3.connect('login_system.db') # password in the begining 

c_mail = con_mail.cursor()
Line 27

'''
c_mail.execute("CREATE TABLE mainlogin (login text)")
'''

The program should be working now. 

Note: Colour scheme may vary in  MacOS 
![image](https://user-images.githubusercontent.com/67187480/144757723-01b69ac9-1a4b-42af-a63e-6fba47545501.png)
![image](https://user-images.githubusercontent.com/67187480/144757765-4b257923-ba40-4e69-ad40-d4839d2a45a3.png)
![image](https://user-images.githubusercontent.com/67187480/144757776-8a901e09-d45e-44c0-aa2e-aa1d4a024fd1.png)
![image](https://user-images.githubusercontent.com/67187480/144757782-1c59f033-ebd2-4eb7-bff3-2d817fb80422.png)
![image](https://user-images.githubusercontent.com/67187480/144757791-121fe591-41a8-452b-95a7-fbcbcbd68916.png)
![image](https://user-images.githubusercontent.com/67187480/144757804-7ee39135-1214-43f2-95a2-ab2c077a1b10.png)
![image](https://user-images.githubusercontent.com/67187480/144757809-20c74adf-8cac-4a18-a8b9-8e729c2d1210.png)

![image](https://user-images.githubusercontent.com/67187480/144757815-ee133b8d-e39a-423e-b941-5b65f49c8ffb.png)

