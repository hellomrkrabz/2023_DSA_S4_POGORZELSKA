from bs4 import BeautifulSoup


#=======================================================INTERFACE========================================================================================================
class html_proccesor:
    args = None
    def procces_html(self, html_string : str) -> str:
        pass
    def __init__(self, _args):
        pass

#======================================================ATTR_INPUTTER=====================================================================================================
class attr_input_args:
    search_tag : str
    search_index : int
    replace_attr : str
    target_value : str

    def __init__(self, _search_tag, _search_index, _replace_attr, _target_value):
        self.search_tag = _search_tag
        self.search_index = _search_index
        self.replace_attr = _replace_attr
        self.target_value = _target_value

class attr_input_args_id:
    search_id : str
    replace_attr : str
    target_value : str

    def __init__(self, _search_id, _replace_attr, _target_value):
        self.search_id = _search_id
        self.replace_attr = _replace_attr
        self.target_value = _target_value

class inner_html_input_args_id:
    search_id : str
    target_value : str

    def __init__(self, _search_id, _target_value):
        self.search_id = _search_id
        self.target_value = _target_value
#======================================================IMPLEMENTATION===================================================================================================
class html_attr_inputter(html_proccesor):
    args = attr_input_args("",0,"","")
    def procces_html(self, html_string : str) -> str:

        soup = BeautifulSoup(html_string, 'html.parser')
        items = soup.select(self.args.search_tag)

        if (len(items) - 1 >=  self.args.search_index):
            if(not self.args.replace_attr in items[0].attrs):
                print("Tag '"+self.args.search_tag+"' with index "+self.args.search_index.__str__()+" does not have attribute '"+self.args.replace_attr+"'. It has been added")
            items[self.args.search_index].attrs[self.args.replace_attr] = self.args.target_value
        else:
            print("You tried to find '"+self.args.search_tag+"' tag with index "+self.args.search_index.__str__()+" but list contains only"+len(items).__str__()+" such tags")

        return(str(soup))

    def __init__(self, _args):
        self.args = _args

class html_attr_inputter_by_id(html_proccesor):
    args = attr_input_args("",0,"","")
    def procces_html(self, html_string : str) -> str:
        print("html_attr_inputter_by_id")
        soup = BeautifulSoup(html_string, 'html.parser')
        items = soup.find(id=self.args.search_id)

        if items is None:
            print("html element with such id could not be found")
            return
        items.attrs[self.args.replace_attr] = self.args.target_value

        return(str(soup))

    def __init__(self, _args):
        self.args = _args
    

class html_inner_inputter_by_id(html_proccesor):
    args = attr_input_args("",0,"","")
    def procces_html(self, html_string : str) -> str:
        print("html_inner_inputter_by_id")
        soup = BeautifulSoup(html_string, 'html.parser')
        items = soup.find(id=self.args.search_id)
        items.replace_with(str(self.args.target_value))

        return(str(soup))

    def __init__(self, _args):
        self.args = _args
#========================================================================================================================================================================