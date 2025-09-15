import { useMobileStore } from "@/store/mobile-store";
import { SegmentGroup } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  items: string[];
  getValue?: (value: string) => void;
  defaultValue?: string;
  size?: "sm" | "md" | "lg" | "xs";
  className?: string;
  id?: string;
  orientation?: "horizontal" | "vertical";
}

export const SegmentControl = ({
  items,
  getValue,
  defaultValue,
  size,
  className,
  id,
  orientation,
}: Props) => {
  const [value, setValue] = useState<string | null>(defaultValue || items[0]);
  const { isMobile } = useMobileStore();

  return (
    <SegmentGroup.Root
      id={id}
      value={value}
      onValueChange={(e) => {
        setValue(e.value);
        if (getValue && e.value) getValue(e.value);
      }}
      size={isMobile ? "sm" : size}
      className={className}
      orientation={orientation || "horizontal"}
    >
      <SegmentGroup.Indicator bgSize="cover" />
      <SegmentGroup.Items items={items} className="cursor-pointer capitalize" />
    </SegmentGroup.Root>
  );
};
