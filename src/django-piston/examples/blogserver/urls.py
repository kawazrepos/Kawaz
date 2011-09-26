from django.conf.urls.defaults import *
from django.contrib import admin
from django.conf import settings

admin.autodiscover()

urlpatterns = patterns('',
    (r'^', include('blogserver.blog.urls')),
    (r'^api/', include('blogserver.api.urls')),
    (r'^admin/(.*)', admin.site.root),
    
    (r'^accounts/login/$', 'django.contrib.auth.views.login'),
    (r'^accounts/logout/$', 'django.contrib.auth.views.logout'),
)
