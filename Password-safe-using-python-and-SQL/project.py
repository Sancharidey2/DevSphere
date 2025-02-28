from tkinter import *
from tkinter import messagebox
import sqlite3


# Main Window
root = Tk()
root.iconbitmap(r'Images/icon.ico')
root.title('CredSafe')
root.geometry('780x580+286+60')
root.configure(background="#222831")
root.minsize(780, 580)

# Data Base
con = sqlite3.connect('emailpass.db') # for password and emails entered by the user (Access)

c = con.cursor()

# creating table
'''
c.execute("CREATE TABLE mailpass (acc text, email text, user text, pass text)")
'''
con_mail = sqlite3.connect('login_system.db') # password in the begining 

c_mail = con_mail.cursor()
'''
c_mail.execute("CREATE TABLE mainlogin (login text)")
'''
c_mail.execute("SELECT * FROM mainlogin")
firstpass = c_mail.fetchall()

def first_pass():
    con_mail = sqlite3.connect('login_system.db')

    c_mail = con_mail.cursor()

    c_mail.execute("""INSERT INTO mainlogin (login) VALUES (:firstpass)""",
    {
    'firstpass' : firstpass_entry.get()
    })
    
    con_mail.commit()

    con_mail.close()

    firstpass_toplvl.destroy()

if len(firstpass) == 0:
    firstpass_toplvl = Toplevel(root, bg="#142850")
    firstpass_toplvl.title("Enter firstpass")
    firstpass_toplvl.iconbitmap(r'Images/icon.ico')
    firstpass_toplvl.geometry("400x200+483+268")

    firstpass_entry = Entry(firstpass_toplvl, font=('Consolas', 12, 'italic'))
    firstpass_entry.pack()
    firstpass_btn = Button(firstpass_toplvl, text='CHANGE PASSWORD', bg='#142850', relief=FLAT,
                                    fg='#ff9d9d', bd=0, font=('MADE TOMMY', 12), command=first_pass)
    firstpass_btn.pack(pady=30)

    


# FUNCTION WHEN CLICKED ENTER
def clicked_enter():
    def change():
            change = Toplevel(root, bg="#142850")
            change.title("Change Password")
            change.iconbitmap(r'Images/icon.ico')
            change.geometry("400x200+483+268")

            newframe = LabelFrame(change, bg='#142850', bd=0)
            newframe.pack(pady=(30,10))
            renewframe = LabelFrame(change, bg='#142850', bd=0)
            renewframe.pack()

            new_pass = Label(newframe, text="New Password", font=('Bahnschrift', 12, 'bold'), bg="#142850", fg="#ffffdd")
            new_pass.pack(side=LEFT, padx=(0,10))
            new = StringVar()
            new_entry = Entry(newframe, font=('Consolas', 12, 'italic'), textvariable=new)
            new_entry.pack(side=LEFT)
            new_entry.focus()

            renew_pass = Label(renewframe, text="Re-Enter", font=('Bahnschrift', 12, 'bold'), bg="#142850", fg="#ffffdd")
            renew_pass.pack(side=LEFT, padx=(0,50))
            renew = StringVar()
            renew_entry = Entry(renewframe, font=('Consolas', 12, 'italic'), textvariable=renew)
            renew_entry.pack(side=LEFT)

            def final_change():
                if len(new_entry.get()) == 0:
                    messagebox.showerror('Left it blank', 'Field Left Blank')
                    new_entry.focus()

                elif new.get() == renew.get():
                    con_mail = sqlite3.connect('login_system.db')

                    c_mail = con_mail.cursor()
                    
                    c_mail.execute("""UPDATE mainlogin SET 
                                    login = :login_dic

                                    WHERE oid = 1""",
                                    {
                                        'login_dic': new.get()
                                    })


                    con_mail.commit()

                    con_mail.close()

                    messagebox.showinfo('Succesful', 'Password Has Been Changed')

                    new_entry.delete(0,END)
                    renew_entry.delete(0,END)
                    change.destroy()

                                    
                else:
                    messagebox.showwarning('INCORRECT', "PASSWORDS DON'T MATCH")
                    new_entry.delete(0,END)
                    renew_entry.delete(0,END)
                    new_entry.focus()

                                                             

            enter_newpass = Button(change, text='CHANGE PASSWORD', bg='#142850', relief=FLAT,
                                    fg='#ff9d9d', bd=0, font=('MADE TOMMY', 12), command=final_change)
            enter_newpass.pack(pady=30)
    

    con_mail = sqlite3.connect('login_system.db')

    c_mail = con_mail.cursor()
                    
    
    c_mail.execute("SELECT * FROM mainlogin")
    main_pass = c_mail.fetchall()      
    

    for k in main_pass:
        if user.get() == str(k[0]):
            password.destroy()
            pass_entry.destroy()
            icon_label.destroy()
            enter.destroy()
            definition.destroy()
            
            root.geometry('800x550')
            root.title('CredSafe')

            # FRAME FOR 2ND WINDOW
            frame1 = Frame(root, bg='#222831')
            frame1.pack()

            database = Label(frame1, text='CredSafe', font=('Modern No. 20', 50, 'bold'), fg='#ffffff', bg='#222831')
            database.pack(pady=(20, 0))

            acessfiles = LabelFrame(root, bg='#222831', bd=0)
            acessfiles.pack(pady=40)

            

            # FUNCTION WHEN CLICKED SAVE
            def clicked_save():
                top_save = Toplevel(root, bg='#212121')
                top_save.title('CredSafe')
                top_save.iconbitmap(r'Images/save.ico')
                top_save.geometry('780x580+286+60')

                # ACCOUNT, MAIL, USER, PASS
                main_frame_0 = LabelFrame(top_save, bd=0, bg='#212121')
                main_frame_0.pack()
                head = Label(top_save, text='Enter Credentials', font=('DODGE', 32), bg='#212121', fg='#a7ff83')
                head.pack(pady=30)
                mai_frame = Frame(top_save, bg='#212121')
                mai_frame.pack()
                main_frame_1 = LabelFrame(mai_frame, bd=0, bg='#212121')
                main_frame_1.pack(side=LEFT, padx=20)
                acc_lbl = Label(main_frame_1, text='Account Type', font=('Mason', 20), fg='#17b978', bg='#212121')
                acc_lbl.pack(pady=20, anchor=E)
                email_lbl = Label(main_frame_1, text='Email', font=('Mason', 20), fg='#17b978', bg='#212121')
                email_lbl.pack(pady=(0,20), anchor=E)
                username_lbl = Label(main_frame_1, text='Username', font=('Mason', 20), fg='#17b978', bg='#212121')
                username_lbl.pack(pady=(0,20), anchor=E)
                pass_lbl = Label(main_frame_1, text='Password', font=('Mason', 20), fg='#17b978', bg='#212121')
                pass_lbl.pack(anchor=E)
                main_frame_2 = LabelFrame(mai_frame, bd=0, bg='#212121')
                main_frame_2.pack(side=RIGHT)
                acc_ent = Entry(main_frame_2, font=('Bahnschrift', 20), width=25)
                acc_ent.pack(pady=20)
                acc_ent.focus()
                email_ent = Entry(main_frame_2, font=('Bahnschrift', 20), width=25)
                email_ent.pack(pady=(0, 20))
                user_e = Entry(main_frame_2, font=('Bahnschrift', 20), width=25)
                user_e.pack(pady=(0,20))
                pass_e = Entry(main_frame_2, font=('Bahnschrift', 20), width=25)
                pass_e.pack(pady=2)
                

                # CLICKED ADD TO SAVE WINDOW
                def click_add():

                    if email_ent.index("end") == 0:
                        messagebox.showerror('ERROR', 'Please Fill Email')

                    else:
                        con = sqlite3.connect('emailpass.db')

                        c = con.cursor()

                        c.execute("INSERT INTO mailpass VALUES(:acc, :mail, :user, :pass)",
                                {
                                'acc': acc_ent.get(),
                                'mail': email_ent.get(),
                                'user': user_e.get(),
                                'pass': pass_e.get()
                                })

                        con.commit()

                        con.close()

                        acc_ent.delete(0, END)
                        email_ent.delete(0, END)
                        user_e.delete(0, END)
                        pass_e.delete(0, END)

                        top_save.destroy()

                                    
                # ADD BUTTON
                add_btn = Button(top_save, font=('Mason', 30), bg='#DC143C', relief=FLAT,
                                 fg='#086972', text='ADD', command=click_add)
                add_btn.pack(pady=(20, 0))


            # SAVE BUTTON

            save_btw = Button(acessfiles, text='SAVE', relief=FLAT, bg='#FF0000', fg='#FFFF00', font=('Mark Pro', 35, 'bold'),
                              activebackground='#8B0000', activeforeground='#FF6347', command=clicked_save, justify=LEFT)
            save_btw.pack(padx=0)
            save_lbl = Label(acessfiles, text='Save your account with username and password', font=('MADE TOMMY', 15),
                             bg='#222831', fg='#f9ed69')
            save_lbl.pack(pady=(0, 30))


            # WHEN CLICKED ACCESS
            def access():

                # NEW WINDOW FOR ACCESS
                top_access = Toplevel(root, bg='#212121')
                top_access.title('CredSafe')
                top_access.iconbitmap(r'Images/access.ico')
                top_access.state('zoomed')
                top_access.geometry('1366x736+0+0')

                acc_heading = Label(top_access, text='Your Credentials', font=('Mark Pro', 35, 'bold'), bg='#212121', 
                                    fg='#ffd31d')  
                acc_heading.pack(pady=(20, 0))

                del_frame = LabelFrame(top_access, bg='#212121', bd=1, relief=FLAT)
                del_frame.pack(pady=(10,0))

                search_frame = LabelFrame(top_access, bg='#212121', bd=1, relief=FLAT)
                search_frame.pack()

                # MAIN WINDOW FOR ACCOUNTS
                access_frame_1 = LabelFrame(top_access, bd=0, bg='#212121')
                access_frame_1.pack(padx=20, anchor=W)

                con = sqlite3.connect('emailpass.db')

                c = con.cursor()


                c.execute("SELECT *, oid FROM mailpass")
                show_mailpass = c.fetchall()

                print_mailpass = ''

                for record in show_mailpass:
                    print_mailpass += "› " + str(record[4]) + "\n" +' '+str(record[0]) + "\n"+' '+str(record[1]) + "\n"+' '+str(record[2]) + "\n"+' '+ str(record[3]) + "\n" + "" + '\n'

                mailpass_lbl = Text(access_frame_1, bg='#212121', bd=0, padx=75,
                                     font=('Mark Pro', 20, 'bold'), fg='#a0ffe6')
                mailpass_lbl.pack()
                mailpass_lbl.insert(INSERT, print_mailpass)

                con.commit()

                con.close()
                # over

                # label & button delete
                delete_record = Label(del_frame, text='Delete a Record', font=('Arial', 15), bg='#B22222',
                                      fg='#ffffff')
                delete_record.pack(side=LEFT, padx=6)

                delete_ent = Entry(del_frame, font=('Arial', 15), width=10)
                delete_ent.pack(side=LEFT, padx=6)

                def delete():
                 con = sqlite3.connect('emailpass.db')

                 c = con.cursor()

                 c.execute("DELETE FROM mailpass WHERE oid = " + delete_ent.get())

                 delete_ent.delete(0, END)

                 con.commit()

                 con.close()

                del_btn = Button(del_frame, font=('Bahnschrift', 12), text='Delete', bg='#FFFF00', relief=FLAT, fg='#000000',
                                height=0, width=6 ,command=delete)
                del_btn.pack(side=RIGHT, padx=6)

                # search label & netry
                search_label = Label(search_frame, text='Search a Record(Using any Charecter)', font=('Arial', 15), bg='#B22222',
                                      fg='#ffffff')
                search_label.pack(side=LEFT, padx=5)

                search_entry = Entry(search_frame, font=('Arial', 15), width=10)
                search_entry.pack(side=LEFT, padx=5)

                def search_fn():


                    #remove tag 'found' from index 1 to END 
                    mailpass_lbl.tag_remove('found', '1.0', END)  
                          
                    #returns to widget currently in focus 
                    s = search_entry.get()  
                    if s: 
                        idx = '1.0'
                        while 1: 
                            #searches for desried string from index 1 
                            idx = mailpass_lbl.search(s, idx, nocase=1,  
                                                  stopindex=END)
                            if not idx: break

                                  
                            #last index sum of current index and 
                            #length of text 
                            lastidx = '%s+%dc' % (idx, len(s))  
                                  
                            #overwrite 'Found' at idx 
                            mailpass_lbl.tag_add('found', idx, lastidx)  
                            idx = lastidx 
                              
                        #mark located string as red 
                        mailpass_lbl.tag_config('found', foreground='red')  
                    search_entry.focus_set()

                search_btn = Button(search_frame, font=('Bahnschrift', 12), text='Search', bg='#FFFF00', relief=FLAT, fg='#000000',
                                height=0, command=search_fn)
                search_btn.pack(side=RIGHT, padx=6)

            # ACCESS BUTTON
            access_btw = Button(acessfiles, text='ACCESS', relief=FLAT, bg='#00FF00', fg='#A52A2A',
                                font=('Mark Pro', 35, 'bold'),
                                activebackground='#222831', activeforeground='#defcf9', command=access)
            access_btw.pack()

            access_lbl = Label(acessfiles, text='Access Saved Credentials', bg='#222831', fg='#FF9F1C',
                               font=('MADE TOMMY', 15))
            access_lbl.pack()

            changepass = Button(root, text='Change Password', font=('MADE TOMMY', 15),bg='black', relief=FLAT,
                                    activebackground='#222831', bd=0, fg='white', command=change)
            changepass.pack(pady=(20,0), fill=X)

   

        else:
            retry = messagebox.askretrycancel('Wrong Password', 'TRY AGAIN', )
            if retry == 0:
                root.destroy()
            else:
                pass_entry.delete(0, END)

    

# Images
img = PhotoImage(file='Images/medium.png')
img2 = PhotoImage(file='Images/btn.png')
icon_label = Label(image=img, bg='#222831')
icon_label.pack(pady=30)

# VERY FIRST WINDOW
definition = Label(root, text='Welcome to CredSafe', font=('SPOTNIK demo', 25),
                   bg='#a0ffe6')
definition.pack(pady=(10, 20), fill=X)

password = Label(root, text='Please enter your password', font=('SPOTNIK demo', 25, "bold"), bg='#222831', fg="#cbf1f5")
password.pack(pady=(30,25))

user = StringVar()

pass_entry = Entry(root, show='•', relief=FLAT, textvariable=user, font=('MADE TOMMY', 20))
pass_entry.focus()
pass_entry.pack(pady=(0, 10))


enter = Button(root, image=img2, text='Lets Begin', bg='#222831', relief=FLAT,
               activebackground='#222831', bd=0, command=clicked_enter)
enter.pack()

con_mail.commit()
con_mail.close()

con.commit()
con.close()


root.mainloop()