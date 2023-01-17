from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from .models import NewUser, Profile
# Create your tests here.
class PostTests(APITestCase):
    
    def setUp(self):
        
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
        self.test_user_refresh = response.data["refresh"]
        
        self.client = APIClient()
        self.client.login(email=self.test_user.email,password='123456789')
        # self.test_user_token= Token.objects.create(user=self.test_user)
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.test_user_token)
        

    def test_authentication(self):
        print("test user authentication")
        # test valid authentication
        url = reverse('token_obtain_pair')
        response  = self.client.post(url,{ "email":self.test_user.email,
                                            "password":'123456789'},format= "json")
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        
        # test unvalid authentication
        url = reverse('token_obtain_pair')
        response  = self.client.post(url,{ "email":"abc",
                                            "password":'abc'},format= "json")
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)
        

    def test_refresh_token(self):
        print("test token refresh")
        url = reverse("token_refresh")
        response = self.client.post(url,{"refresh":self.test_user_refresh}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        

    def test_profile_creation(self):
        print("test user and profile creation")
        user_3 = NewUser.objects.create_user(
            email="c@c.com",user_name='test_user3',first_name="hamed", password='123456789')
        
        get_user3_profile = Profile.objects.filter(user_id= user_3.id)
        self.assertEqual(NewUser.objects.count(), Profile.objects.count())
        

    def test_profile_update(self):
        
        print("test user and profile update")
        url = reverse("users:profile-detail", kwargs={'username':self.test_user.user_name })
        
        updated_data = {
            "user":{
                "user_name": "new_name",
                "first_name": "new_first_name",
                "email": "wass@wass.com"
                },
            "about": "new about section",
            "adresse": "new adresse",
            "facebook_link":"facebook",
            "instagram_link":"instagram",
            "twitter_link":"twitter",
        }
        response = self.client.patch(url, updated_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        """url = reverse("users:profile-detail", kwargs={'username':self.test_user.user_name})
        updated_data = {
            "aboute": "new about section",
            "adresse": "new adresse"
        }
        response = self.client.patch(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)"""
        

    def test_change_password(self):
        
        print("test change password")
        url = reverse("users:change_password-detail", kwargs={'pk': 1})
        passwords = {
            "current_password":"123456789",
            "new_password": "1234",
            "confirm_new_password": "1234"
        }
        response = self.client.put(url, passwords, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # test password doesn't match
        passwords = {
            "current_password":"123456789",
            "new_password": "12",
            "confirm_new_password": "1234"
        }
        response = self.client.put(url, passwords, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # test current password is wrong
        passwords["current_password"] = "1234"
        response = self.client.put(url, passwords, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # test empty passwords
        passwords["current_password"] = "123456789"
        passwords["new_password"] = ""
        passwords["confirm_new_password"] = ""
        response = self.client.put(url, passwords, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        

    def test_following(self):
        
        print("test follow")
        
        self.test_user.profile.followers.add(self.test_user_2) # added a follower
        second_user_following_whom = self.test_user_2.following.all()
        qs = second_user_following_whom.filter(user=self.test_user) # from a user, check other user is being followed.
        first_user_following_no_one = self.test_user.following.all() # check new user has is not following anyone
        self.assertTrue(qs.exists())
        self.assertFalse(first_user_following_no_one.exists())
        
        
        url = reverse("users:profile-follow", kwargs={"username":self.test_user_2.user_name})
        data = {
            "action" : "follow"
        }
        response = self.client.post(url,data,format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = {
            "action" : "unfollow"
        }
        response = self.client.post(url,data,format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)