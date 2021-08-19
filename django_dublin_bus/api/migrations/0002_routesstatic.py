# Generated by Django 3.2.4 on 2021-06-18 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RoutesStatic',
            fields=[
                ('route_id', models.CharField(max_length=15, primary_key=True, serialize=False)),
                ('agency_id', models.CharField(max_length=10)),
                ('route_short_name', models.CharField(max_length=15)),
                ('route_long_name', models.CharField(max_length=50)),
                ('route_type', models.IntegerField()),
            ],
        ),
    ]
