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
  address: {
    road: dto.roadAddress,
    jihub: dto.jibunAddress,
    detail: dto.detailAddress,
  },
  details: dto.orderMenuInquiryResponses.map<OrderDetail>((detail) => ({
    id: detail.id,
    price: detail.menuPrice,
    menuName: detail.menuName,
    quantity: detail.menuQuantity,
    menuPrice: detail.menuPrice,
    optionGroups: detail.orderMenuOptionGroupInquiryResponses.map<OptionGroup>((group) => ({
      id: group.id,
      name: group.orderMenuOptionGroupName,
      options: group.orderMenuOptionInquiryResponses.map<Option>((option) => ({
        id: option.id,
        name: option.menuOptionName,
        price: option.menuOptionPrice,
      })),
    })),
  })),
})
