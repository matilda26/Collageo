# COLLAGEO  
Collageo is a full-stack database backed application where users can store image assets and create dynamic collages.

## Technologies Used
### konva.js
To be able to easily manipulate and edit the items on the canvas, Konva.js - a Canvas javascript Framework - was used. Konva proved to be quite limiting in terms of image styling and transforming, however, great for shapes. Konva.js does not support video content so perhaps an alternative framework will be used going forward.
### paper.js
Paper.js - another Canvas Framework - was used for the initial home page. An unnecessary addition but adds more interactivity.
### Sinatra
Sinatra is the framework being used.
### SQL and ActiveRecord
ActiveRecord is being used to connect to the Postgresql database.
### Amazon s3 and Fog
Initially, Amazon s3 was used for image storage, however, droped for employment on Heroku.
### Carrierwave and Cloudinary
CarrierWave and Cloudinary are used for storage assistance on Heroku. Cloudinary is used to restrict the image size as there were issues with adding anchors for resizing images on the canvas if the image was larger that the canvas. This has resulted in a lower quality of image on download - something I would like to fix.

## Approach
My initial approach was using Konva.js. As previously mentioned, it proved to be very helpful but limiting in terms of image manipulation. 

## Unresolved Issues
The intention of the app was to create a dynamic mixed media collage where users could combine image, shapes and video. The integration of video content onto the canvas and the subsequent recording and downloading of the final collage proved to be too difficult within the 5 day timeline.
In addition, I would like to be able to add the user's collages to their homepage once complete.
