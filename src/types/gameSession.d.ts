type ToastType = "error" | "itemused" | "system";
type ToastItem = { id: string; type: ToastType; message: string };

type Purchase = {
  cost: number;
  itemKey: string;
  purchaseAt: string;
};
