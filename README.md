# Portfolio_1.0

## ディレクトリ構造

```
/
├── .github/             　# Github Workflow
├── .next/              　 # Next.jsのビルド出力
├── node_modules/       　 # 依存パッケージ（基本いじらない）
├── public/             　 # 静的ファイル（画像など）
├── src/                　 # ソースコード
│   ├── app/            　 # Next.js App Router
│   │   ├── about/      　 # Aboutページ
│   │   ├── contact/    　 # Contactページ
│   │   ├── skills/     　 # Skillsページ
│   │   ├── globals.css 　 # グローバルスタイル
│   │   ├── layout.tsx  　 # レイアウトコンポーネント
│   │   ├── not-found.tsx　# 404ページ
│   │   ├── page.tsx    　 # メインページ
│   │   ├── robots.ts   　 # robots.txt生成
│   │   └── sitemap.ts  　 # sitemap.xml生成
│   ├── components/     　 # 共通コンポーネント
│   └── lib/            　 # ユーティリティ関数など
├── .env.example        　 # 環境変数のテンプレート
├── .env.local          　 # ローカル環境変数
├── .gitignore          　 # Git除外設定
├── biome.json          　 # Biome設定（lint・整形）
├── components.json     　 # コンポーネント設定
├── next-env.d.ts       　 # Next.js型定義
├── next.config.js      　 # Next.js設定
├── package-lock.json   　 # 依存関係のロックファイル
├── package.json        　 # プロジェクト設定と依存関係
├── postcss.config.js   　 # PostCSS設定
├── tsconfig.json       　 # TypeScript設定
└── README.md           　 # プロジェクトの説明書
```

## 技術スタック

- TypeScript
- Next.js（React）
- Tailwind CSS
- shadcn ui（UI コンポーネント）
- Formspree（フォーム管理）
- Zod（バリデーション）

## 開発

```
npm run dev
```

lint（Biome）:

```
npm run lint
```

整形（Biome。安全な修正も自動で適用する）:

```
npm run format
```
