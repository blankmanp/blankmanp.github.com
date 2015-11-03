class UsersController < ApplicationController

	before_filter :check_login, :except =>[:index, :show_blog, :login_page, :login, :auto_complete]

	def index
		@types = Type.all
	end

	def show_blog
    @types = Type.all
		type = params[:type].nil? ? 1 : params[:type].to_i
		page = params[:page].nil? ? 1 : params[:page].to_i
		unless type.nil?
			@blogs = (Blog.where(type_id: type).nil? ?  [] : Blog.where(type_id: type).order('created_at DESC').limit(10).offset((page - 1) * 10))
		end
	end

	def manage

	end

	def create_blog

	end

	def delete_blog

	end

	def edit_blog

	end

	def add_type

	end

	def edit_type

	end

	def delete_type

	end

	def login_page

	end

	def login
		username = params[:username]
		password = params[:password]
		if User.find_by_name(username).nil?
			respond_to do |format|
				format.json { render json: {success: 0, info: '未找到该用户！'} }
			end
		else
			if User.find_by_name_and_password(username, password).nil?
				respond_to do |format|
					format.json { render json: {success: 0, info: '密码错误！'} }
				end
			else
				session[:username] = username
				session[:user_id] = User.find_by_name(username)['id']
				respond_to do |format|
					format.json { render json: {success: 1} }
				end
			end
		end
	end

	def logout
		session[:username] = nil
		session[:user_id] = nil
		render json: 1
	end

	def auto_complete
	end

end
