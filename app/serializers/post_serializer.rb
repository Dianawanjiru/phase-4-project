class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :"image-url", :description
end
