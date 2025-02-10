import userHandlers from "./uset"
import orderHandlers from "./order"
import reviewHandlers from "./review"
export const handlers = [...userHandlers, ...orderHandlers, ...reviewHandlers]
