"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 pt-20">
      <section className="mx-auto max-w-xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-6 text-3xl font-bold">404 Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            申し訳ありません。お探しのページは見つかりませんでした。
          </p>
          <Link href="/">
            <Button className="bg-purple-500 hover:bg-purple-600">
              ホームに戻る
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
