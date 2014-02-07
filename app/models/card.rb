class Card < ActiveRecord::Base
  attr_accessible :title, :user_id, :project_id, :summary, :text 
  
  validates :user_id, presence: true
  validates :project_id, presence: true
end

