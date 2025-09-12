import { useMobileStore } from "@/store/mobile-store";
import { SegmentGroup } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  items: string[];
  getValue?: (value: string) => void;
  defaultValue?: string;
}

export const SegmentControl = ({ items, getValue, defaultValue }: Props) => {
  const [value, setValue] = useState<string | null>(defaultValue || items[0]);
  const { isMobile } = useMobileStore();

  return (
    <SegmentGroup.Root
      value={value}
      onValueChange={(e) => {
        setValue(e.value);
        if (getValue && e.value) getValue(e.value);
      }}
      size={isMobile ? "xs" : "md"}
    >
      <SegmentGroup.Indicator bgSize="cover" />
      <SegmentGroup.Items items={items} className="cursor-pointer capitalize" />
    </SegmentGroup.Root>
  );
};
