import { AddPurchaseItemDTO } from '../resources/purchaseItems/purchaseItems.types';

export declare module 'express-session' {
  interface SessionData {
    uid: string;
    userTypeId: string;
    cart: AddPurchaseItemDTO[];
  }
}
