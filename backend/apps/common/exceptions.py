"""
Кастомная обработка исключений для единого формата ошибок API
"""
from rest_framework.views import exception_handler
from rest_framework.exceptions import APIException
from rest_framework import status


def custom_exception_handler(exc, context):
    """
    Кастомный обработчик исключений для единого формата ошибок
    
    Формат ответа:
    {
        "error": {
            "code": "error_code",
            "message": "Человекочитаемое сообщение",
            "details": {...}  # опционально
        }
    }
    """
    # Получаем стандартный ответ DRF
    response = exception_handler(exc, context)
    
    if response is not None:
        # Формируем единый формат ошибки
        error_data = {
            'error': {
                'code': get_error_code(exc),
                'message': get_error_message(exc, response.data),
                'details': get_error_details(response.data)
            }
        }
        response.data = error_data
    
    return response


def get_error_code(exc):
    """Определяет код ошибки"""
    if hasattr(exc, 'default_code'):
        return exc.default_code
    return 'error'


def get_error_message(exc, data):
    """Извлекает основное сообщение об ошибке"""
    if hasattr(exc, 'detail'):
        if isinstance(exc.detail, str):
            return exc.detail
        elif isinstance(exc.detail, dict):
            # Возвращаем первое сообщение из словаря
            for key, value in exc.detail.items():
                if isinstance(value, list):
                    return f"{key}: {value[0]}"
                return f"{key}: {value}"
    
    if isinstance(data, dict):
        if 'detail' in data:
            return data['detail']
        # Берём первое значение из словаря
        for key, value in data.items():
            if isinstance(value, list) and len(value) > 0:
                return str(value[0])
            return str(value)
    
    if isinstance(data, list) and len(data) > 0:
        return str(data[0])
    
    return 'Произошла ошибка'


def get_error_details(data):
    """Извлекает детальную информацию об ошибке"""
    if isinstance(data, dict) and len(data) > 1:
        # Возвращаем все поля кроме 'detail'
        details = {k: v for k, v in data.items() if k != 'detail'}
        return details if details else None
    return None


# Кастомные исключения для бизнес-логики

class BusinessLogicError(APIException):
    """Базовая ошибка бизнес-логики"""
    status_code = status.HTTP_400_BAD_REQUEST
    default_code = 'business_logic_error'
    default_detail = 'Нарушение бизнес-правил'


class InvalidTransitionError(BusinessLogicError):
    """Недопустимый переход статуса"""
    default_code = 'invalid_transition'
    default_detail = 'Недопустимый переход статуса'


class InsufficientFundsError(BusinessLogicError):
    """Недостаточно средств"""
    default_code = 'insufficient_funds'
    default_detail = 'Недостаточно средств для выполнения операции'


class PaymentError(BusinessLogicError):
    """Ошибка при проведении платежа"""
    default_code = 'payment_error'
    default_detail = 'Ошибка при проведении платежа'


class DealNotActiveError(BusinessLogicError):
    """Сделка не активна"""
    default_code = 'deal_not_active'
    default_detail = 'Сделка не находится в активном статусе'


class NotDealParticipantError(APIException):
    """Пользователь не является участником сделки"""
    status_code = status.HTTP_403_FORBIDDEN
    default_code = 'not_deal_participant'
    default_detail = 'Вы не являетесь участником этой сделки'


class DisputeAlreadyExistsError(BusinessLogicError):
    """Спор уже существует"""
    default_code = 'dispute_already_exists'
    default_detail = 'Спор по этой сделке уже открыт'
