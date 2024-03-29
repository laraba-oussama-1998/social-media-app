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
            category_id=self.test_category.pk, title='Post Title', excerpt='Post Excerpt', content='Post Content', slug='post-title',
            author_id=self.test_user.pk, status='published')
        
        self.test_post_2 = Post.objects.create(
            category_id=self.test_category.pk, title='Post Title', excerpt='Post Excerpt', content='Post Content', slug='post-title',
            author_id=self.test_user.pk, status='draft')
        
        self.test_post_3 = Post.objects.create(
            category_id=self.test_category.pk, title='Post Title 2', excerpt='Post Excerpt 2', content='Post Content 2', slug='post-title 2',
            author_id=self.test_user_2.pk, status='published')
    
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
        self.assertEqual(Post.objects.count(),3)
        # ensure the post view return only the published
        self.assertEqual(Post.objects.published().count(),len(response.data))
        
        print("test post list worked")


    def test_get_post(self):
        print("test post retrieve")
        
        url = reverse('blog_api:blogs-detail', kwargs={'pk': self.test_post.pk})
        
        response = self.client.get(url, format='json')
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create(self):
        print("test post create")
        image = self.generate_photo_file()
        data = {"title" : "new" , "author" : self.test_user.pk ,"excerpt" : "new" , "content" : "new",
                "status": "draft", "image" : image, "category": self.test_category.pk}
        url = reverse('blog_api:blogs-list')
        response = self.client.post(url, data, format = 'multipart')
        
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        
        self.client.credentials()
        response = self.client.post(url, data, format = 'multipart')
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)


    def test_update_post(self):
        
        print("test post update", self.test_post.pk, self.test_post.id)
        # update the his post
        url = reverse('blog_api:blogs-detail', kwargs={'pk': self.test_post.pk})
        
        updated_data = {
                "title": "New ",
                "author": self.test_user.pk,
                "excerpt": "New ",
                "content": "New ",
                "status": "draft",
                "category": self.test_category.pk
            }
        
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # update other user his post
        url = reverse('blog_api:blogs-detail', kwargs={'pk': self.test_post_3.pk})
        
        response = self.client.put(
            url, updated_data, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


    def test_delete_post(self):
            
        print("test post delete")
        # update the his post
        url = reverse('blog_api:blogs-detail', kwargs={'pk': self.test_post_2.pk})
        
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        # delete other user post
        url = reverse('blog_api:blogs-detail', kwargs={'pk': self.test_post_3.pk})
        
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
            

    def test_get_user_post(self):
        print("test get user posts")
        url = reverse('blog_api:blogs-userposts', kwargs={'pk': "aaaa"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
        
        url = reverse('blog_api:blogs-userposts', kwargs={'pk': "test_user1"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # ensure we get he published and draft posts
        self.assertEqual(len(response.data),2)
        
        
    def test_like_post(self):
        print("test user likes posts")
        self.test_post_3.likes.add(self.test_user)
        posts_liked_by_user_1 = self.test_user.liked_posts.all()
        
        qs = posts_liked_by_user_1.filter(id= self.test_post_3.id)
        seconde_post_has_no_likes = self.test_post_2.likes.all()
        self.assertTrue(qs.exists())
        self.assertFalse(seconde_post_has_no_likes.exists())
        
        url = reverse('blog_api:like', kwargs={'post_id':self.test_post_2.pk})
        data={ 
                "action": "like"
            }
        response = self.client.post(url,data,format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        posts_liked_by_user_1 = self.test_user.liked_posts.all()
        self.assertEqual(posts_liked_by_user_1.count(), 2)
        
        url = reverse('blog_api:like', kwargs={'post_id':self.test_post_2.pk})
        data={ 
                "action": "unlike"
            }
        response = self.client.post(url,data,format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        