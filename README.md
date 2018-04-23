# COLLAGEO  
Collageo is a full-stack database backed application where users can store image assets and create dynamic collages. The intention is for this app to be used to create mixed media content for instagram.

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
Initially, Amazon s3 was used for image storage, however, dropped for employment on Heroku.
### Carrierwave and Cloudinary
CarrierWave and Cloudinary are used for storage assistance on Heroku. Cloudinary is used to restrict the image size as there were issues with adding anchors for resizing images on the canvas if the image was larger that the canvas. This has resulted in a lower quality of image on download - something I would like to fix.

## Approach
My initial approach was using Konva.js. As previously mentioned, it proved to be very helpful but limiting in terms of image manipulation and unable to easily facilitate video.

## Unresolved Issues
- The intention of the app was to create a dynamic mixed media collage where users could combine image, shapes and video. The integration of video content onto the canvas and the subsequent recording and downloading of the final collage proved to be too difficult within the 5 day timeline. Going forward, I would like to look into using WebRTC or similar.
- In addition, I would like to be able to add the user's collages to their homepage once complete. This way, there can be a community section of the site, where users can share their collages, comment, get inspired. This is something that will easily be deployable... I'll do it tonight.
- I was having issues downloading the canvas with images. Being downloaded as a png, they currently have no background color. It would be great to be able to add a canvas background color or atleast export as white.
- In terms of image manipulation, I would like to be able to maintain the aspect ratio and rotate from a central origin.
- It would be great to also include a color picker function changing the shape color and background options.
- Add function to be able to upload multiple assets at once and place multiple assets onto the canvas at once.
