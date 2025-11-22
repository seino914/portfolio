import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function SkillCard({ icon: Icon, title, description }: SkillCardProps) {
  return (
    <Card className="bg-card/50 border-purple-500/20">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <Icon className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
