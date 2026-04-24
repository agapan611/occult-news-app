# STATUS（現状スナップショット）

> このプロジェクトはスナップショット管理とタスク管理を分離しているため、進捗管理には使用しない。
> 進捗（未対応タスク・作業ログ）は `BACKLOG.md` で管理している。
>
> このファイルは **今このサイトがどうなっているか** を俯瞰する資料。
> 更新: 2026-04-24 (AiNiwa 基盤整備 / 画像 R2 一元化 完了)

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
| Commit author (local) | `75990160+agapan611@users.noreply.github.com`（2026-04-22 設定） — Vercel の将来的な Git Committer 検証強化に備え、SCP-WIRE と揃えて GitHub noreply 形式に。グローバル `user.email` は `shunaraika@gmail.com / OCCULT WIRE` のまま維持。過去 commit の author 書き換えはしない |

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
- `Giscus.tsx` — GRIMOIRE記事のコメント欄（GitHub Discussions 連携、クライアントコンポーネント）

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

**2026-04-24〜 Cloudflare R2 に一元化**（AiNiwa ファミリー共通方式）

- source of truth: `C:/クラウドコード/shared-assets/` → R2 バケット `ainiwa-assets`
- 公開 URL: `https://pub-481c073fb7994d50ab97163e55cad4d5.r2.dev`
- 参照：`src/lib/assets.ts` の `ASSETS.*` 経由（`<Image src={ASSETS.characters.shuna} />` 等）
- 画像追加手順: `shared-assets/image-tasks/` にタスクファイル → GPT 生成 → `node sync.mjs` で配布（詳細: `~/.claude/rules/ainiwa_assets.md`）

### R2 で管理する画像（2026-04-24 時点）

| キー | R2 配置 | 用途 |
|---|---|---|
| `ASSETS.characters.shuna` | `characters/shuna.webp` | シュナ アイコン（ろうそく除去版、512×768 / 約 76KB） |
| `ASSETS.characters.raika` | `characters/raika.webp` | ライカ アイコン（同仕様、約 70KB） |
| `ASSETS.banners.shunaRaika` | `banners/shuna-raika.png` | OG 画像・RSS アイコン（2ショット、PIL合成版） |
| `ASSETS.banners.shunaRaikaHeader` | `banners/shuna-raika-header.png` | X ヘッダー（1500×500） |
| `ASSETS.banners.shunaRaikaHero` | `banners/shuna-raika-hero.webp` | トップページヒーロー |

### `public/` に残るのは以下のみ（サイト固有・R2 管理外）

- `icons/` — PWA / favicon 系
- `manifest.json` — PWA マニフェスト
- `llms.txt` — LLM 向け記述
- `fonts/` — ウェブフォント

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

## 15. 次セッション引き継ぎ

### 2026-04-24 の成果（AiNiwa 基盤整備）

- **画像の Cloudflare R2 一元化 完了**（commit `52d772d`）
  - `src/lib/assets.ts` 新規作成（`ASSETS.characters.*` / `ASSETS.banners.*`）
  - `next.config.ts` に R2 `remotePatterns` 追加
  - 13 ファイルの `<Image>` src / OG 画像 URL を `ASSETS.*` に移行
  - `public/` から移行済み画像を削除（shuna.webp / raika.webp / shuna-raika* 一式）
  - 画像ソース source of truth: `C:/クラウドコード/shared-assets/`、R2 バケット `ainiwa-assets` へ `node sync.mjs` で配布
- **AiNiwa ファミリー共通ルール整備**
  - グローバルルール `~/.claude/rules/ainiwa_family.md` / `ainiwa_assets.md` 追加
  - AGENTS.md にファミリー参照追記（commit `a8215a4`）

### 2026-04-23 の成果（#57 Giscus 統合 完了後）

#### 直前セッションの成果
- **#57 Giscus コメント統合 完了**（commit `5b7de32`）
  - GitHub Discussions 有効化 + Announcements カテゴリ運用（Giscus アプリは `agapan611/occult-news-app` に限定認可）
  - `<Giscus>` クライアントコンポーネント新規作成（`src/components/Giscus.tsx`、pathname マッピング・dark テーマ固定）
  - CSP 拡張（`script-src` / `connect-src` / `frame-src` に `giscus.app`、`connect-src` に `api.github.com`）
  - GRIMOIRE 記事末尾に「囁きを残す」セクションを配置（`/grimoire/[id]`）
  - 見込み加点 **+0.44**（v5 最大効果、33. コメント 0→60）

### 前々セッションの成果（2026-04-22）
- **サイト評価 v5 実施**（87.42 / 100、v4 +1.07、v1 +5.42、20 コミット累積）
  - 評価ファイル: `~/.claude/skills/site-evaluation/results/occult-wire/2026-04-22_v5.md`
- **BACKLOG に v5 マージ**（#54 対応済みへ移動、#57〜#61 を新規追加）
- **site-evaluation スキルに Step 4.5「BACKLOG マージ」追加**（今後の評価時に自動発動）
- **site-evaluation スキルに Step 4a「世界観整合性チェック」追加**（#58 類似の乖離案件を事前フラグ化）
- **v6 Phase 1 実装+push 済み**（commit `895a9e2` / `aae279a`）
  - #60 a11y コントラスト（Footer × に aria-hidden、text-foreground/60 → /70）
  - #61 /search /sitemap の prefetch={false}（First Load JS -27 KiB）
- **v6 Phase 2 実装**（#23 デザインの世界観強化）
  - NEWS カテゴリ色分け（occult_core=紫グロー / mystery=シアン / normal=従来トーン）
  - 🔥 注目案件マーク（最新日 × occult_core カテゴリ）
  - 背景演出の強化（radial-gradient opacity ↑、フィルムグレインノイズ opacity ↑）
  - 見出しグロー（h1/h2 に控えめな紫 text-shadow）
- **#58 ライトモード OS 追従切替は見送り**（世界観一貫性を優先、BACKLOG 見送りセクション参照）

### 次セッションで着手する作業

#### 海斗さん作業が前提のもの（待ち）
- **#59 お問い合わせフォーム内製化**（工数 半日〜1日、ユーザー作業待ち）
  - 海斗さん側: https://supabase.com/dashboard/new で新規プロジェクト作成（region `ap-northeast-1`、名前 `occult-wire-contact`）+ https://resend.com/signup でアカウント作成
  - URL / API キー共有後、Claude 側で React Hook Form + zod + Supabase 実装
  - 見込み: 23. コミュニケーション 77→85、加重加点 +0.18

### v6 完了後の予定
- サイト評価 v6 実施（site-evaluation スキル）→ 87.42 → 88.5 前後を狙う
- Step 4.5 で BACKLOG 自動マージ確認（今回追加した新フロー）

---

## 更新ルール

このファイルは「現状」を映すので、**構造に変化が起きたとき**に更新する:

- 新しいページ追加時
- コンポーネント・ライブラリの重大な追加/削除
- ドメイン・インフラ変更時
- 新スキル作成時
- キャラ運用ルールの変更時

件数や日付など細かい数値は毎回更新しなくてOK（BACKLOG側で追える）。
