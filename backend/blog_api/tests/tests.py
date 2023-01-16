from django.test import TestCase
from users.models import NewUser
from blog_api.models import Post,Category

# Create your tests here.
# here when we create the data it doesn't registered on the database it will be created virtually to do testing
class Test_Create_Post(TestCase):

    @classmethod
    def setUpTestData(cls):
        test_category = Category.objects.create(name='django')
        test_category.save()

        testuser1 = NewUser.objects.create_superuser(
            email="a@a.com",user_name='test_user1',first_name="mohamed", password='123456789')
        testuser1.save()

        test_post = Post.objects.create(
            category_id=1, title='Post Title', excerpt='Post Excerpt', content='Post Content', slug='post-title',
            author_id=1, status='published')
        test_post.save()

    def test_blog_content(self):
        post = Post.postobjects.get(id=1)
        cat = Category.objects.get(id=1)
        author = f'{post.author}'
        excerpt = f'{post.excerpt}'
        title = f'{post.title}'
        content = f'{post.content}'
        status = f'{post.status}'
        self.assertEqual(author, 'test_user1')# this function is for test that the data is the same inserted
        self.assertEqual(title, 'Post Title')
        self.assertEqual(content, 'Post Content')
        self.assertEqual(status, 'published')
        self.assertEqual(str(post), "Post Title")
        self.assertEqual(str(cat), "django")


