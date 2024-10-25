from django.db import models

# Create your models here.
class Tasks(models.Model):
    name = models.CharField(max_length = 100)
    description = models.TextField(default="")
    hours = models.IntegerField()
    duedate = models.DateField()
    completed = models.BooleanField(default=False)

    class Meta:
        db_table = 'tasks'

    def __str__(self):
        return self.name
