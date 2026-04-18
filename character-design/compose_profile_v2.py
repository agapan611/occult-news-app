"""
シュナ＋ライカの既存画像を合成（改良版）
境目に軽くブレンドをかけて継ぎ目を馴染ませる。
顔・服装は元画像100%維持。
"""
from PIL import Image
import os

BASE = os.path.dirname(__file__)
shuna = Image.open(os.path.join(BASE, "reference", "shuna.png")).convert("RGBA")
raika = Image.open(os.path.join(BASE, "reference", "raika.png")).convert("RGBA")

W, H = shuna.size  # 832 x 1216

# キャンバス作成（背景は深紫で統一）
canvas = Image.new("RGBA", (W * 2, H), (10, 8, 18, 255))
canvas.paste(shuna, (0, 0))
canvas.paste(raika, (W, 0))

# 境目（x=W付近）に縦方向のソフトブレンドを入れる
# 左右の画像の端を少しずつクロスフェードする
blend_width = 40  # 境目幅
for x in range(blend_width):
    # 左側のraika画像端をshunaに、右側のshuna画像端をraikaに少しずつブレンド
    alpha = 0.5 * (1 - x / blend_width)
    # シュナ右端のピクセルをライカ側にブレンド
    col_shuna = shuna.crop((W - blend_width + x, 0, W - blend_width + x + 1, H))
    col_raika = raika.crop((x, 0, x + 1, H))
    # 境目の左側：shuna色 ← raika色少し混ぜる
    blended_left = Image.blend(col_shuna, col_raika, alpha)
    canvas.paste(blended_left, (W - blend_width + x, 0))
    # 境目の右側：raika色 ← shuna色少し混ぜる
    blended_right = Image.blend(col_raika, col_shuna, alpha)
    canvas.paste(blended_right, (W + x, 0))

# 正方形にクロップ（中央切り出し）
square_size = H  # 1216
left = (W * 2 - square_size) // 2  # 224
square = canvas.crop((left, 0, left + square_size, H))

# 1024x1024 と 400x400 で保存
square.resize((1024, 1024), Image.LANCZOS).save(
    os.path.join(BASE, "profile_2shot_blended_1024.png")
)
square.resize((400, 400), Image.LANCZOS).save(
    os.path.join(BASE, "profile_2shot_blended_400.png")
)

print("Saved:")
print("  profile_2shot_blended_1024.png")
print("  profile_2shot_blended_400.png")
