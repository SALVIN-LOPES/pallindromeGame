from django.db import models
from django.contrib.auth.models import User


class Game(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    # to check if this string is pallindromeor not
    string = models.CharField(max_length=10,blank=True,null=True)
    result = models.BooleanField(default=False,null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # return game_id
        return str(self.id)