"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skills = [
  { name: "HTML/CSS", value: 90, category: "Frontend", description: "モダンなレスポンシブデザイン、アニメーション、Sass/SCSS" },
  { name: "JavaScript", value: 90, category: "Frontend", description: "ES6+、非同期処理、DOM操作、WebAPI" },
  { name: "TypeScript", value: 60, category: "Frontend", description: "型安全性、インターフェース、ジェネリクス" },
  { name: "React", value: 70, category: "Frontend", description: "Hooks、状態管理、カスタムフック、パフォーマンス最適化" },
  { name: "Next.js", value: 60, category: "Frontend", description: "SSR/SSG、APIルート、最適化" },
  { name: "Node.js", value: 70, category: "Backend", description: "Express、REST API、非同期処理" },
  { name: "Python", value: 50, category: "Backend", description: "データ処理、スクリプト自動化" },
  { name: "FastAPI", value: 40, category: "Backend", description: "REST API、非同期処理" },
  { name: "SQL", value: 50, category: "Backend", description: "クエリ最適化、データモデリング" },
  { name: "Git", value: 70, category: "Tools", description: "バージョン管理、ブランチ戦略" },
  { name: "Linux", value: 70, category: "Tools", description: "シェルスクリプト、サーバー管理" }
]

const categories = {
  Frontend: "フロントエンド技術",
  Backend: "バックエンド技術",
  Tools: "開発ツール"
}

export default function SkillsPage() {
  return (
    <main className="container mx-auto px-4 pt-20">
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-12">Technical Skills</h1>
          <div className="grid gap-8">
            {Object.entries(categories).map(([category, title]) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold mb-6">{title}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <Card key={skill.name} className="p-6 bg-card/50 border-purple-500/20">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">{skill.name}</h3>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">
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
  )
}