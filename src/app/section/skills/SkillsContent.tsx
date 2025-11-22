"use client";

import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { motion } from "framer-motion";

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
    <section
      id="skills"
      className="pointer-events-none flex min-h-screen w-full snap-start snap-always items-center justify-end py-20 md:h-screen md:p-20"
    >
      <div className="pointer-events-auto w-full md:w-1/2">
        <div className="[&>article]:container-none h-auto overflow-y-visible [&>article]:pt-0 md:custom-scrollbar md:h-[80vh] md:overflow-y-auto">
          <article className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid gap-8">
                {Object.entries(categories).map(([category, title]) => (
                  <div key={category}>
                    <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      {skills
                        .filter((skill) => skill.category === category)
                        .map((skill) => (
                          <Card
                            key={skill.name}
                            className="border-purple-500/20 bg-card/50 p-6"
                          >
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
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
                              <div className="h-2 overflow-hidden rounded-full bg-muted">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.value}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className="h-full rounded-full bg-purple-500"
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
          </article>
        </div>
      </div>
    </section>
  );
}
