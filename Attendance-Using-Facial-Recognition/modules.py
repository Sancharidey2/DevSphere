from datetime import datetime
import cv2
import face_recognition

def markAttendance(name):
    with open('Attendance_finals.csv','r+') as f :
        myDataList= f.readlines()

        nameList=[]
        for line in myDataList:
            entry= line.split(',')
            nameList.append(entry[0])
        if name not in nameList:
            now = datetime.now()
            dtString= now.strftime('%H:%M:%S')
            f.writelines(f'\n{name},{dtString}')

def findEncodings(images):
    encodeList=[]
    for img in images:
        img= cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        encode=face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList