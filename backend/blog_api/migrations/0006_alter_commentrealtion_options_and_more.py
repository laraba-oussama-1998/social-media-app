# Generated by Django 4.0.5 on 2023-02-09 01:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('blog_api', '0005_alter_post_likes'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='commentrealtion',
            options={'ordering': ['-updated', '-created']},
        ),
        migrations.AddField(
            model_name='commentrealtion',
            name='comment',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='commentrealtion',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='commentrealtion',
            name='post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='blog_api.post'),
        ),
        migrations.AddField(
            model_name='commentrealtion',
            name='updated',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AddField(
            model_name='commentrealtion',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]