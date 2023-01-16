from django.urls import reverse, reverse_lazy
from rest_framework import status
from rest_framework.test import APITestCase,APIClient
from blog_api.models import Post,Category
from users.models import NewUser
import numpy
from PIL import Image
import io
from rest_framework.authtoken.models import Token

class PostTests(APITestCase):
    
    def setUp(self):
        self.test_category = Category.objects.create(name='django')
        
        self.test_user = NewUser.objects.create_superuser(
            email="a@a.com",user_name='test_user1',first_name="mohamed", password='123456789')
        self.test_user.save()
        
        self.test_user_2 = NewUser.objects.create_superuser(
            email="b@b.com",user_name='test_user2',first_name="ahmed", password='123456789')
        self.test_user_2.save()
        
        
        url = reverse('token_obtain_pair')
        response  = self.client.post(url,{ "email":self.test_user.email,
                                            "password":'123456789'},format= "json")
        self.test_user_token = response.data["access"]
        
        self.client = APIClient()
        self.client.login(email=self.test_user.email,password='123456789')
        # self.test_user_token= Token.objects.create(user=self.test_user)
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.test_user_token)
        
        
        self.test_post = Post.objects.create(
            category_id=1, title='Post Title', excerpt='Post Excerpt', content='Post Content', slug='post-title',
            author_id=1, status='published')
        
        self.test_post_2 = Post.objects.create(
            category_id=1, title='Post Title 2', excerpt='Post Excerpt 2', content='Post Content 2', slug='post-title 2',
            author_id=2, status='published')
    
    def generate_photo_file(self):
        file = io.BytesIO()
        image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
        image.save(file, 'png')
        file.name = 'test.png'
        file.seek(0)
        return file

    def test_view_posts(self):
        print("test post list")
        url = reverse('blog_api:blogs-list')
        #url = reverse('blog_api:lists') # the app name and the view name
        response = self.client.get(url, format = 'json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.count(),2)


    def test_get_post(self):
        print("test post retrieve")
        url = reverse('blog_api:blogs-detail', kwargs={'pk': 1})
        response = self.client.get(url, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create(self):
        print("test post create")
        image = self.generate_photo_file()
        data = {"title" : "new" , "author" : 1 ,"excerpt" : "new" , "content" : "new",
                "status": "draft", "image" : image}
        url = reverse('blog_api:blogs-list')
        response = self.client.post(url, data, format = 'multipart')
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        
        self.client.credentials()
        response = self.client.post(url, data, format = 'multipart')
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)


    def test_update_post(self):
        
        print("test post update")
        # update the his post
        url = reverse('blog_api:blogs-detail', kwargs={'pk': 1})
        
        updated_data = {
                "title": "New ",
                "author": 1,
                "excerpt": "New ",
                "content": "New ",
                "status": "draft"
            }
        
        response = self.client.patch(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # update other user his post
        url = reverse('blog_api:blogs-detail', kwargs={'pk': 2})
        
        response = self.client.put(
            url, updated_data, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


    def test_delete_post(self):
            
        print("test post delete")
        # update the his post
        url = reverse('blog_api:blogs-detail', kwargs={'pk': 1})
        
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        # delete other user post
        url = reverse('blog_api:blogs-detail', kwargs={'pk': 2})
        
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
            
