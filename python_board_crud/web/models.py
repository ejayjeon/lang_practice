from django.db import models
from datetime import datetime

class Board(models.Model):
    # Auto Increment
    idx = models.AutoField(primary_key=True)
    userId = models.CharField(null=False, max_length=50)
    userEmail = models.CharField(null=False, max_length=100)
    userPwd = models.CharField(null=False, max_length=50)
    content = models.TextField(null=False)
    createDate = models.DateTimeField(default=datetime.now, blank=True)