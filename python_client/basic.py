import requests

class Api_consuming:


    def __init__(self, endpoint):
        self.endpoint = endpoint
        self.headers = ""


    def login(self,email,password):
        auth_response = requests.post(self.endpoint+"token/",
                                      json={'email': email, 'password': password})
        #print(self.endpoint[:-1] + "-auth/login/?next=/api/")
        if auth_response.status_code == 200:
            token = auth_response.json()['access']
            self.headers = {
                "Authorization": f"Bearer {token}"
            }
            return auth_response.status_code
            #get_response = requests.get(self.endpoint, headers=headers)
        return auth_response.json()


    def get_list(self):

        get_response = requests.get(self.endpoint)  # HTTP Request
        # get_response = requests.post(endpoint, json={"title": "Abc123", "content": "Hello world", "price": "abc134"})
        # print(get_response.headers)
        # print(get_response.text) # print raw text response
        # print(get_response.status_code)

        # HTTP Request -> HTML
        # REST API HTTP Request -> JSON
        # JavaScript Object Nototion ~ Python Dict
        return get_response.json()


    def blog_detail(self,pk):

        get_response = requests.get(self.endpoint+str(pk)+"/", headers=self.headers)
        return get_response.json()


    def create_blog(self,data):

        response = requests.post(self.endpoint, json = data)
        return response.json()


    def update_blog(self,pk):

        new_data = dict(self.blog_detail(pk))
        new_data["title"] = new_data["title"]+" Updated"
        response = requests.put(self.endpoint+str(pk)+"/", json=new_data, headers=self.headers)

        return response.json()


    def delete_blog(self,pk):

        response = requests.delete(self.endpoint+str(pk)+"/",headers=self.headers)
        return response.json()


if __name__ == "__main__":

    consume = Api_consuming('http://localhost:8000/api/')
    data = {'title': 'blog title', 'author': 2, 'excerpt': 'blog excerpt', 'content': 'blog content'}
    print(consume.login('a@a.com','testing321'))
    #print(consume.get_list())
    print(consume.create_blog(data))
    #print(consume.blog_detail(2))
    #print(consume.update_blog(3))
    #print(consume.delete_blog(3))