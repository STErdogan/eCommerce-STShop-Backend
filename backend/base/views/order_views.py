from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer

from rest_framework import status


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data["orderItems"]

    if orderItems and len(orderItems) == 0:
        return Response(
            {"detail": "Ürün Siparişi yok"}, status=status.HTTP_400_BAD_REQUEST
        )

    else:
        # (1) Sipariş Oluştur
        order = Order.objects.create(
            user=user,
            paymentMethod=data["paymentMethod"],
            taxPrice=data["taxPrice"],
            shippingPrice=data["shippingPrice"],
            totalPrice=data["totalPrice"],
        )

        # (2) Sipariş Adresi oluştur
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            postalCode=data["shippingAddress"]["postalCode"],
            country=data["shippingAddress"]["country"],
        )

        # (3) Sipariş edilen ürün ve sipariş arasındaki bağlantıyı kur
        for i in orderItems:
            product = Product.objects.get(_id=i["product"])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i["qty"],
                price=i["price"],
                image=product.image.url,
            )
            # (4) Sipariş edilen ürünü stok dan düş
            product.countInStock -= item.qty
            product.save()

        serialazer = OrderSerializer(order, many=False)
        return Response(serialazer.data)
