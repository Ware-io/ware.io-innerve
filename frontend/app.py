from flask import Flask,redirect,render_template,request,jsonify
import cv2
import numpy as np
from gevent.pywsgi import WSGIServer
from PIL import Image
import cv2

app = Flask(__name__)
@app.route('/')
def index():
	# Load the image
	##image = cv2.imread('pack3.jpg')
	image = cv2.imread(r"pack4.jpg")
	##im = Image.open("pack3.jpg")
	crop_image = image[700:1200, 700:1200]
	# crop_im.show()
	cv2.imshow("Cropped", crop_image)
	image=crop_image
	
	# Convert the image to the HSV color space
	hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
	
	# # Define the color ranges for green, blue, and red
	green_lower = (40, 40, 40)
	green_upper = (70, 255, 255)
	
	blue_lower = (100, 40, 40)
	blue_upper = (140, 255, 255)
	
	red_lower = (0, 40, 40)
	red_upper = (10, 255, 255)
	
	# Threshold the image to get a mask for each color range
	green_mask = cv2.inRange(hsv_image, green_lower, green_upper)
	blue_mask = cv2.inRange(hsv_image, blue_lower, blue_upper)
	red_mask1 = cv2.inRange(hsv_image, red_lower, red_upper)
	red_lower = (170, 40, 40)
	red_upper = (180, 255, 255)
	red_mask2 = cv2.inRange(hsv_image, red_lower, red_upper)
	red_mask = cv2.bitwise_or(red_mask1, red_mask2)
	
	# Count the number of pixels in each color mask
	green_pixels = cv2.countNonZero(green_mask)
	blue_pixels = cv2.countNonZero(blue_mask)
	red_pixels = cv2.countNonZero(red_mask)
	
	# Label the image based on the color with the most pixels
	if green_pixels > blue_pixels and green_pixels > red_pixels:
	    label = 'small'
	elif blue_pixels > green_pixels and blue_pixels > red_pixels:
	    label = 'medium'
	else:
	    label = 'large'
	
	# Print the label
	print('The image has a', label, 'shade of color.')
	# Return the result as JSON
	result = {'label': label}
	return jsonify(result)
	return "hello"

if __name__ == "__main__":
	    app.run(debug=True)
