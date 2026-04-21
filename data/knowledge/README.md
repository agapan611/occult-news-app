# knowledge/

OCCULT WIRE のグリモワール執筆用 knowledge ベース。
記事で引用するための一次資料URL・検証済み事実・関連トピック索引を蓄積する。

## 設計思想

- **補助的な参考資料**であり必須ではない。WebSearch と併用する（閉じ込め回避）
- **ハイブリッド構造**：カテゴリ（横断索引）＋トピック（深掘り）の二層
- **距離1制限**：関連トピックは直接リンクのみ辿る。関連の関連は辿らない（底無し沼化防止）
- **verified タグ**：参照時にスキルが鮮度チェック。古ければ再検証提案
- **一次資料優先**：Wikipedia だけのエントリは `_untrusted/` に置く

---

## フォルダ構造

```
data/knowledge/
├─ categories/     カテゴリ単位の横断知識（切り口辞書＋トピック索引）
├─ topics/         トピック単位の深掘り（事実・一次資料・諸説）
├─ _untrusted/     裏取りできなかった情報の隔離バッファ（手動昇格のみ）
├─ _index.json     全カテゴリ・トピックのメタデータ＋関連リンクマップ
└─ README.md       このファイル
```

---

## topic ファイル構造

各 `topics/*.md` の frontmatter：

```yaml
---
id: dyatlov_pass
title: ディアトロフ峠事件
category: mystery
tags: [unsolved, ussr, 1959]
related: [area_51, paradise_village]   # 距離1の関連トピックのみ
verified: 2026-04-21
---
```

本文構成（推奨）：
- `## 概要`（2〜3行）
- `## 事実`（年号・場所・人物・諸説）
- `## 一次資料`（URL＆書名）
- `## 関連トピック`（related と同内容を人間可読で）

---

## category ファイル構造

各 `categories/*.md` の frontmatter：

```yaml
---
id: mystery
title: ミステリー
threshold_days: 365
topics: [dyatlov_pass, bermuda_triangle, area_51]
---
```

本文は「このカテゴリの切り口辞書・横断知識」に徹する。  
生データは topics に置き、category は**索引**の役割。

---

## カテゴリ別検証閾値（verified 経過日）

| カテゴリ | 閾値 | 理由 |
|---|---|---|
| `ufo_uap` / `science_occult` / `conspiracy` | 180日 | 機密解除・新研究で変動が早い |
| `mystery` / `unsolved_cases` | 365日 | 新証言・捜査進展がたまに出る |
| `ancient_civilization` / `numerology` / `mysticism` | 730日 | 新発見は稀 |
| `urban_legend` / `ghost_stories` / `horror` | なし | 陳腐化しにくい |

閾値を超えたエントリは、グリモワール投稿スキルの**参照時**に再検証が提案される（フックではなく能動チェック）。

---

## 関連項目の距離1制限

スキル側は「原点トピックから `related` に書かれた直接リンク（距離1）のみ」を候補にする。  
**関連の関連（距離2）は辿らない**。都市伝説の底無し沼化を機械的に防ぐため。

例：「きさらぎ駅」の記事 →「異世界駅系」までは拾うが、「くねくね」までは飛ばない。

---

## referenced_knowledge 追跡（1パターン化防止）

`data/stories-index.json` の各エントリに `referenced_knowledge: [topic_id, ...]` を追加。  
**直近3記事で同じ knowledge を引いていたら、次の記事では別を選ぶ**。

---

## `_untrusted/` の役割

自動追記時に一次資料が取れなかった情報は `_untrusted/YYYY-MM-DD-<topic_id>.md` に隔離。  
`knowledge メンテ` スキルで手動判断して昇格（`topics/` へ移動）または削除する。

---

## 更新ポリシー

- **自動追記**：グリモワール投稿スキルが記事投稿時に新しい事実を書き込む
- **手動メンテ**：`knowledge メンテ` スキルで古いエントリを一括再検証
- **矛盾検出時**：既存エントリと食い違う記述が来たら追加を見送り、警告してユーザー判断に委ねる
