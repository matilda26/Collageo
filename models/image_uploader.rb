class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  process :resize_to_limit => [300, -1]
  process convert: 'png'
  storage :fog
end
