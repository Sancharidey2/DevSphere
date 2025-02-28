import cv2
import imutils

# Initialize the HOG person detector
hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

# Read the image
image = cv2.imread("C:\\Users\\sidsh\\OneDrive\\Desktop\\Vs Code\\Yash Github\\image.jpg")


# Check if the image was successfully loaded
if image is None:
    print("Error: Unable to load image. Please check the file path.")
else:
    # Resize the image
    image = imutils.resize(image, width=min(400, image.shape[1]))

    # Detect pedestrians in the image
    (regions, _) = hog.detectMultiScale(image, 
                                         winStride=(4, 4),
                                         padding=(4, 4),
                                         scale=1.05)

    # Draw rectangles around the detected pedestrians
    for (x, y, w, h) in regions:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # Show the output image
    cv2.imshow("Pedestrian Detection", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
