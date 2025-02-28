import pyautogui, time
time.sleep(10)
f=open("beeMovie_src.txt", 'r' )
for word in f:
    pyautogui.typewrite(word)
    pyautogui.press("enter")
    time.sleep(5)
