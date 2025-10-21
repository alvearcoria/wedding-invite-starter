
import type { SVGProps } from 'react';
import { Heart } from './Heart';
import { Flower } from './Flower';
import { ManSuit } from './ManSuit';
import { WomanDress } from './WomanDress';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Baby,
  Bell,
  Camera,
  Check,
  Church,
  Coffee,
  Copy,
  Download,
  ExternalLink,
  Frown,
  Gift,
  GlassWater,
  Hash,
  HeartHandshake,
  Image,
  Landmark,
  Link,
  LoaderCircle,
  MapPin,
  Menu,
  MessageSquare,
  Music,
  Music2,
  PartyPopper,
  PenSquare,
  Phone,
  Plus,
  Share2,
  Upload,
  UploadCloud,
  UserCheck,
  UserX,
  Users,
  Utensils,
  VolumeX,
  X,
} from 'lucide-react';

export const Icons = {
  heart: Heart,
  flower: Flower,
  mansuit: ManSuit,
  womandress: WomanDress,
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  baby: Baby,
  bell: Bell,
  camera: Camera,
  check: Check,
  church: Church,
  coffee: Coffee,
  copy: Copy,
  download: Download,
  'external-link': ExternalLink,
  frown: Frown,
  gift: Gift,
  'glass-water': GlassWater,
  hash: Hash,
  'heart-handshake': HeartHandshake,
  image: Image,
  landmark: Landmark,
  link: Link,
  'loader-circle': LoaderCircle,
  'map-pin': MapPin,
  menu: Menu,
  'message-square': MessageSquare,
  music: Music,
  'music-2': Music2,
  'party-popper': PartyPopper,
  'pen-square': PenSquare,
  phone: Phone,
  plus: Plus,
  'share-2': Share2,
  upload: Upload,
  'upload-cloud': UploadCloud,
  'user-check': UserCheck,
  'user-x': UserX,
  users: Users,
  utensils: Utensils,
  'volume-x': VolumeX,
  x: X,
};

export type IconName = keyof typeof Icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    return null; // o un icono por defecto
  }
  return <IconComponent {...props} />;
}
