from django.db import models
from django.contrib.auth.models import User
from zinnia.models.category import Category

# Create your models here.
class venturerDetail(models.Model):
	venturer = models.ForeignKey(User, on_delete=models.CASCADE)
	alias = models.CharField(max_length=50, null=True)
	shortBio = models.CharField(max_length=140, null=True)
	def __str__(self):
		if self.alias is None:
			return "a venturer's detail"
		if self.shortBio is None:
			return self.alias + "'s detail"

		return self.alias + ": " + self.shortBio

class vBlogCategory(models.Model):
	venturer = models.ForeignKey(User, on_delete=models.CASCADE)
	title = models.ForeignKey(Category, on_delete=models.CASCADE)
	image = models.CharField(max_length=255, null=True)
	personalDesc = models.TextField(blank=True)
	def __str__(self):
		return str(self.title) + " under " + str(self.venturer)
