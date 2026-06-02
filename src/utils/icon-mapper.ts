import {
  BookIcon,
  BriefcaseIcon,
  BusIcon,
  CarIcon,
  CircleIcon,
  CoffeeIcon,
  DropletIcon,
  FilmIcon,
  GiftIcon,
  GraduationCapIcon,
  HeartIcon,
  HomeIcon,
  LaptopIcon,
  MusicIcon,
  PiggyBankIcon,
  PlaneIcon,
  ShoppingCartIcon,
  SmartphoneIcon,
  SmileIcon,
  TrainIcon,
  TrendingUpIcon,
  TvIcon,
  UtensilsIcon,
  WalletIcon,
  WifiIcon,
  ZapIcon
} from 'lucide-react'

export const ICON_MAP = {
  'shopping-cart': ShoppingCartIcon,
  briefcase: BriefcaseIcon,
  utensils: UtensilsIcon,
  car: CarIcon,
  home: HomeIcon,
  'graduation-cap': GraduationCapIcon,
  heart: HeartIcon,
  wifi: WifiIcon,
  zap: ZapIcon,
  droplet: DropletIcon,
  smartphone: SmartphoneIcon,
  tv: TvIcon,
  film: FilmIcon,
  music: MusicIcon,
  book: BookIcon,
  gift: GiftIcon,
  plane: PlaneIcon,
  train: TrainIcon,
  bus: BusIcon,
  coffee: CoffeeIcon,
  circle: CircleIcon,
  laptop: LaptopIcon,
  'trending-up': TrendingUpIcon,
  smile: SmileIcon,
  wallet: WalletIcon,
  'piggy-bank': PiggyBankIcon
} as const

export type IconName = keyof typeof ICON_MAP

export function getIconByName(name: string) {
  return ICON_MAP[name as IconName] || CircleIcon
}
