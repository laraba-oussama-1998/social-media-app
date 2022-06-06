from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase,APIClient
from blog_api.models import Post,Category
from django.contrib.auth.models import User

class PostTests(APITestCase):

    def test_view_posts(self):
        url = reverse('blog_api:listcreate') # the app name and the view name
        response = self.client.get(url, format = 'json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):
        self.test_category = Category.objects.create(name='django')

        self.test_user = User.objects.create_superuser(
            username='test_user1', password='123456789')
        self.client.login(username=self.test_user.username,
                          password='123456789')
        data = {"title" : "new" , "author" : 1 ,"excerpt" : "new" , "content" : "new"}
        url = reverse('blog_api:listcreate')
        response = self.client.post(url, data, format = 'json')
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)


    def test_update_post(self):

        client = APIClient()
        self.test_category = Category.objects.create(name='django')

        self.test_user_1 = User.objects.create_superuser(
            username='test_user1', password='123456789')

        self.test_user_2 = User.objects.create_superuser(
            username='test_user2', password='123456789')

        test_post = Post.objects.create(
            category_id=1, title='Post Title', excerpt='Post Excerpt', content='Post Content', slug='post-title',
            author_id=1, status='published')

        client.login(username=self.test_user_1.username,
                     password='123456789')
        url = reverse('blog_api:detailcreate', kwargs={'pk': 1})

        response = client.put(
            url, {
                "title": "New",
                "author": 1,
                "excerpt": "New",
                "content": "New",
                "status": "published"
            }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
