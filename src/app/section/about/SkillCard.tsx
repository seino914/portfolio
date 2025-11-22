import { Card, CardContent } from "@/src/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function SkillCard({ icon: Icon, title, description }: SkillCardProps) {
  return (
    <Card className="border-purple-500/20 bg-card/50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <Icon className="mb-4 h-12 w-12 text-purple-500" />
          <h3 className="mb-2 text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
