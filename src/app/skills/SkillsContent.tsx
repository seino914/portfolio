"use client";

import { Card } from "@/src/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/src/components/ui/badge";

const skills = [
  {
    name: "HTML / CSS",
    value: 90,
    category: "Frontend",
    description:
      "モダンなレスポンシブデザイン、アニメーション、Tailwind CSS、Panda CSSなど",
  },
  {
    name: "JavaScript",
    value: 90,
    category: "Frontend",
    description: "ES6+、非同期処理、DOM操作、WebAPIなど",
  },
  {
    name: "TypeScript",
    value: 60,
    category: "Frontend",
    description: "型安全性、インターフェース、ジェネリクスなど",
  },
  {
    name: "React",
    value: 70,
    category: "Frontend",
    description: "Hooks、状態管理、カスタムフック、パフォーマンス最適化など",
  },
  {
    name: "Next.js",
    value: 60,
    category: "Frontend",
    description: "SSR/SSG/ISR/CSR、App Router、APIルート、Server Actionsなど",
  },
  {
    name: "Node.js",
    value: 70,
    category: "Backend",
    description: "Express、REST API、非同期処理など",
  },
  {
    name: "Python",
    value: 50,
    category: "Backend",
    description: "データ処理、スクリプト自動化、スクレイピングなど",
  },
  {
    name: "FastAPI",
    value: 40,
    category: "Backend",
    description: "REST API、非同期処理、データベース連携、SQLAlchemyなど",
  },
  {
    name: "SQL",
    value: 50,
    category: "Backend",
    description:
      "PostgreSQL、MySQL、SQLite、Oracle、SQLAlchemy、Prisma、Drizzle ORMなど",
  },
  {
    name: "Git、GitHub",
    value: 70,
    category: "Tools",
    description: "バージョン管理、ブランチ戦略など",
  },
  {
    name: "Linux",
    value: 70,
    category: "Tools",
    description: "シェルスクリプト、サーバー管理、コマンド操作など",
  },
  {
    name: "VSCode（Cursor）",
    value: 90,
    category: "Tools",
    description: "コード補完、デバッグ、Git操作、ターミナル統合など",
  },
  {
    name: "Figma",
    value: 60,
    category: "Tools",
    description: "UI/UXデザイン、プロトタイプ作成、デザインシステムなど",
  },
  {
    name: "Notion",
    value: 80,
    category: "Tools",
    description: "プロジェクト管理、タスク管理、ドキュメント管理など",
  },
  {
    name: "Slack",
    value: 80,
    category: "Tools",
    description:
      "コミュニケーション、チームコラボレーション、チャンネル管理など",
  },
];

const categories = {
  Frontend: "フロントエンド技術",
  Backend: "バックエンド技術",
  Tools: "開発ツール",
};

export default function SkillsContent() {
  return (
    <main className="container mx-auto px-4 pt-20">
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-12">Skills</h1>
          <div className="grid gap-8">
            {Object.entries(categories).map(([category, title]) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold mb-6">{title}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <Card
                        key={skill.name}
                        className="p-6 bg-card/50 border-purple-500/20"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">
                              {skill.name}
                            </h3>
                            <Badge
                              variant="secondary"
                              className="bg-purple-500/10 text-purple-500"
                            >
                              {skill.value}%
                            </Badge>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.value}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-purple-500 rounded-full"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {skill.description}
                          </p>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
