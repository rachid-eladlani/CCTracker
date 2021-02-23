from django.conf.urls import url
from cryptocurrency_tracker import views

urlpatterns=[
    url('getallCC/', views.get_all_CC),
    url(r'getalerts/(?P<userid>\d+)$', views.get_alerts),
    url(r'addalert/(?P<userid>\d+)$', views.add_alert),
    url(r'^updatealert/(?P<alertid>\d+)$', views.update_alert),
    url(r'^deletealert/(?P<alertid>\d+)$', views.delete_alert)
]