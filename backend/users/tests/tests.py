from django.test import TestCase
from rest_framework import status
from users.models import Profile, NewUser
from rest_framework.test import APIClient

class UserApiAuthTest(TestCase):
    
    def setUp(self):
        self.u1 = NewUser.objects.create_user(
            email="a@a.com",user_name='test_user1',first_name="mohamed", password='123456789')
        self.client = APIClient()
        
    def test_login_failed(self):
        
        resp = self.client.post("/api/token",  {'email':'user@foo.com', 'password':'pass'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        
        pass
    pass