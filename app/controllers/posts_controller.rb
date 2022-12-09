class PostsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :valid_user
    rescue_from ActiveRecord::RecordNotFound, with: :power_not_found
    before_action :authorize
    skip_before_action :authorize, only:[:index, :show]
    def index
        posts = Post.all
        render json: posts, status: :ok
    end

    def create
        user = User.find_by(id: session[:user_id])
        post = Post.create!(user_id:user.id, title:post_params[:title], image_url:post_params[:image_url], description:post_params[:description])
        render json: post, status: :created
    end

    def show
        post = Post.find_by(id: params[:id])
        render json: post, status: :ok

    end

    def update
        user = User.find_by(id: session[:user_id])
        post = user.posts.update!(update_params)
        render json: post, status: :ok
    end

    def destroy
        post = post.find_by(id: params[:id])
        post.destroy
        head :no_content
    end


    private

    def post_params
        params.permit(:title, :image_url, :description)
    end

    def update_params
        params.permit(:title, :description)
    end

    def authorize
        return render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
    end

    def valid_user(valid)
        render json: {errors: valid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def post_not_found
        render json: {error: "post not found"}, status: :not_found
    end
end
