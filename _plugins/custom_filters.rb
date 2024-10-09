module CustomFilters
    def lowercase(input)
      input.downcase
    end
  end
  
  Liquid::Template.register_filter(CustomFilters)