"""
シュナとライカの既存画像を合成してXプロフィール用2ショット画像を作る。
顔・服装は既存画像をそのまま使用（100%維持）。
"""
from PIL import Image, ImageFilter, ImageEnhance
import os

BASE = os.path.dirname(__file__)
shuna = Image.open(os.path.join(BASE, "reference", "shuna.png")).convert("RGBA")
raika = Image.open(os.path.join(BASE, "reference", "raika.png")).convert("RGBA")

# 元画像は 832x1216 縦長ポートレート
# シュナを左、ライカを右に並べる（向かい合う形に見えるように）
# シュナは左向きor正面なのでそのまま、ライカは右側に配置

# 両画像をサイズ合わせて結合（横並び）
W, H = shuna.size
canvas = Image.new("RGBA", (W * 2, H), (10, 10, 15, 255))
canvas.paste(shuna, (0, 0))
canvas.paste(raika, (W, 0))

# 正方形にクロップ（顔付近をセンターに）
# 顔は画像の上部1/3あたりにあることが多い
# 1664 x 1216 → 1216x1216 正方形（中央切り出し）
square_size = H  # 1216
left = (W * 2 - square_size) // 2  # (1664-1216)/2 = 224
square = canvas.crop((left, 0, left + square_size, H))

# Xプロフィール用に1024x1024へリサイズ
profile_hi = square.resize((1024, 1024), Image.LANCZOS)
profile_hi.save(os.path.join(BASE, "profile_2shot_1024.png"))

# 400x400版も保存
profile_low = square.resize((400, 400), Image.LANCZOS)
profile_low.save(os.path.join(BASE, "profile_2shot_400.png"))

print("Saved:")
print(f"  {os.path.join(BASE, 'profile_2shot_1024.png')}")
print(f"  {os.path.join(BASE, 'profile_2shot_400.png')}")
