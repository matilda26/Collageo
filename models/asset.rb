require 'carrierwave'
require 'carrierwave/orm/activerecord'
require 'cloudinary'

class ImageUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

    process :convert => 'png'
    process :tags => ['post_picture']

    version :standard do
      process :eager => true
      process :resize_to_fit => [350, 350, :north]
    end


end

class Asset < ActiveRecord::Base
  mount_uploader :image, ImageUploader
  belongs_to :user
end
