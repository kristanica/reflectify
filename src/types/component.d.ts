type Header = {
  title: string;
  description: string;
};

type Owner = {
  icon: string;
  ownerName: string;
  onwerDescription: string;
  quote: string;
};

type ShopItem = {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  type: "PASSIVE" | "CONSUMABLE";
  effect: string;
  value: number;
  quantity?: number;
};
