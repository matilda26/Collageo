class ImageUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  process :convert => 'png'
  process :tags => ['post_picture']

  version :standard do
    process :resize_to_limit => [300, 300, :north]
  end
end

class Asset < ActiveRecord::Base
  mount_uploader :image, ImageUploader
end
