class ImageUploader < CarrierWave::Uploader::Base
  storage :fog
end

class Asset < ActiveRecord::Base
  mount_uploader :image, ImageUploader
end
