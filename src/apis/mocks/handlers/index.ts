import userHandlers from "./user"
import orderHandlers from "./order"
import reviewHandlers from "./review"
export const handlers = [...userHandlers, ...orderHandlers, ...reviewHandlers]
