from django.conf.urls import url
from accounts import views

urlpatterns=[
    url('getusers', views.get_users),
    url('adduser', views.add_user),
    url(r'^updateuser/(?P<userid>\d+)$', views.update_user),
    url(r'^deleteuser/(?P<userid>\d+)$', views.delete_user),
    url('login', views.login_user),
    url('register', views.add_user),
    url('logout', views.login_user)
]