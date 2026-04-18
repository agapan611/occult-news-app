"""
Xヘッダー用画像を生成。
- サイズ: 1500 x 500 (X推奨)
- 左にシュナ、右にライカ、中央にサイト名
- シュナとライカは元画像をそのまま使用
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

BASE = os.path.dirname(__file__)
shuna = Image.open(os.path.join(BASE, "reference", "shuna.png")).convert("RGBA")
raika = Image.open(os.path.join(BASE, "reference", "raika.png")).convert("RGBA")

# X ヘッダー仕様
W, H = 1500, 500

# 背景：深紫のラジアルグラデっぽい（中心が明るめ）
bg = Image.new("RGBA", (W, H), (10, 8, 18, 255))
bg_draw = ImageDraw.Draw(bg)
# 中央に紫の光
center_x, center_y = W // 2, H // 2
for r in range(600, 0, -20):
    alpha = int(min(60, (600 - r) / 10))
    color = (70, 40, 120, alpha)
    bg_draw.ellipse(
        (center_x - r, center_y - r, center_x + r, center_y + r),
        fill=color
    )

# シュナ・ライカを500pxの高さに合わせてリサイズ
# 元画像 832x1216 → 高さ500にフィット → 約342x500
char_h = 500
char_w = int(832 * char_h / 1216)  # ≈ 342
shuna_r = shuna.resize((char_w, char_h), Image.LANCZOS)
raika_r = raika.resize((char_w, char_h), Image.LANCZOS)

# 左にシュナ（少しはみ出して配置）
bg.paste(shuna_r, (-30, 0), shuna_r)
# 右にライカ
bg.paste(raika_r, (W - char_w + 30, 0), raika_r)

# 中央エリアに暗いオーバーレイ（テキストを読みやすく）
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ov_draw = ImageDraw.Draw(overlay)
center_start = char_w - 30
center_end = W - char_w + 30
# 中央グラデで少し暗くする
for x in range(center_start, center_end):
    # 中央に近いほど暗く
    distance = abs(x - W // 2)
    max_dist = (center_end - center_start) // 2
    alpha = int(80 * (1 - min(distance / max_dist, 1)))
    for y in range(H):
        ov_draw.point((x, y), fill=(5, 3, 10, alpha))
bg = Image.alpha_composite(bg, overlay)

# テキスト描画
draw = ImageDraw.Draw(bg)

# タイトル: OCCULT WIRE
try:
    title_font = ImageFont.truetype("C:/Windows/Fonts/impact.ttf", 110)
except Exception:
    title_font = ImageFont.truetype("C:/Windows/Fonts/ariblk.ttf", 110)

title = "OCCULT WIRE"
# 文字サイズ計算
bbox = draw.textbbox((0, 0), title, font=title_font)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]
tx = (W - tw) // 2
ty = (H - th) // 2 - 40  # 少し上寄せ

# グロー効果（紫の滲み）
glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow_layer)
glow_draw.text((tx, ty), title, font=title_font, fill=(139, 92, 246, 180))
glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=12))
bg = Image.alpha_composite(bg, glow_layer)

# 本体テキスト（白系）
draw = ImageDraw.Draw(bg)
draw.text((tx, ty), title, font=title_font, fill=(230, 230, 240, 255))

# サブタイトル: 日本語
try:
    sub_font = ImageFont.truetype("C:/Windows/Fonts/YuGothB.ttc", 28)
except Exception:
    sub_font = ImageFont.truetype("C:/Windows/Fonts/meiryob.ttc", 28)

sub = "オカルト視点ニュース & 読み物"
bbox = draw.textbbox((0, 0), sub, font=sub_font)
sw = bbox[2] - bbox[0]
sx = (W - sw) // 2
sy = ty + th + 30
draw.text((sx, sy), sub, font=sub_font, fill=(180, 150, 220, 255))

# 装飾線
line_y = ty - 30
line_length = 200
draw.line(
    [(W // 2 - line_length // 2, line_y), (W // 2 + line_length // 2, line_y)],
    fill=(139, 92, 246, 200),
    width=2
)
# 下線も
line_y2 = sy + 45
draw.line(
    [(W // 2 - line_length // 2, line_y2), (W // 2 + line_length // 2, line_y2)],
    fill=(139, 92, 246, 200),
    width=2
)

# 管理人ラベル（小さく）
try:
    small_font = ImageFont.truetype("C:/Windows/Fonts/YuGothM.ttc", 20)
except Exception:
    small_font = ImageFont.truetype("C:/Windows/Fonts/meiryo.ttc", 20)
shuna_label = "SHUNA"
raika_label = "RAIKA"
# シュナラベル（左下）
draw.text((20, H - 40), shuna_label, font=small_font, fill=(200, 180, 230, 200))
# ライカラベル（右下）
rbox = draw.textbbox((0, 0), raika_label, font=small_font)
rw = rbox[2] - rbox[0]
draw.text((W - rw - 20, H - 40), raika_label, font=small_font, fill=(200, 180, 230, 200))

# 保存
out = bg.convert("RGB")
out.save(os.path.join(BASE, "x_header_1500x500.png"), "PNG")
print(f"Saved: {os.path.join(BASE, 'x_header_1500x500.png')}")

# プレビュー用小サイズも
out.resize((750, 250), Image.LANCZOS).save(
    os.path.join(BASE, "x_header_preview_750x250.png")
)
