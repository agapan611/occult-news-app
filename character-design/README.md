# キャラクター設定メモ

オカルト・都市伝説系AIキャラ「**シュナ**」と、双子の兄弟「**ライカ**」の画像生成設定。
ComfyUI API 経由で再現可能な状態で残している。

## キャラクター

### シュナ（女の子）
- 髪: 銀白・ミディアム・メッシーバング
- 瞳: 光る紫（ヴァイオレット）
- 肌: 色白・かすかに光る回路パターン
- 服装: ゴシックロリータ・黒レースチョーカー・ペンタグラムペンダント
- 小物: タロットカード・古い魔術書・蝋燭
- 背景: 紫・藍のオカルト雰囲気、魔法陣ホログラム

### ライカ（男の子／シュナの双子）
- 髪: 黒・ミディアム・メッシーバング
- 瞳: 光る紫（シュナと同じ）
- 肌: 褐色（ダークスキン）・かすかに光る回路パターン
- 服装: 黒のハイカラーコート・銀のペンタグラムブローチ
- 小物: 古いグリモワ（魔術書）・蝋燭
- 背景: シュナと同じオカルト雰囲気

双子設定のため「瞳の色」「回路パターン」「オカルト系の雰囲気」を共通項にして、
髪色（銀白 ⇔ 黒）・肌（色白 ⇔ 褐色）で対比させている。

## 共通の生成設定

| 項目 | 値 |
|---|---|
| Model | `waiIllustriousSDXL_v160.safetensors` |
| Sampler | `euler_ancestral` |
| Scheduler | `karras` |
| Steps | 28 |
| CFG | 7.0 |
| Size | 832 × 1216 (縦) |
| Denoise | 1.0 |

## シード（再現用）

| キャラ | Seed |
|---|---|
| シュナ（女） | `2257045724` |
| ライカ | `2223046142` |

**完全に同じ画像**を再生成したい場合は、上記 Seed・プロンプト・モデル・各パラメータをすべて一致させる必要がある。
一つでもズレると別の画像になる。

## 再生成手順

1. ComfyUI を起動（`http://localhost:8188` で待受）
2. 以下のどちらかを実行：
   - **API でやる場合**: 同ディレクトリの `shuna.workflow.json` または `raika.workflow.json` を POST する
     ```bash
     curl -X POST http://localhost:8188/prompt \
       -H "Content-Type: application/json" \
       -d @shuna.workflow.json
     ```
   - **GUI でやる場合**: `reference/` 内の PNG をComfyUIの画面にドラッグ＆ドロップするとワークフローが復元される（ComfyUI は PNG にメタデータを埋め込むため）

## プロンプト（参考）

### シュナ（女）ポジティブ
```
1girl, solo, portrait, female AI entity named Shuna, silver white hair,
medium length hair, messy bangs, glowing violet purple eyes,
mysterious alluring smile, pale skin with faint glowing circuit patterns,
dark gothic lolita outfit, black lace choker with pentagram pendant,
holding tarot cards, occult symbols floating around her,
old mysterious books stacked nearby, dark purple and indigo atmosphere,
candlelight, ethereal holographic glow, urban legend aesthetic,
beautiful detailed face, beautiful detailed eyes,
masterpiece, best quality, highres, absurdres
```

### ライカポジティブ
```
1boy, solo, portrait, male AI entity, black hair, medium length hair,
messy bangs, glowing violet purple eyes, mysterious cool smile,
dark brown skin, dark skin, tanned skin,
faint glowing circuit patterns on skin, dark gothic outfit,
black high collar coat, silver pentagram brooch, holding old grimoire book,
occult symbols floating around him, candles and mysterious artifacts nearby,
dark purple and indigo atmosphere, candlelight, ethereal holographic glow,
urban legend aesthetic, beautiful detailed face, beautiful detailed eyes,
handsome, bishounen, masterpiece, best quality, highres, absurdres
```

### ネガティブ（共通ベース）
```
low quality, worst quality, bad anatomy, bad hands, extra fingers,
missing fingers, extra limbs, deformed, ugly, blurry, watermark, text,
signature, jpeg artifacts, username, normal quality
```
ライカには追加で `girl, female, breasts, light skin, white skin, pale skin, white hair, silver hair, blonde hair` を入れて、女性・色白・白髪に寄るのを防いでいる。

## ファイル一覧
- `README.md` — このメモ
- `shuna.workflow.json` — シュナの ComfyUI API ワークフロー
- `raika.workflow.json` — ライカの ComfyUI API ワークフロー
- `reference/shuna.png` — 生成済み参考画像（シュナ）
- `reference/raika.png` — 生成済み参考画像（ライカ）
