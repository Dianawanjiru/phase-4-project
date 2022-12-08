class Post < ApplicationRecord
    belongs_to :user
    validates :title, presence: true
    validates :description, presence: true
    validates :description, length: {minimum: 50}
    
end
