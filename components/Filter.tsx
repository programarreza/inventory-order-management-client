import { Select, SelectItem } from "@heroui/select";

export default function Filter({
  value,
  onChange,
  className = "",
  statusOptions,
  label = "",
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  statusOptions: { key: string; label: string }[];
  label: string;
}) {
  return (
    <Select
      className={`max-w-xs ${className}`}
      label={label}
      selectedKeys={[value]}
      onChange={(e: any) => onChange(e.target.value)}
    >
      {statusOptions.map((status) => (
        <SelectItem key={status.key}>{status.label}</SelectItem>
      ))}
    </Select>
  );
}
