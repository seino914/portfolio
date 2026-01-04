import { LucideIcon } from "lucide-react";

interface ProfileItemProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}

export function ProfileItem({ icon: Icon, label, value }: ProfileItemProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-purple-500" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
