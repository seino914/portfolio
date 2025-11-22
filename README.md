# Portfolio_v2.0

## ディレクトリ構造

```
/
├── .next/              # Next.jsのビルド出力
├── node_modules/       # 依存パッケージ
├── public/             # 静的ファイル（画像など）
├── src/                # ソースコード
│   ├── app/            # Next.js App Router
│   │   ├── content/    # メインコンテンツコンポーネント
│   │   ├── section/    # 各セクションのコンポーネント
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── skills/
│   │   ├── globals.css # グローバルスタイル
│   │   ├── layout.tsx  # ルートレイアウト
│   │   └── page.tsx    # メインページエントリ
│   ├── components/     # 共通コンポーネント
│   │   ├── 3d/         # Three.js関連 (Canvas, Objects)
│   │   ├── ui/         # shadcn/ui コンポーネント
│   │   └── ...
│   ├── lib/            # ユーティリティ関数
│   └── store/          # 状態管理 (スクロール制御など)
├── .eslintrc.json      # ESLint設定
├── components.json     # shadcn/ui設定
├── next.config.js      # Next.js設定
├── package.json        # プロジェクト設定と依存関係
├── tailwind.config.ts  # Tailwind CSS設定
└── tsconfig.json       # TypeScript設定
```

## 技術スタック

### Core
- **Framework**: Next.js 15.5.6 (App Router)
- **Library**: React 19.2.0
- **Language**: TypeScript 5.9.3

### Styling & UI
- **CSS**: Tailwind CSS 3.4.17
- **Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React 0.554.0
- **Theme**: next-themes 0.4.6 (Dark/Light mode)

### 3D & Animation
- **3D**: Three.js 0.181.2, @react-three/fiber 9.4.0, @react-three/drei 10.7.7
- **Animation**: Framer Motion 12.23.24

### Form & Validation
- **Form Management**: React Hook Form 7.66.1
- **Validation**: Zod 4.1.12
- **Backend Service**: Formspree 3.0.0

### Tools
- **Linter**: ESLint 9.39.1
- **Formatter**: Prettier 3.6.2

## 開発

### 開発サーバーの起動

```bash
npm run dev
```
http://localhost:3000
