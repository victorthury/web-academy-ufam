import { PrismaClient, User } from '@prisma/client';
import { AddPurchaseItemDTO } from '../purchaseItems/purchaseItems.types';

const prisma = new PrismaClient();

export async function createPurchase(
  userId: string | undefined,
  cart: AddPurchaseItemDTO[] | undefined
): Promise<boolean> {
  if (!userId) return false;
  if (!cart) return false;

  await prisma.purchase.create({
    data: {
      purchaseItem: {
        createMany: {
          data: cart
        }
      },
      userId
    }
  });
  return true;
}
