from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile, NewUser
from django.urls import reverse
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django_rest_passwordreset.signals import reset_password_token_created

@receiver(post_save, sender=NewUser)
def create_user_profile(sender, instance, created, *args, **kwargs):
    #print("signals work fine here")
    if created:
        Profile.objects.get_or_create(user=instance)
        
@receiver(post_save, sender=NewUser)
def save_user_profile(sender, instance, **kwargs):
    #print("signals work fine here")
    instance.profile.save()
    


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    

    
    """email_plaintext_message = "{}?token={}".format(
            instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
            reset_password_token.key)"""
    
    email_plaintext_message = "http://localhost:3000/reset-password/{}".format(
            reset_password_token.key)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
    
    msg.send()
