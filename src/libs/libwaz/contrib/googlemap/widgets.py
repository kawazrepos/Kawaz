# -*- coding: utf-8 -*-
#
# Created:    2010/09/06
# Author:         alisue
#
from django.conf import settings
from django.forms import widgets
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe

class HiddenGoogleMapWidget(widgets.MultiWidget):
    u"""
    A widgets that splits string input into for hidden input.
    """
    is_hidden = True
    class Media:
        css = {}
        js = [
            settings.GOOGLEMAP_API_URL % {'sensor': 'true' if settings.GOOGLEMAP_API_SENSOR else 'false'},
            settings.GOOGLEMAP_SCRIPT_URL
        ]
    def __init__(self, attrs=None, query_field_id=''):
        widget = (
            widgets.HiddenInput(attrs=attrs),
            widgets.HiddenInput(attrs=attrs),
            widgets.HiddenInput(attrs=attrs),
        )
        self.query_field_id = query_field_id
        super(HiddenGoogleMapWidget, self).__init__(widget, attrs)
    
    def decompress(self, value):
        if not value:
            return [u'', u'', u'']
        return (value.latitude, value.longitude, value.zoom)
    

class GoogleMapWidget(HiddenGoogleMapWidget):
    u"""
    A widgets that splits string input into GoogleMap.
    """
    is_hidden = False

    def render(self, name, value, attrs=None):
        body = super(GoogleMapWidget, self).render(name, value, attrs)
        # value is a list of values, each corresponding to a widget
        # in self.widgets.
        if not isinstance(value, list):
            value = self.decompress(value)
        body += render_to_string(r"googlemap/googlemap.html", {
            'class_name': settings.GOOGLEMAP_CLASS_NAME,
            'query_id':     self.query_field_id,
            'latitude':     value[0] if value[0] else settings.GOOGLEMAP_DEFAULT_LATITUDE,
            'longitude':    value[1] if value[1] else settings.GOOGLEMAP_DEFAULT_LONGITUDE,
            'zoom':         value[2] if value[2] else settings.GOOGLEMAP_DEFAULT_ZOOM,
            'latitude_id':  u"id_%s_0" % name,
            'longitude_id': u"id_%s_1" % name,
            'zoom_id':      u"id_%s_2" % name,
            'hidden':       '' if value[0] and value[1] and value[2] else 'hidden',
            'editable':     'editable'
        })
        
        return mark_safe(body)