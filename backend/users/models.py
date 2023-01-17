from unittest.util import _MAX_LENGTH
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from PIL import Image



class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password, **other_fields)

    def create_user(self, email, user_name, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        other_fields.setdefault('is_active', True)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name']

    def __str__(self):
        return self.user_name
    

class FollowerRelation(models.Model):
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    profile = models.ForeignKey("Profile", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    
class Profile(models.Model):
    
    gender_options = (
        ('male','Male'),
        ('female','Female')
    )
    user = models.OneToOneField(NewUser, on_delete=models.CASCADE)
    about = models.TextField(blank=True, null=True)
    adresse = models.CharField(max_length=220, blank=True, null=True)
    mobile = models.IntegerField(blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    gender = models.CharField(
        max_length=10, choices=gender_options, default='male')
    avatar = models.ImageField(default="users_avatar/default.jpg",upload_to="users_avatar", blank=True, null=True)
    followers = models.ManyToManyField(NewUser, related_name='following', blank = True)
    
    instagram_link = models.CharField(max_length=220, blank=True, null=True)
    facebook_link = models.CharField(max_length=220, blank=True, null=True)
    twitter_link = models.CharField(max_length=220, blank=True, null=True)
    
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.user_name} Profile"
    
    def save(self, *args, **kwargs):
        super().save()

        img = Image.open(self.avatar.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.avatar.path)