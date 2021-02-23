from celery import shared_task
from Tracker_API import settings
import requests
from django.core.mail import send_mail
from celery.schedules import crontab
from .models import Alert
from celery.decorators import periodic_task

@shared_task
def get_crypto_data():
    print('Crawling data and creating objects in database ..')
    payloads = requests.get('https://rest.coinapi.io/v1/assets', headers={'X-CoinAPI-Key': settings.X_COINAPI_KEY}).json()
    alerts = Alert.objects.all()
    for item in alerts:
        for payload in payloads:
            if payload["type_is_crypto"] == 1 and payload["asset_id"] == item.cryptocurrency and (float(item.amount) > payload["price_usd"] and item.mode =="under" or float(item.amount) < payload["price_usd"] and item.mode =="above"):
                subject = "ALERT " + item.cryptocurrency + " price has "+'dropped' if item.mode == 'under' else 'increased'+ ", ACT FAST"
                message = "Dear " + item.user.username + "\n" + item.cryptocurrency + " prices are now " + item.amount + ". Better buy quick.\nRegards,\n"
                to = item.user.email
                send_mail(subject, message, settings.EMAIL_HOST_USER, [to])
                item.delete()


@periodic_task(run_every=crontab(minute='*/1'))
def get_crypto_current():
    get_crypto_data.delay()
