"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code2, Cpu, Globe, Rocket, Lightbulb, Mail, MapPin, Briefcase, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 pt-20">
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>
          <Card className="bg-card/50 border-purple-500/20">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Code2 className="h-8 w-8 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">外崎 誠之介</h2>
                    <p className="text-lg text-muted-foreground">Tonosaki Seinosuke</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">年齢</p>
                      <p className="font-medium">24歳</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">所在地</p>
                      <p className="font-medium">千葉県</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">職業</p>
                      <p className="font-medium">Webエンジニア</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">tonosaki914@icloud.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">専門分野</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card/50 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Globe className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">フロントエンド開発</h3>
                  <p className="text-muted-foreground">
                    React、Next.js、TypeScriptを使用した最新のWeb開発技術でユーザー体験を向上
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Cpu className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">バックエンド開発</h3>
                  <p className="text-muted-foreground">
                    Node.js、TypeScript、Python、FastAPIを用いた堅牢なサーバーサイド開発
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Rocket className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">高性能Web開発</h3>
                  <p className="text-muted-foreground">
                    最適化された高速なWebアプリケーションの開発とパフォーマンスチューニング
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Lightbulb className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">ソリューション設計</h3>
                  <p className="text-muted-foreground">
                    要件定義から設計、実装まで、最適なデザインパターンを用いた開発支援
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>
    </main>
  )
}