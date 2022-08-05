from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=1)  #.PROTECT Is used for that when we deleting category
                                                        #the post doesn't delete
    title = models.CharField(max_length=250)
    excerpt = models.TextField(null=True)
    content = models.TextField()
    # slug is used to replace the id, it is an url to the post we gonna cover it later on course
    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blog_posts')
    status = models.CharField(
        max_length=10, choices=options, default='published')
    objects = models.Manager()  # default manager this will have no effect if he comes alone
    postobjects = PostObjects()  # custom manager is used to when we get the data we show only published data
    # and it's helpling us to won't filter the data that aren't published in the view. so the published objects
    # are on postobjects and postobjects is going to treated like object in orm
    # example Student.objects.count() , Student.postobjects.count()

    class Meta:
        ordering = ('-published',)# the - before published field is for DESC order

    def __str__(self):
        return self.title