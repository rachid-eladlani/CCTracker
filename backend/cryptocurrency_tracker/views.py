import requests
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.utils import json

from django.conf import settings
from .models import Alert
from django.contrib.auth.models import User
from rest_framework import status
from django.core.serializers import serialize


@api_view(["GET"])
@csrf_exempt
# @login_required(login_url='/accounts/login/')
def get_all_CC(request):
    alerts = requests.get('https://rest.coinapi.io/v1/assets', headers={'X-CoinAPI-Key': settings.X_COINAPI_KEY}).json()
    print(alerts)
    return JsonResponse({'cc': alerts}, safe=False, status=status.HTTP_200_OK)

@api_view(["GET"])
@csrf_exempt
# @login_required(login_url='/accounts/login/')
def get_alerts(request,userid):
    alerts = Alert.objects.filter(user=userid)
    serializer = serialize("json",alerts)
    return JsonResponse({'alerts': serializer}, safe=False, status=status.HTTP_200_OK)

@api_view(["POST"])
@csrf_exempt
# @login_required(login_url='/accounts/login/')
def add_alert(request,userid):
    payload = json.loads(request.body)
    try:
        Alert.objects.create(
            cryptocurrency=payload["cryptocurrency"],
            amount=payload["amount"],
            mode= payload["mode"],
            user=User.objects.get(id=userid)
        )
        return Response(status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False,
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["PUT"])
@csrf_exempt
# @login_required(login_url='/accounts/login/')
def update_alert(request, alertid):
    payload = json.loads(request.body)
    try:
        alert = Alert.objects.filter(id=alertid)
        alert.update(
            cryptocurrency=payload["cryptocurrency"],
            amount=payload["amount"],
            mode=payload["mode"]
        )
        return Response(status=status.HTTP_200_OK)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False,
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["DELETE"])
@csrf_exempt
# @login_required(login_url='/accounts/login/')
def delete_alert(request,alertid):
    try:
        alert = Alert.objects.get(id=alertid)
        alert.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Something went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
