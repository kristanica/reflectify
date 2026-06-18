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

type Effects =
  | "BONUS_DAMAGE"
  | "BONUS_CREDITS"
  | "SHIELD"
  | "DECRYPT_OPTIONS"
  | "SKIP_QUESTION"
  | "REVEAL_EXPLANATION";

type ShopItem = {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  type: "PASSIVE" | "CONSUMABLE";
  effect: Effects;
  value: number;
};
