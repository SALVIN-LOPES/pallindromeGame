# Generated by Django 4.1.7 on 2023-03-06 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_game_string'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='result',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
