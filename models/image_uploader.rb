class ImageUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

    process :convert => 'png'
    process :tags => ['post_picture']

    version :standard do
      process :eager => true
      process :resize_to_fit => [350, 350, :north]
    end


end
