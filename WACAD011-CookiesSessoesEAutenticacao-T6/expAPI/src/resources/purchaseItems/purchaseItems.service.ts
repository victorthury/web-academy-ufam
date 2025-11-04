import { AddPurchaseItemDTO } from './purchaseItems.types';

export function addPurchaseItemToCart(
  cart: AddPurchaseItemDTO[] | undefined,
  purchaseItem: AddPurchaseItemDTO
): AddPurchaseItemDTO[] {
  if (!cart) {
    return [purchaseItem];
  }

  const existingItemIndex = cart.findIndex(
    (item) => item.productId === purchaseItem.productId
  );

  if (existingItemIndex != -1) {
    const updatedCart = [...cart];
    const existingItem = updatedCart[existingItemIndex];

    const updatedItem: AddPurchaseItemDTO = {
      productId: existingItem?.productId as string,
      quantity: (existingItem?.quantity as number) + purchaseItem.quantity
    };

    updatedCart[existingItemIndex] = updatedItem;
    return updatedCart;
  }

  return [...cart, purchaseItem];
}

export default { addPurchaseItemToCart };
