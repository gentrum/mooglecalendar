# Generated by Django 5.1.2 on 2024-10-23 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='date',
            new_name='dueDate',
        ),
        migrations.AddField(
            model_name='task',
            name='description',
            field=models.TextField(default=''),
        ),
    ]