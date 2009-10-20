# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def render_as_html(*args)
    old_format = self.template_format
    self.template_format = :html
    render(*args)
  ensure
    self.template_format = old_format
  end

end
