class UrlsController < ApplicationController
  skip_before_action :verify_authenticity_token
  # GET /urls or /urls.json
  def index
    @urls = Url.all.order(:created_at)

    respond_to do |f|
      f.html
      f.json { render json: { data: @urls } }
    end
  end

  def all_list
    @urls = Url.all.order('created_at desc')

    render json: @urls
  end

  # POST /urls or /urls.json
  def create
    @url = Url.create(url_params)

    # if the response format is javascript, do something else...
    render json: @url
  end

  private

  # Only allow a list of trusted parameters through.
  def url_params
    params.require(:url).permit(:url)
  end
end
