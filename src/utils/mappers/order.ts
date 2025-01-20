// utils/mappers/orderMapper.ts
import { OrderDto } from "@/types/dtos"
import { Order, OrderDetail, OptionGroup, Option } from "@/types/models"

export const mapOrderDtoToModel = (dto: OrderDto): Order => ({
  id: dto.orderId,
  name: dto.orderName,
  status: dto.orderStatus,
  type: dto.orderType,
  time: dto.orderTime,
  totalPrice: dto.totalPrice,
  totalItems: dto.totalMenuCount,
  details: dto.orderDetail.map<OrderDetail>((detail) => ({
    id: detail.id,
    orderId: detail.orderId,
    price: detail.price,
    menuName: detail.menuName,
    quantity: detail.menuQuantity,
    menuPrice: detail.menuPrice,
    optionGroups: detail.menuOptionGroups.map<OptionGroup>((group) => ({
      id: group.id,
      detailId: group.orderDetailId,
      name: group.menuOptionGroupNm,
      options: group.menuOption.map<Option>((option) => ({
        id: option.id,
        groupId: option.menuOptionGroupId,
        name: option.menuOptionName,
        price: option.menuOptionPrice,
      })),
    })),
  })),
})
