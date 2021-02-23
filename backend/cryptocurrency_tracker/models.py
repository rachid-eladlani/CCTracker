import serial as serial
from django.db import models

# Create your models here.
from django.contrib.auth.models import User


class Alert(models.Model):
    id = models.AutoField(primary_key=True),
    cryptocurrency = models.CharField(max_length=100)
    amount = models.CharField(max_length=100)
    mode = models.CharField(max_length=6)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    def __str__(self):
        return "cc: " + self.cryptocurrency + " amount: "+self.amount