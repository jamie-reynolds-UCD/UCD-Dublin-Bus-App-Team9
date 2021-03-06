# Generated by Django 3.2.4 on 2021-06-20 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_shape_dist_travelled_stoptimesstatic_shape_dist_traveled'),
    ]

    operations = [
        migrations.CreateModel(
            name='CalendarStatic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service_id', models.CharField(max_length=15)),
                ('monday', models.BooleanField()),
                ('tuesday', models.BooleanField()),
                ('wednesday', models.BooleanField()),
                ('thursday', models.BooleanField()),
                ('friday', models.BooleanField()),
                ('saturday', models.BooleanField()),
                ('sunday', models.BooleanField()),
                ('start_date', models.CharField(max_length=8)),
                ('end_date', models.CharField(max_length=8)),
            ],
        ),
    ]
