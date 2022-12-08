class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :description, :user_id
end
