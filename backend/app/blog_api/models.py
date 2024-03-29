from django.db import models
from django.db.models import Q
from users.models import NewUser
from django.utils import timezone
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class PostQuerySet(models.QuerySet):
    def search(self, query=None):
        if query is None or query == "":
            return self.none()
        lookups = Q(title__icontains=query) | Q(content__icontains=query)
        return self.filter(lookups) 
    
class PostManager(models.Manager):
    
    def get_queryset(self):
        return PostQuerySet(self.model, using=self._db)

    def search(self, query=None):
        return self.get_queryset().search(query=query)
    
    def categorized(self, query=None):
        return self.get_queryset().filter(category__name=query, status='published')
    
    def published(self, query=None):
        return self.get_queryset().filter(status='published')
    
    
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
        NewUser, on_delete=models.CASCADE, related_name='user_posts')
    status = models.CharField(
        max_length=10, choices=options, default='published')
    image = models.ImageField(upload_to="blogs_image", blank=True, null=True)
    likes = models.ManyToManyField(NewUser, related_name='liked_posts', blank=True)
    
    objects = PostManager()  # default manager this will have no effect if he comes alone
    postobjects = PostObjects()  # custom manager is used to when we get the data we show only published data
    # and it's helpling us to won't filter the data that aren't published in the view. so the published objects
    # are on postobjects and postobjects is going to treated like object in orm
    # example Student.objects.count() , Student.postobjects.count()

    class Meta:
        ordering = ('-published',)# the - before published field is for DESC order

    def __str__(self):
        return self.title
    

class LikesRelation(models.Model):
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    pass


class CommentRealtion(models.Model):
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE, blank=True, null=True)
    post = models.ForeignKey('Post', on_delete=models.CASCADE, blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    updated = models.DateTimeField(auto_now=True, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.body[0:50]
    