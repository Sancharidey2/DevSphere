import cv2
import dlib
import numpy as np
from scipy.spatial import distance as dist
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

# Function to calculate the eye aspect ratio (EAR)
def eye_aspect_ratio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])
    C = dist.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

# Load the face detector and shape predictor from dlib
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# Define the indexes for the left and right eyes
(l_start, l_end) = (42, 48)
(r_start, r_end) = (36, 42)

# Load the video capture
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

# Initialize lists to store ground truth and predictions
ground_truth = []
predictions = []

while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Couldn't read a frame.")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Use the face detector
    faces = detector(gray, 0)

    for face in faces:
        shape = predictor(gray, face)
        shape = [(shape.part(i).x, shape.part(i).y) for i in range(68)]

        left_eye = shape[l_start:l_end]
        right_eye = shape[r_start:r_end]

        ear_left = eye_aspect_ratio(left_eye)
        ear_right = eye_aspect_ratio(right_eye)
        ear_avg = (ear_left + ear_right) / 2.0

        # Convert eye landmarks to NumPy arrays
        left_eye_np = np.array(left_eye, dtype=np.int32)
        right_eye_np = np.array(right_eye, dtype=np.int32)

        # Draw the eyes on the frame
        cv2.polylines(frame, [left_eye_np], True, (0, 255, 0), 1)
        cv2.polylines(frame, [right_eye_np], True, (0, 255, 0), 1)

        if ear_avg < 0.25:
            cv2.putText(frame, "Drowsy!", (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            drowsy_label = 1
        else:
            drowsy_label = 0

        # Append the ground truth label for the current frame
        ground_truth.append(1)  # Replace with actual ground truth label

        # Append the predicted label for the current frame
        predictions.append(drowsy_label)

    cv2.imshow("Drowsiness Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release video capture
cap.release()
cv2.destroyAllWindows()

# Calculate performance metrics
accuracy = accuracy_score(ground_truth, predictions)
precision = precision_score(ground_truth, predictions)
recall = recall_score(ground_truth, predictions)
f1 = f1_score(ground_truth, predictions)
conf_matrix = confusion_matrix(ground_truth, predictions)

# Display performance metrics in the console
print("Accuracy:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("F1 Score:", f1)
print("Confusion Matrix:\n", conf_matrix)
