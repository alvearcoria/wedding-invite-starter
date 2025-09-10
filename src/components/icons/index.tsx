
import type { SVGProps } from 'react';
import { Heart } from './Heart';
import { Flower } from './Flower';
import { ManSuit } from './ManSuit';
import { WomanDress } from './WomanDress';

export const Icons = {
  heart: Heart,
  flower: Flower,
  mansuit: ManSuit,
  womandress: WomanDress,
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
