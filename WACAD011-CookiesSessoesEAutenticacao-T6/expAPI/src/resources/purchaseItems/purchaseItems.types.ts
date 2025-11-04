import { PurchaseItem } from '@prisma/client';

export type AddPurchaseItemDTO = Pick<PurchaseItem, 'productId' | 'quantity'>;
