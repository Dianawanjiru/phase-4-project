class Post < ApplicationRecord
    validates :title, presence: true
    validades :description, presence: true
    validates :description, length: {min: 50}
    belongs_to :user
end
