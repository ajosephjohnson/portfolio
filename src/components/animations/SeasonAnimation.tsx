import { Sections } from "@/components";
import {
  FallingSnow,
  FallingLeaves,
  GrowingFlowers,
  LightRainfall,
  SummerSun,
  SummerMoon,
} from "@/components/animations";


export interface SeasonAnimationProps {
  contentHeight: number;
  contentWidth: number;
  isPageVisible: boolean;
  isDarkMode: boolean;
}

export default function SeasonalAnimation({
  section,
  props,
}: {
  section: Sections,
  props: SeasonAnimationProps,
}) {
  switch (section) {
    case Sections.Services:
      return <FallingLeaves { ...props } />;
    case Sections.Projects:
      return <FallingSnow { ...props } />;
    case Sections.Testimonials:
      return <>
        <LightRainfall { ...props } />
        <GrowingFlowers { ...props } />
      </>;
    case Sections.WorkWithMe:
      return props.isDarkMode
        ? <SummerMoon { ...props } />
        : <SummerSun { ...props } />;
    default:
      return null;
  }
}