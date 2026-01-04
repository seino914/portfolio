// SNSリンクの定義（Navigationと構造化データで共通使用）
export const socialLinks = [
  {
    href: "https://x.com/tonosaki914",
    label: "X (Twitter)",
  },
  {
    href: "https://github.com/seino914",
    label: "GitHub",
  },
  {
    href: "https://qiita.com/tonosaki914",
    label: "Qiita",
  },
];

// 構造化データ用のsameAs配列を生成
export const getSameAsLinks = () => {
  return socialLinks.map((link) => link.href);
};

