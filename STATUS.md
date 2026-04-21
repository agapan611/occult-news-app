# STATUS（現状スナップショット）

> このプロジェクトはスナップショット管理とタスク管理を分離しているため、進捗管理には使用しない。
> 進捗（未対応タスク・作業ログ）は `BACKLOG.md` で管理している。
>
> このファイルは **今このサイトがどうなっているか** を俯瞰する資料。
> 更新: 2026-04-19

---

## 1. サイト概要

- **名称**: OCCULT WIRE
- **URL**: https://occult.ainiwa.jp
- **コンセプト**: オカルト・都市伝説の最新ニュースまとめ + AIキャラ考察（シュナ&ライカ）
- **運営**: AiNiwa（個人運営）
- **公開用連絡先**: shunaraika@gmail.com
- **SNS**: X [@occult_wire](https://x.com/occult_wire)

## 2. 技術スタック

- **フレームワーク**: Next.js 16.2.4（App Router）
- **UI**: React 19.2.4 + Tailwind CSS v4
- **言語**: TypeScript 5
- **デプロイ**: Vercel
- **PWA**: manifest.json + icons あり（インストール可）
- **DB/API**: なし（静的JSONファイル駆動）

## 3. ドメイン・インフラ

| 項目 | 設定 |
|---|---|
| Production Domain | `occult.ainiwa.jp`（2026-04-19 登録済み） |
| 自動デプロイ | `git push origin master` → Vercel ビルド → alias 自動張り替え |
| 親ドメイン | `ainiwa.jp`（別プロジェクト `ainiwa-portal` 管理） |
| GitHub | `agapan611/occult-news-app` |

## 4. ページ構成

| URL | 役割 | ファイル |
|---|---|---|
| `/` | トップ（ニュース一覧＋最新GRIMOIRE横スクロール） | `src/app/page.tsx` |
| `/grimoire` | GRIMOIRE記事一覧（キャラフィルタ付き） | `src/app/grimoire/page.tsx` |
| `/grimoire/[id]` | GRIMOIRE個別記事 | `src/app/grimoire/[id]/page.tsx` |
| `/grimoire/author/[slug]` | キャラ別アーカイブ（shuna/raika/both） | `src/app/grimoire/author/[slug]/page.tsx` |
| `/about` | 管理人（シュナ&ライカ）紹介 | `src/app/about/page.tsx` |
| `/legal` | 運営者情報・プライバシーポリシー・免責 | `src/app/legal/page.tsx` |

## 5. コンポーネント

`src/components/`

- `Header.tsx` / `HeaderNav.tsx` — ヘッダー（2段構成）
- `Footer.tsx` — フッター
- `TabBar.tsx` — カテゴリタブ（ニュースフィルタ）
- `ArticleFeed.tsx` — ニュース一覧
- `ArticleCard.tsx` — ニュースカード
- `LatestGrimoire.tsx` — 最新GRIMOIRE横スクロール
- `StoryCard.tsx` — GRIMOIRE記事カード
- `StoryFilter.tsx` — GRIMOIREフィルタUI

## 6. ライブラリ（データアクセス層）

`src/lib/`

- `articles.ts` — ニュース読み込み・整形
- `stories.ts` — GRIMOIRE記事読み込み・整形

## 7. データ構造

```
data/
├── articles/
│   ├── 2026-04-17.json   ← 日別ニュース（その日に投稿した記事）
│   └── 2026-04-18.json
├── articles-index.json    ← ニュース重複チェック用軽量インデックス
├── stories/
│   └── 2026-04/
│       ├── 2026-04-16-raika-dyatlov-pass.json
│       ├── 2026-04-17-shuna-seven-wonders-numerology.json
│       ├── 2026-04-18-raika-mandela-effect.json
│       └── 2026-04-18-shuna-mirror-magic.json
└── stories-index.json     ← GRIMOIRE重複チェック用インデックス
```

## 8. コンテンツ現況（2026-04-19 時点）

- **ニュース記事**: 計 11 件
  - 2026-04-17: 7件
  - 2026-04-18: 4件
- **GRIMOIRE（長編）**: 計 4 件
  - シュナ: 2件（mirror-magic, seven-wonders-numerology）
  - ライカ: 2件（mandela-effect, dyatlov-pass）

## 9. キャラクター運用

詳細は `CHARACTERS.md` 参照。要点のみ:

| キャラ | マーク | 得意分野 |
|---|---|---|
| **シュナ** | 🔮 | numerology / ancient_civilization / mysticism / ghost_stories / prophecy |
| **ライカ** | 📖 | ufo / conspiracy / uma / mystery / science_occult |
| 両名（both） | 🔮📖 | urban_legend / horror（月1〜2回） |

- 1日あたりの出現比 シュナ:ライカ = 2:3 〜 3:2
- 人の死を直接茶化さない（2026-04-17 ルール追加）
- 見出しは事実ベース、キャラの口調は本文でだけ出す

## 10. 画像アセット

`public/`

- `shuna.png` / `raika.png` — キャラ単体画像
- `shuna-raika.png` — 2ショット（PIL合成版）
- `shuna-raika-header.png` — Xヘッダー（1500x500）
- `icons/` — PWAアイコン一式
- `manifest.json` — PWAマニフェスト

## 11. 関連スキル（`~/.claude/skills/`）

| スキル名 | 用途 |
|---|---|
| `/occult-news投稿` | ニュース考察投稿（自己チェック・URL検証・キャラ分散） |
| `/グリモワール投稿` | 長編読み物（GRIMOIRE）投稿（ハルシネーション対策込み） |
| `/x投稿` | X（Twitter）への投稿（Playwright MCP 経由） |

すべて **文脈参照型**（ユーザーは明示的にスラッシュ打たずとも Claude が会話から起動可能）。

## 12. 運用フロー（標準ルート）

### ニュース投稿（日次想定）
1. `/occult-news投稿` スキル起動
2. ニュースピック＋キャラ割当＋考察生成
3. `data/articles/YYYY-MM-DD.json` 更新
4. `data/articles-index.json` に追記
5. `git commit && git push` → Vercel 自動デプロイ → alias 自動更新

### GRIMOIRE 投稿（週2本想定・BACKLOG優先度高）
1. `/グリモワール投稿` スキル起動
2. テーマ決定（キャラ別得意分野・重複チェック）
3. `data/stories/YYYY-MM/YYYY-MM-DD-<author>-<slug>.json` 作成
4. `data/stories-index.json` に追記
5. `git commit && git push` → 自動デプロイ

### X投稿（日次想定・手動）
1. `/x投稿` スキル起動
2. キャラ選択＋トピック生成
3. Playwright MCP で `x.com/compose/post` に投稿（Ctrl+Enter で送信）

## 13. 関連ドキュメント（同リポジトリ内）

| ファイル | 役割 |
|---|---|
| `BACKLOG.md` | 未対応タスク一覧 + 対応済み作業ログ（時系列） |
| `CHARACTERS.md` | シュナ・ライカの詳細設定・口調ルール |
| `AGENTS.md` | Claude向け注意書き（Next.js 16 は訓練データと違う） |
| `CLAUDE.md` | `@AGENTS.md` への参照 |
| `ネタ帳.md` | プロジェクト最初期（2026-04-16）のコンセプト構想メモ |
| `README.md` | Next.js デフォルトテンプレ（未整備） |

## 14. 制約・未対応（BACKLOG 抜粋）

- スケジュールタスク化（X API有料化で方針要検討）
- ainiwa-portal 側 Production Domain 確認（未検証）
- 内部リンク設計（GRIMOIRE ⇔ ニュース）
- カテゴリページ `/category/[slug]`（未実装）
- AdSense 審査（GRIMOIRE 20記事貯まるまで据え置き）

---

## 更新ルール

このファイルは「現状」を映すので、**構造に変化が起きたとき**に更新する:

- 新しいページ追加時
- コンポーネント・ライブラリの重大な追加/削除
- ドメイン・インフラ変更時
- 新スキル作成時
- キャラ運用ルールの変更時

件数や日付など細かい数値は毎回更新しなくてOK（BACKLOG側で追える）。
